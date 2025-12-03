import { NextRequest } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import {
	RunnableSequence,
	RunnablePassthrough,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { getVectorStore } from "@/lib/rag";
import { Document } from "@langchain/core/documents";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
	const { messages } = await req.json();
	const currentMessage = messages[messages.length - 1].content;

	// Format history as a string for the prompt
	// We exclude the last message which is the current question
	const history = messages
		.slice(0, -1)
		.map(
			(m: any) => `${m.role === "user" ? "Human" : "Assistant"}: ${m.content}`,
		)
		.join("\n");

	const vectorStore = await getVectorStore();
	const retriever = vectorStore.asRetriever(4);

	const model = new ChatOpenAI({
		modelName: "meta-llama/llama-3.3-70b-instruct:free",
		openAIApiKey: process.env.OPENROUTER_API_KEY,
		configuration: {
			baseURL: "https://openrouter.ai/api/v1",
		},
		temperature: 0.7,
	});

	// 1. Standalone Question Chain
	// Rephrase the follow-up question into a standalone question based on history
	const rephrasePrompt = PromptTemplate.fromTemplate(`
    Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.
    
    Chat History:
    {chat_history}
    
    Follow Up Input: {question}
    
    Standalone Question:`);

	const rephraseChain = RunnableSequence.from([
		rephrasePrompt,
		model,
		new StringOutputParser(),
	]);

	// 2. Main Retrieval & Answer Chain
	const answerPrompt = PromptTemplate.fromTemplate(`
    You are a helpful AI assistant for Adhithya Srivatsan's portfolio.
    Your goal is to answer questions about Adhithya and his portfolio based ONLY on the provided context.
    If the answer is not in the context, politely say you don't know or that it's not in the portfolio.
    Do not answer general questions (like "What is the capital of France?") unless they are related to the portfolio context.
    
    Context:
    {context}
    
    Chat History:
    {chat_history}
    
    Question:
    {standalone_question}
    
    Answer:
    `);

	const retrievalChain = RunnableSequence.from([
		RunnablePassthrough.assign({
			standalone_question: async (input: any) => {
				if (!input.chat_history || input.chat_history === "")
					return input.question;
				return rephraseChain.invoke(input);
			},
		}),
		RunnablePassthrough.assign({
			context: async (input: any) => {
				const q = input.standalone_question;
				const docs = await retriever.getRelevantDocuments(q);
				return docs.map((doc: Document) => doc.pageContent).join("\n\n");
			},
		}),
		answerPrompt,
		model,
		new StringOutputParser(),
	]);

	const stream = await retrievalChain.stream({
		question: currentMessage,
		chat_history: history,
	});

	const encoder = new TextEncoder();
	const readableStream = new ReadableStream({
		async start(controller) {
			for await (const chunk of stream) {
				if (chunk) {
					controller.enqueue(encoder.encode(`0:${JSON.stringify(chunk)}\n`));
				}
			}
			controller.close();
		},
	});

	return new Response(readableStream, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
}

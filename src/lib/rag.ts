import { Document } from "@langchain/core/documents";
import { HuggingFaceInferenceEmbeddings } from "./embeddings";
import fs from "fs/promises";
import path from "path";

// Simple Vector Store Implementation
class SimpleVectorStore {
	documents: Document[] = [];
	embeddings: HuggingFaceInferenceEmbeddings;
	vectors: number[][] = [];

	constructor(embeddings: HuggingFaceInferenceEmbeddings) {
		this.embeddings = embeddings;
	}

	async addDocuments(docs: Document[]) {
		this.documents.push(...docs);
		const texts = docs.map((d) => d.pageContent);
		const newVectors = await this.embeddings.embedDocuments(texts);
		this.vectors.push(...newVectors);
	}

	async similaritySearch(query: string, k: number = 4): Promise<Document[]> {
		const queryVector = await this.embeddings.embedQuery(query);
		const scores = this.vectors.map((vector, index) => ({
			index,
			score: this.cosineSimilarity(queryVector, vector),
		}));

		scores.sort((a, b) => b.score - a.score);
		return scores.slice(0, k).map((s) => this.documents[s.index]);
	}

	asRetriever(k: number = 4) {
		return {
			getRelevantDocuments: async (query: string) =>
				this.similaritySearch(query, k),
		};
	}

	private cosineSimilarity(a: number[], b: number[]): number {
		const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
		const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
		const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
		return dotProduct / (magnitudeA * magnitudeB);
	}
}

let vectorStore: SimpleVectorStore | null = null;

interface VectorCache {
	documents: Array<{
		pageContent: string;
		metadata: Record<string, any>;
	}>;
	vectors: number[][];
	generatedAt: string;
}

export async function getVectorStore() {
	if (vectorStore) {
		return vectorStore;
	}

	const embeddings = new HuggingFaceInferenceEmbeddings({
		apiKey: process.env.HUGGINGFACE_API_KEY,
	});

	vectorStore = new SimpleVectorStore(embeddings);

	// Try to load from cache first
	const cachePath = path.join(process.cwd(), ".cache", "vectors.json");
	try {
		const cacheContent = await fs.readFile(cachePath, "utf-8");
		const cache: VectorCache = JSON.parse(cacheContent);

		console.log(
			`✅ Loaded ${cache.vectors.length} vectors from cache (generated: ${cache.generatedAt})`,
		);

		// Restore documents and vectors
		vectorStore.documents = cache.documents.map(
			(d) => new Document({ pageContent: d.pageContent, metadata: d.metadata }),
		);
		vectorStore.vectors = cache.vectors;

		return vectorStore;
	} catch (error) {
		console.log("⚠️  No cache found, generating vectors from scratch...");

		// Fallback: generate vectors on the fly
		const dataDir = path.join(process.cwd(), "src/app/data");
		const files = await fs.readdir(dataDir);
		const docs: Document[] = [];

		for (const file of files) {
			if (file.endsWith(".json")) {
				const content = await fs.readFile(path.join(dataDir, file), "utf-8");
				const json = JSON.parse(content);

				if (Array.isArray(json)) {
					json.forEach((item, index) => {
						docs.push(
							new Document({
								pageContent: JSON.stringify(item),
								metadata: { source: file, index },
							}),
						);
					});
				} else {
					docs.push(
						new Document({
							pageContent: JSON.stringify(json),
							metadata: { source: file },
						}),
					);
				}
			}
		}

		await vectorStore.addDocuments(docs);
		return vectorStore;
	}
}

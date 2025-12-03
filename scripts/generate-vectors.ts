import "dotenv/config";
import { HuggingFaceInferenceEmbeddings } from "../src/lib/embeddings";
import { Document } from "@langchain/core/documents";
import fs from "fs/promises";
import path from "path";

interface VectorCache {
	documents: Array<{
		pageContent: string;
		metadata: Record<string, any>;
	}>;
	vectors: number[][];
	generatedAt: string;
}

async function generateVectors() {
	console.log("🚀 Starting vector generation...");

	const dataDir = path.join(process.cwd(), "src/app/data");
	const files = await fs.readdir(dataDir);
	const docs: Document[] = [];

	console.log("📂 Reading portfolio data files...");
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

	console.log(`📄 Found ${docs.length} documents`);
	console.log("🤖 Generating embeddings via HuggingFace...");

	const embeddings = new HuggingFaceInferenceEmbeddings({
		apiKey: process.env.HUGGINGFACE_API_KEY,
	});

	const texts = docs.map((d) => d.pageContent);
	const vectors = await embeddings.embedDocuments(texts);

	console.log(`✅ Generated ${vectors.length} vectors`);

	const cache: VectorCache = {
		documents: docs.map((d) => ({
			pageContent: d.pageContent,
			metadata: d.metadata,
		})),
		vectors,
		generatedAt: new Date().toISOString(),
	};

	const cacheDir = path.join(process.cwd(), ".cache");
	await fs.mkdir(cacheDir, { recursive: true });

	const cachePath = path.join(cacheDir, "vectors.json");
	await fs.writeFile(cachePath, JSON.stringify(cache, null, 2));

	console.log(`💾 Vectors cached to: ${cachePath}`);
	console.log(
		`📊 Cache size: ${(JSON.stringify(cache).length / 1024).toFixed(2)} KB`,
	);
	console.log("✨ Done!");
}

generateVectors().catch(console.error);

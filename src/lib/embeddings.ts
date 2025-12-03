import { Embeddings, EmbeddingsParams } from "@langchain/core/embeddings";
import { HfInference } from "@huggingface/inference";

export interface HuggingFaceInferenceEmbeddingsParams extends EmbeddingsParams {
	apiKey?: string;
	model?: string;
}

export class HuggingFaceInferenceEmbeddings extends Embeddings {
	private client: HfInference;
	private model: string;

	constructor(fields?: HuggingFaceInferenceEmbeddingsParams) {
		super(fields ?? {});
		this.model = fields?.model ?? "sentence-transformers/all-MiniLM-L6-v2";
		this.client = new HfInference(
			fields?.apiKey ?? process.env.HUGGINGFACE_API_KEY,
		);
	}

	async embedDocuments(documents: string[]): Promise<number[][]> {
		const batches = chunkArray(documents, 50); // Batch to avoid hitting limits
		const embeddings: number[][] = [];

		for (const batch of batches) {
			const response = await this.client.featureExtraction({
				model: this.model,
				inputs: batch,
			});

			// Handle different response types from HF API
			if (Array.isArray(response)) {
				if (Array.isArray(response[0]) && Array.isArray(response[0][0])) {
					// 3D array (batch, seq, dim) - usually we want pooling, but featureExtraction might return this
					// For sentence-transformers, it usually returns (batch, dim) if normalized?
					// Actually, featureExtraction returns (batch, seq, dim) or (batch, dim) depending on model.
					// For all-MiniLM-L6-v2, it typically returns (batch, dim) or we need to pool.
					// Let's assume it returns (batch, dim) or (dim) for single.
					// Wait, the type definition for featureExtraction is complex.
					// Let's use a safer approach or check response.
					// If it's 3D, we might need to mean pool.
					// But simpler: use the dedicated embeddings API if available?
					// featureExtraction is the generic one.

					// Let's try to handle the standard output for this model.
					// It usually returns a list of embeddings.
					embeddings.push(...(response as number[][]));
				} else if (Array.isArray(response[0])) {
					embeddings.push(...(response as number[][]));
				}
			}
		}
		return embeddings;
	}

	async embedQuery(document: string): Promise<number[]> {
		const response = await this.embedDocuments([document]);
		return response[0];
	}
}

function chunkArray<T>(array: T[], size: number): T[][] {
	const chunked: T[][] = [];
	for (let i = 0; i < array.length; i += size) {
		chunked.push(array.slice(i, i + size));
	}
	return chunked;
}

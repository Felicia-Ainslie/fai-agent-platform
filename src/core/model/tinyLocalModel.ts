//This is a reusable tiny local inference engine that can be used between agents for shared inference logic. 

import { SimpleTokenizer } from "../tokenizer/simpleTokenizer";

/**
 * TinyLocalModel v1
 * 
 * Purpose:
 * - This is NOT an LLM yet.
 * - This is a local inference placeholder that uses the internal custom tokenizer.
 * - This lets us build the reusable agent architecture without OpenAI, Ollama, or other open source alternative models.
 * 
 * Why:
 * - Keeps the API working.
 * - Keeps the app free.
 * - Creates a safe space to evolve toward real model logic.
 * 
 * Future:
 * - Replace rule-based response generation with:
 *  1. n-gram model
 *  2. neural network language model
 *  3. transformer experiments 
 */

export class TinyLocalModel {
    private tokenizer = new SimpleTokenizer();

    generate(input: string): string {
        const tokens = this.tokenizer.encode(input);

        return [
            "Local FAI model response:",
            "",
            `I tokenized your message into ${tokens.length} tokens.`,
            "",
            "Tokens:",
            tokens.join(" | "),
            "",
            "Next model step: replace this placeholder with a trained local text generator",
        ].join("\n");
    }
}
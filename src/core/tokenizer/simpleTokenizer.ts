/** 
 * V1 Tokenizer
 * This is a reusable whitespace tokenizer that can be used between agents for shared text-to-token logic. 
 * This is simple and easy to implement for expedited concept testing, but has poor vocab quality, cannot handle puncuation well, and has weak learning value.
 * See v2 tokenizer in "ruleTokenizer.ts"
*/

export type Token = string;

/**
 * SimpleTokenizer v1
 * 
 * Purpose:
 * - Start from scratch with understandable tokenization.
 * - Split text into lowercase word and punctuation tokens.
 * 
 * Tradeoff:
 * - Easy to understand and debug.
 * - Not as powerful as BPR, WordPiece, or SentencePiece.
 * 
 * Future:
 * - Replace with custom BPE tokenizer once the agent shell works. 
*/

export class SimpleTokenizer {
    encode(text: string): Token[] {
        return text
            .toLowerCase()
            .match(/[a-z0-9]+|[^\sa-z0-9]/g) ?? [];
    }

    decode(tokens: Token[]): string {
        return tokens.join(" ");
    }
}

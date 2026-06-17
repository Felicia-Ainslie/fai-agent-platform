//This is a reusable simple tokenizer that can be used between agents for shared text-to-token logic. 

export type Token = string;

/* SimpleTokenizer v1
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

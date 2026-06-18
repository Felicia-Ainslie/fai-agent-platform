/** 
 * V2 Tokenizer
 * This is a reusable rule based tokenizer that can be used between agents for shared text-to-token logic. 
 * This is more understandable and deterministic than the whitespace based "simoleTokenizer.ts" but still not as powerful as a Byte Pair Encoder (BPE), Unigram, or wordPiece Tokenizer.
*/

export type Token = {
    value: string;
    index: number;
};

export type TokenizerOptions = {
    lowercase?: boolean;
};

const DEFAULT_OPTIONS: Required<TokenizerOptions> = {
    lowercase: true,
};

/**
 * ruleTokenizer v2
 * 
 * Purpose:
 * - Demonstrate evolution of building AI from scratch and varied solution experiences.
 * - Create predictable tokens before building vocabulary.
 * - Punctuation seperated from words.
 * - Reusable across every future agent.
 * 
 * Tradeoff:
 * - Lowercase by default: Smaller future vocab but loses casing info.
 * - Puctuaction as tokens: Better n-grams later, but more tokens overall.
 * - Route-like strings preserved: Useful for technical agents, but regez may need refinement later.
 * - No vocab yet: Keeps this step focused, but tokens are still strings and not IDs.
 * - Not as powerful as BPR, WordPiece, or SentencePiece but easy to understand.
 * 
 * Future:
 * - Replace with custom BPE tokenizer once the agent shell works. 
*/

export class RuleTokenizer {
    private options: Required<TokenizerOptions>;

    constructor(options: TokenizerOptions = {}) {
        this.options = {
            ...DEFAULT_OPTIONS,
            ...options,
        };
    }

/**
 * tokenize()
 * 
 * Converts raw text into ordered token objects.
 * 
 * Example:
 * "Hello, world!"
 * 
 * Becomes:
 * [
 *  { value: "hello", index: 0 },
 *  { value: ",", index: 1 },
 *  { value: "world", index: 2 },
 *  { value: "!", index: 3 }
 * ]
 */

tokenize(input: string): Token[] {
    const normalizedInput = this.options.lowercase
    ? input.toLowerCase()
    : input;

    const tokenValues = normalizedInput.match(
        /[a-z0-9]+(?:'[a-z0-9]+)?|\/[a-z0-9]+|[^\s]/gi,
    );

    if (!tokenValues) {
        return [];
    }

    return tokenValues.map((value, index) => ({
        value,
        index,
    }));
}

/**
 * encode()
 * 
 * In this context, encoding means converting text into token strings.
 * In the next phase, this will become token IDs using a vocabulary.
 */

    encode(input: string): string [] {
        return this.tokenize(input).map((token) => token.value);
    }

/**
 * decode()
 * 
 * Rebuilds readable text from tokens.
 * 
 * This is not perfect yet. That is acceptable.
 * The goal is reversibility good enough for debugging.
 */

    decode(tokens: string[]): string {
        return tokens
        .join(" ")
        .replace(/\s+([.,!?;:])/g, "$1")
        .replace(/\/\s+/g, "/");
    }
}
// Basic unit test for rule based tokenizer.

import { describe, it, expect } from 'vitest';
import { RuleTokenizer, Token } from './ruleTokenizer';

describe("RuleTokenizer", () => {
    it("tokenizes normal text into lowercase tokens", () => {
        // Purpose: Confirm the tokenizer converts readable text into ordered token objects.
        const tokenizer = new RuleTokenizer();

        const tokens = tokenizer.tokenize("Create a roadmap");

        expect(tokens).toEqual([
            { value: "create", index: 0 },
            { value: "a", index: 1 },
            { value: "roadmap", index: 2 },
        ]);
    });

        it("keeps punctuation as separate tokens", () => {
            // Purpose: Preserve punctuation so future model logic can learn from sentence structure. 
            const tokenizer = new RuleTokenizer();

            const tokens = tokenizer.tokenize("Hello, friends!");

            expect(tokens).toEqual([
                { value: "hello", index: 0 },
                { value: ",", index: 1 },
                { value: "friends", index: 2 }, 
                { value: "!", index: 3 },
            ]);
        });

        it("returns an empty array for empty input", () => {
            // Purpose: Handle blank input gracefully without errors.
            const tokenizer = new RuleTokenizer();

            expect(tokenizer.tokenize("")).toEqual([]);
        });

        it("can preserve casing when lowercase is false", () => {
            // Purpose: Confirm tokenizer behavior can be configured for future agent needs.
            const tokenizer = new RuleTokenizer({ lowercase: false });

            const tokens = tokenizer.tokenize("Product Roadmap");

            expect(tokens).toEqual([
                { value: "Product", index: 0 },
                { value: "Roadmap", index: 1 },
            ]);
        });

        it("encodes text into token strings", () => {
            // Purpose: Confirm encode returns only token values, not token metadata. 
            const tokenizer = new RuleTokenizer();

            expect(tokenizer.encode("Hey my friends!")).toEqual([
                "hey",
                "my",
                "friends",
                "!",
            ]);
        });
});
// V2: compare rule-based tokenization with simpleTokenizer.demo.ts.
// Both demos use the same inputs so the progression is easy to inspect.

import { RuleTokenizer } from "./ruleTokenizer";

const tokenizer = new RuleTokenizer();

const samples = [
    "Hello, world!",
    "POST /chat/product-manager works.",
    "I am self-hosted simple agent.",
    "Product Manager Agent + Technical PM Agent",
    "I can't wait.",
];

// RuleTokenizer keeps contractions and slash-prefixed route segments together.
// Its decoder removes spaces before common punctuation, but is not lossless:
// casing is lowercased by default and hyphens still have spaces around them.
for (const sample of samples) {
    const tokens = tokenizer.encode(sample);

    console.log("\nINPUT:");
    console.log(sample);

    console.log("TOKENS:");
    console.log(JSON.stringify(tokens));

    console.log("DECODED:");
    console.log(tokenizer.decode(tokens));
}


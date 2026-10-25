// V1: preserve the original demo for the simpler tokenizer implementation.
// Use the same inputs as ruleTokenizer.demo.ts to compare the two approaches.

import { SimpleTokenizer } from "./simpleTokenizer";

const tokenizer = new SimpleTokenizer();

const samples = [
    "Hello, world!",
    "POST /chat/product-manager works.",
    "I am self-hosted simple agent.",
    "Product Manager Agent + Technical PM Agent",
    "I can't wait.",
];

// SimpleTokenizer uses a regex, not just whitespace: punctuation becomes tokens.
// Decoding joins every token with spaces, so original formatting is not restored.
// Splitting slashes and apostrophes also makes its tokens differ from v2.
for (const sample of samples) {
    const tokens = tokenizer.encode(sample);

    console.log("\nINPUT:");
    console.log(sample);

    console.log("TOKENS:");
    console.log(JSON.stringify(tokens));

    console.log("DECODED:");
    console.log(tokenizer.decode(tokens));
}

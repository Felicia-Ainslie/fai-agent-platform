// This is a quick manual test for ruleTokenizer.ts

import { SimpleTokenizer } from "./simpleTokenizer";

const tokenizer = new SimpleTokenizer();

const samples = [
    "Hello, world!",
    "POST /chat/product-manager works.",
    "I am self-hosted simple agent.",
    "Product Manager Agent + Technical PM Agent",
];

for (const sample of samples) {
    console.log("\nINPUT:");
    console.log(sample);

    console.log("TOKENS:");
    console.log(tokenizer.encode(sample));

    console.log("DECODED:");
    console.log(tokenizer.decode(tokenizer.encode(sample)));
}

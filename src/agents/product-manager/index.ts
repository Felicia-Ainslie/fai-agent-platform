//This file contains the main logic for running the product manager agent leveraging reusable core.

import { createAgent } from "../../core/agent/createAgent";

//Product Manager rules live here. Core inference does not.

const productManagerAgent = createAgent({
    name: "FAI Product Manager Agent",
    role: "Product management assistant for structured product thinking.",
    rules: [
        "Create clear product artifacts.",
        "Use assumptions when context is incomplete.",
        "Prefer structured outputs without emojis or dashes.",
        "Do not invent company-specific facts.",
        "Seperate problem, users, requirements, risks, and success metrics.",
    ],
});

export async function runProductManagerAgent(message: string) {
    return productManagerAgent.run(message);
}
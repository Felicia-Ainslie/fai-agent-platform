// This is the reusable agent orchestration.

import { TinyLocalModel } from "../model/tinyLocalModel";

export type AgentConfig = {
    name: string;
    role: string;
    rules: string[];
};

/**
 * createAgent
 * 
 * Purpose:
 * - Reusable agent wrapper.
 * - Domain-specific agents only provide config.
 * - Core model/tokenizer logic stays shared.
 * 
 * This lets us create multiple agent variations without rewriting inference code.
 * 
 * Examples:
 * - Product Manager Agent
 * - Release Manager Agent
 * - ELT Metrics Agent
 * - Future Agents
 */

export function createAgent(config: AgentConfig) {
    const model = new TinyLocalModel();

    return {
        run(message: string): string {
            const framedPrompt = [ 
                `Agent: ${config.name}`,
                `Role: ${config.role}`,
                "",
                "Rules:",
                ...config.rules.map((rule) => `- ${rule}`),
                "",
                "User message:",
                message,
            ].join("\n");

            return model.generate(framedPrompt);
        },
    };
}
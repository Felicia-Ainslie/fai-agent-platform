// Basic unit test for the createAgent function.

import {describe, it, expect } from 'vitest';
import { createAgent, AgentConfig } from './createAgent';

describe("createAgent", () => {
    it("creates an agent that returns a string response", () => {
        // Purpose: Confirm the shared agent wrapper can execute a message.
        const agent = createAgent({
            name: "test-agent",
            role: "Test Agent",
            rules: ["Respond clearly."], 
        });

        const response = agent.run("Hello");

        expect(typeof response).toBe("string");
        expect(response.length).toBeGreaterThan(0);
    });

    it("includes agent config and user mesage in the model prompt path", () => {
        // Purpose: Confirm agent config and user input are wired into execution.
        const agent = createAgent({
            name: "product-manager",
            role: "Product Manager",
            rules: ["Break work into clear steps."],
        });

        const response = agent.run("Create a roadmap");

        expect(response.toLowerCase()).toContain("product");
        expect(response.toLowerCase()).toContain("roadmap");
    });
});
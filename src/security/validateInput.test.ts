// Basic unit test for v1 validate input function.

import { describe, it, expect } from 'vitest';
import { validateChatInput } from './validateInput';

describe("validateChatInput", () => {
    it("accepts a normal user message", () => {
        // Purpose: Confirm valid text input can pass the agent flow.
        const input = {
            message: "Create a 3 month product roadmap",
        };

        expect(validateChatInput(input)).toEqual(input);
});

    it("rejects an empty message", () => {
        // Purpose: Prevent empty requests from reaching the agent layer.
        const input = {
            message: "",
        };

        expect(() => validateChatInput(input)).toThrow(
            "Invalid input: 'message' length must be between 1 and 4000 characters."
        );
    });

       it("rejects messages that are only spaces", () => {
        // Purpose: Treat whitespace-only input as empty input.
        const input = {
            message: "   ",
        };

        expect(() => validateChatInput(input)).toThrow(
            "Invalid input: 'message' length must be between 1 and 4000 characters."
        );
    });
});
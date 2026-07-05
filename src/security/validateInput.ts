// Validate chat input ensuring message is a string between 1 and 4000 characters long.
// Avoids relying on external 'zod' dependency so this file compiles even if zod is not installed.

export function validateChatInput(input: unknown) {
    if (typeof input !== "object" || input === null) {
        throw new Error("Invalid input: expected an object with a 'message' string.");
    }

    const anyInput = input as { [key: string]: unknown };
    const message = anyInput.message;

    if (typeof message !== "string") {
        throw new Error("Invalid input: 'message' must be a string.");
    }

    // Normalize input by removing leading and trailing whitespace.
    // This prevents blank messages like "   " from being accepted. 
    const trimmedMessage = message.trim();

    // Measure the sanitized message, not the raw user input.
    const len = trimmedMessage.length;
    if (len < 1 || len > 4000) {
        throw new Error("Invalid input: 'message' length must be between 1 and 4000 characters.");
    }

    return { message: trimmedMessage };
}

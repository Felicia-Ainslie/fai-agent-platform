//This file is leveraged by the src/index.ts file  

import { Router } from "express";
import { runProductManagerAgent } from "../agents/product-manager";
import { validateChatInput } from "../security/validateInput";

export const chatRouter = Router();

chatRouter.post("/product-manager", async (req, res) => {
    try {
        const { message } = validateChatInput(req.body);

        const response = await runProductManagerAgent(message);

        res.json({ response });
    } catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
});
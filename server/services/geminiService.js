import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const transactionSchema = {
    type: "array",
    items: {
        type: "object",
        properties: {
            date: {
                type: "string",
                description: "The date of the transaction in YYYY-MM-DD format (infer the year from the statement header if not explicit).",
            },
            name: {
                type: "string",
                description: "The primary description of the transaction (e.g., 'Paid to Hangouts').",
            },
            amount: {
                type: "number",
                description: "The transaction amount, as a positive number. Payments should be positive for expenses, and received money should be negative (to represent net change, or you can invert this for a pure 'expense' list). We'll treat payments as expenses (positive) and received money as income (negative).",
            },
            category: {
                type: "string",
                description: "The spending category (e.g., Food, Travel, Shopping, Transfers, Medical, Education, Miscellaneous). If 'Received' or 'Money sent' classify as 'Income' or 'Transfer'.",
            },
        },
        required: ["date", "name", "amount", "category"],
    },
};


export async function analyzeStatement(fileBuffer) {
    try {
        const base64EncodedPDF = fileBuffer.toString("base64");

        const prompt = `
            Analyze the provided UPI Statement (PDF). Your task is to extract all individual transactions from the 'Passbook Payments History' table.
            For each transaction, determine the date, the name/details, the amount, and the category.
            
            RULES:
            1. Date: Combine the date and time to infer the full date (YYYY-MM-DD). Use the year 2025 as mentioned in the statement header: "13 AUG 25-12 NOV'25".
            2. Amount: Only return the numeric amount (without 'Rs.' or currency symbols). Ensure all payments (starting with '-') are returned as POSITIVE numbers. All received amounts (starting with '+') must be returned as NEGATIVE numbers.
            3. Category: Use one of the following categories: Food, Travel, Shopping, Transfers, Medical, Education, Groceries, Services, Miscellaneous, Income.

            Return the output strictly as a JSON array matching the provided schema.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-robotics-er-1.5-preview",
            contents: [
                {
                    inlineData: {
                        data: base64EncodedPDF,
                        mimeType: "application/pdf",
                    },
                },
                { text: prompt },
            ],
            config: {
                responseMimeType: "application/json",
                responseSchema: transactionSchema,
            },
        });

        const jsonString = response.text.trim();
        return JSON.parse(jsonString);

    } catch (error) {
        throw new Error("Failed to process statement using AI.");
    }
}
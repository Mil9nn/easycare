import { client } from "../lib/openai.mjs";

export const handleChatMessage = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: `
                        Analyze these symptoms and provide medical insights: "${message}". 
          
                        Please provide:
                        1. Possible conditions (3-5 most likely)
                        2. Recommended specialist type
                        3. Urgency level (low, medium, high, emergency)
                        4. General advice
                        5. Warning signs to watch for
                        
                        Be helpful but remind that this is not a substitute for professional medical advice.
                    `
                }
            ],
            response_format: {
                type: "json_schema",
                json_schema: {
                    name: "medical_analysis",
                    strict: true,
                    schema: {
                        type: "object",
                        properties: {
                            possible_conditions: {
                                type: "array",
                                items: { type: "string" },
                                description: "List of 3-5 most likely medical conditions"
                            },
                            recommended_speciality: {
                                type: "string",
                                description: "Type of medical specialist to consult"
                            },
                            urgency_level: {
                                type: "string",
                                enum: ["low", "medium", "high", "emergency"],
                                description: "Level of medical urgency"
                            },
                            general_advice: {
                                type: "string",
                                description: "General medical advice and recommendations"
                            },
                            warning_signs: {
                                type: "array",
                                items: { type: "string" },
                                description: "Warning signs to watch for"
                            },
                            disclaimer: {
                                type: "string",
                                description: "Medical disclaimer"
                            }
                        },
                        required: [
                            "possible_conditions",
                            "recommended_speciality",
                            "urgency_level",
                            "general_advice",
                            "warning_signs",
                            "disclaimer"
                        ],
                        additionalProperties: false
                    }
                }
            }
        });

        const parsedData = JSON.parse(response.choices[0].message.content);
        return res.status(200).json({ data: parsedData });

    } catch (error) {
        console.error("Error handling chat message:", error);
        return res
            .status(500)
            .json({ error: "An error occurred while processing your request." });
    }
};
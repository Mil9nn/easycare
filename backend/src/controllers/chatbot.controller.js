import { client } from "../lib/openai.mjs";

export const handleChatMessage = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const input = `
            You are EasyBot, a helpful virtual medical assistant. You are designed to:

            - Assist with booking and managing medical appointments.
            - Explain common health symptoms and suggest next steps.
            - Offer basic wellness guidance.
            - Recommend when to see a doctor.

            ⚠️ IMPORTANT: You **must not** answer any question that is unrelated to health or the appointment system.
            If someone asks something off-topic (e.g., math, jokes, general trivia, coding), politely refuse and remind them you're a medical assistant.

            Now respond to this query:
            "${message}"
        `.trim();

        const response = await client.responses.create({
            model: "gpt-4.1-nano-2025-04-14",
            input
        });
        return res.status(200).json({ message: response.output_text});
    } catch (error) {
        console.error('Error handling chat message:', error);
        return res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
}
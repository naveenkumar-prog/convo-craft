const { OpenAI } = require("openai");
require('dotenv').config();

const openai = new OpenAI(
    { 
        apiKey: process.env.OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    }
);
export async function sendMsgToOpenAi(message) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ "role": "user", "content": message }],
            prompt:message,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        throw new Error('Failed to fetch response from OpenAI');
    }
}


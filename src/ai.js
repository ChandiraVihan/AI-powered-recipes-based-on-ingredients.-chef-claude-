import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients and suggests a recipe.
Your response MUST be a single block of HTML, and NOTHING ELSE. Do NOT include any conversational text, explanations, or remarks before or after the HTML.

The HTML response MUST rigidly follow this structure:

<article class="suggested-recipe-container" aria-live="polite">
    <p class="para">Based on the ingredients you have, I recommend making [Recipe Name]. Here's the recipe:</p>
    <h3 class="Food">[Recipe Name]</h3>
    <strong class="ing">Ingredients:</strong>
    <ul>
        <li>[Ingredient 1]</li>
        <li>[Ingredient 2]</li>
        <!-- ... add more ingredients as needed ... -->
    </ul>
    <strong class="ins">Instructions:</strong>
    <ol>
        <li>[Instruction 1]</li>
        <li>[Instruction 2]</li>
        <!-- ... add more instructions as needed ... -->
    </ol>
</article>
`

// const anthropic = new Anthropic({
//     // Make sure you set an environment variable in Scrimba 
//     // for ANTHROPIC_API_KEY
//     apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,

//     dangerouslyAllowBrowser: true,
// })

// export async function getRecipeFromChefClaude(ingredientsArr) {
//     const ingredientsString = ingredientsArr.join(", ")

//     const msg = await anthropic.messages.create({
//         model: "claude-3-haiku-20240307",
//         max_tokens: 1024,
//         system: SYSTEM_PROMPT,
//         messages: [
//             { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
//         ],
//     });
//     return msg.content[0].text
// }

// Make sure you set an environment variable in Scrimba 
// for HF_ACCESS_TOKEN
const HF_TOKEN = import.meta.env.VITE_HF_ACCESS_TOKEN;

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");
    const payload = {
        model: "deepseek-ai/DeepSeek-R1:fastest",
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
        ],
        max_tokens: 2048,
    };

    try {
        const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${HF_TOKEN}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorBody)}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (err) {
        console.error("Hugging Face API Error:", err);
    }
}
const { Configuration, OpenAIApi } = require("openai");

// load environment variables from .env file
require('dotenv').config()

// configure the OpenAI API client with your API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// define a word limit for the response from OpenAI
const wordLimitsForOpenAiResponse = 30

// generates the prompt to send to OpenAI, requesting an explanation for the keyword
function generatePromptForOpenAI(keyword) {
  return `Explain "what is ${keyword}" in ${wordLimitsForOpenAiResponse} words for 5 types of audiences which are 1. child 2. teen 3. college student 4. grad student 5.expert.  It would be nice if you could use metaphor for child and teen and you can explain in more details for college student, grad student and expert.`;
}

// sends a request to OpenAI to get an explanation for the given keyword
async function getExplanationFromOpenAI(keyword) {
  const prompt = generatePromptForOpenAI(keyword);

  // specify the parameters for the OpenAI API request
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  // extract the response text from the OpenAI API response
  const choices = response?.data?.choices

  return choices && choices.length > 0
    ? choices[0]?.text?.trim()
    : ""
}

module.exports = {
    generatePromptForOpenAI,
    getExplanationFromOpenAI
}

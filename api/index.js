const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const { getExplanationFromOpenAI } = require("./utils/openai");
const { textToSpeech } = require("./utils/azure");
const { getExistingExplanation, saveNewExplanation } = require("./utils/db");

app.use(cors());
app.use(bodyParser.json());

// Source: https://learn.microsoft.com/en-us/azure/developer/javascript/tutorial/convert-text-to-speech-cognitive-services
app.get('/api/text-to-speech', async (req, res) => {

  const { phrase } = req.query;

  if (!phrase) res.status(404).send('Invalid query string');

  const audioStream = await textToSpeech(phrase);
  res.set({
    'Content-Type': 'audio/mpeg',
    'Transfer-Encoding': 'chunked'
  });
  audioStream.pipe(res);
});

app.post("/api/search", async (req, res) => {
  const { keyword } = req.body;
  const { retry } = req.query;

  if (retry === "false") {
    const existingExplanation = await getExistingExplanation(keyword);
  
    if (existingExplanation) {
      res.json({ text: existingExplanation });
      return;
    }
  }

  const text = await getExplanationFromOpenAI(keyword);
  //await saveNewExplanation({keyword, explanation: text})
  res.json({ text });
});

const PORT = 8080;

app.listen(PORT, console.log(`listening on ${PORT}`));

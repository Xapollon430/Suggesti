require("dotenv").config(); // this loads env vars

const express = require("express");
const app = express();
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const port = 4000;

const configuration = new Configuration({
  organization: process.env.OPENAI_API_KEY,
  apiKey: process.env.OPENAI_ORG_KEY,
});

const openai = new OpenAIApi(configuration);

// const response = await openai.createCompletion({
//   model: "text-davinci-003",
//   prompt: prompt,
//   temperature: 0.7,
//   max_tokens: 3000,
//   top_p: 1,
//   frequency_penalty: 0,
//   presence_penalty: 0,
// });

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.get("/insights", (req, res) => {
  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

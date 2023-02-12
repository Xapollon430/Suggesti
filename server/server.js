require("dotenv").config(); // this loads env vars

const express = require("express");
const app = express();
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
const path = require("path");

const port = 4000;

console.log(process.env.OPENAI_API_KEY, process.env.OPENAI_ORG_KEY);

const configuration = new Configuration({
  organization: process.env.OPENAI_ORG_KEY,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/insights", async (req, res) => {
  let { cheap, eco, quality, custom } = req.body;

  cheap = cheap ? "cheaper, " : "";
  eco = eco ? "eco-friendly/sustainable, " : "";
  quality = quality ? "high quality, " : "";

  let prompt = `I have been spending money at companies such as Starbucks, Shell, Target, KFC.
   Can you recommend other companies that are a substitution to these companies. But your recommandations
   should be ${eco} ${cheap} ${quality}. Give me real company names that can subtitute the 
   ones I gave you. Do a 1 to 1 replacement of the companies I gave you and why it is a better solution in terms of sustainability and money saving.  ${custom}`;

  console.log(prompt);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.7,
    max_tokens: 3000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const text =
    response.data.choices[0].text !== undefined
      ? response.data.choices[0].text
      : "Error!";

  // const text = `1. Instead of Starbucks, try a local coffee shop like a family-owned business. This is often cheaper than Starbucks and more eco-friendly because local businesses are more likely to use sustainable and locally-sourced ingredients.

  // 2. Instead of Shell, go for a gas station like BP which offers rewards and discounts on fuel. BP also has solar-powered fueling stations, which makes them more eco-friendly than Shell.

  // 3. Instead of Target, check out Walmart. Walmart is often cheaper than Target and they have a huge selection of eco-friendly products.

  // 4. Instead of KFC, try a fast-food chain like Chipotle which has a commitment to sourcing sustainable ingredients. Their burritos and tacos are also healthier than KFC's fried food.s,`;

  console.log(text);

  res.json({ text });
});
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

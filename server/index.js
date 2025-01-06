import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import OpenAI from "openai";
import { Filter } from "bad-words"; // Import bad-words library

// Load environment variables
dotenv.config();

// Configure OpenAI with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize the bad-words filter
const filter = new Filter();

// Add custom bad words to the filter (like "sex" or others missed by OpenAI)
filter.addWords(
  "sex",
  "sexy",
  "porn",
  "nude",
  "fuck",
  "shit",
  "bitch",
  "nigger",
  "cunt",
  "dick",
  "retard",
  "slut",
  "whore",
  "rape",
  "suicide",
  "weed",
  "heroin",
  "fat",
  "skinny",
  "ugly",
  "loser"
);

const app = express();
app.use(cors());
app.use(express.json());

// Function to check for inappropriate content using OpenAI Moderation API and custom filter
const checkForInappropriateContent = async (text) => {
  try {
    // Check against the custom bad-words filter
    if (filter.isProfane(text)) {
      return true; // Flagged as inappropriate
    }

    // Check against OpenAI Moderation API
    const moderationResponse = await openai.moderations.create({
      input: text,
    });
    const moderationResult = moderationResponse.results[0];
    return moderationResult.flagged; // Returns true if flagged by OpenAI
  } catch (error) {
    console.error("Error with OpenAI Moderation API:", error.message);
    throw new Error("Failed to validate content.");
  }
};

app.post("/generate-vocabulary", async (req, res) => {
  const { word } = req.body;

  try {
    // Step 1: Check if the word is inappropriate
    const isInappropriate = await checkForInappropriateContent(word);

    if (isInappropriate) {
      return res.status(400).json({
        error:
          "The word contains inappropriate content and cannot be processed.",
      });
    }

    // Step 2: Generate vocabulary details
    const systemPrompt = `
    You are an assistant for kids' vocabulary building. Provide the following details for the given word as a JSON object:
    {
      "word": "The vocabulary word",
      "root_origin": "The root or origin of the word",
      "phonetic_pronunciation": "The phonetic pronunciation of the word",
      "part_of_speech": "The part of speech (e.g., noun, verb, adjective)",
      "syllable_breakdown": "Break the word into syllables",
      "meaning": "The meaning of the word in simple terms",
      "synonyms": ["A list of synonyms for the word"],
      "antonyms": ["A list of antonyms for the word"],
      "fun_sentence": "A fun example sentence using the word",
      "examples": [
        {
          "sentence": "An example sentence using the word",
          "reason": "The reason why this example sentence is relevant"
        },
        {
          "sentence": "Another example sentence using the word",
          "reason": "The reason why this example sentence is relevant"
        }
      ],
      "word_family": ["A list of related words"],
      "rhyming_words": ["A list of words that rhyme"],
      "real_life_connection": "Describe how the word connects to real life",
      "emoji_representation": "An emoji representation for the word",
      "activity_suggestion": "A fun activity to learn this word",
      "occasions_events": ["A list of occasions or events where this word can be used"]
    }
    Ensure the keys exactly match the format above, even if some values are unavailable.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Provide details for the word: ${word}` },
      ],
    });

    // Step 3: Check the generated content for inappropriate words
    const generatedContent = response.choices[0].message.content;

    const isGeneratedContentInappropriate = await checkForInappropriateContent(
      generatedContent
    );

    if (isGeneratedContentInappropriate) {
      return res.status(400).json({
        error: "The generated content contains inappropriate content.",
      });
    }

    // Step 4: Send the clean response
    res.json({ data: JSON.parse(generatedContent) });
  } catch (error) {
    console.error("Error generating vocabulary:", error.message);
    res.status(500).json({ error: "An internal error occurred." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

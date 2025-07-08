import { ChatMistralAI } from "@langchain/mistralai";
import { getMistralApiKey } from "../config";
import { ChatModel } from ".";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";

export const PROVIDER_INFO = {
  key: "mistral",
  displayName: "Mistral AI",
};

export const loadMistralChatModels = async () => {
  const mistralApiKey = getMistralApiKey();
  if (!mistralApiKey) return {};

  try {
    const mistralModels = [
      "mistral-small",
      "mistral-medium",
      "mistral-large",
    ];

    const fallbackModel = async (options = {}) => {
      for (const modelId of mistralModels) {
        try {
          const model = new ChatMistralAI({
            apiKey: mistralApiKey,
            modelName: modelId,
            temperature: 0.7,
            ...options,
          });

          // test with dummy prompt
          await model.invoke([{ role: "user", content: "Hello" }]);

          return model;
        } catch (err) {
          console.warn(`Model "${modelId}" failed. Trying next...`);
        }
      }
      throw new Error("All Mistral models failed.");
    };

    const workingModel = await fallbackModel();

    const chatModels: Record<string, ChatModel> = {
      mistral_fallback: {
        displayName: "Mistral (Auto-Fallback)",
        model: workingModel as unknown as BaseChatModel,
      },
    };

    return chatModels;
  } catch (err) {
    console.error(`Error loading Mistral models: ${err}`);
    return {};
  }
};

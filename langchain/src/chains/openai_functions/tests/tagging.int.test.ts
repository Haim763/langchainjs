import { test, expect } from "@jest/globals";

import { createTaggingChain } from "../tagging.js";
import { ChatOpenAI } from "../../../chat_models/openai.js";

test("tagging chain", async () => {
  const chain = createTaggingChain(
    {
      type: "object",
      properties: {
        sentiment: { type: "string" },
        tone: { type: "string" },
        language: { type: "string" },
      },
      required: ["tone"],
    },
    new ChatOpenAI({ modelName: "gpt-4-0613", temperature: 0 })
  );

  const result = await chain.run(
    `Estoy increiblemente contento de haberte conocido! Creo que seremos muy buenos amigos!`
  );
  expect(result).toMatchInlineSnapshot(`
    {
      "language": "Spanish",
      "tone": "positive",
    }
  `);
});

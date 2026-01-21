// orval.config.ts
import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: {
      target: "./openapi.json", // ← 네가 받은 파일
    },
    output: {
      target: "./src/api/generated.ts",
      client: "fetch",
      mode: "tags",
      reactQuery: {
        enabled: true,
      },
    },
  },
});

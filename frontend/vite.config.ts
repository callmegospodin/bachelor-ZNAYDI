import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.SERVER_URL": JSON.stringify(env.APP_URL),
      "process.env.GOOGLE_MAP_API_KEY": JSON.stringify(env.GOOGLE_MAP_API_KEY),
    },
    plugins: [react(), tailwindcss()],
  };
});

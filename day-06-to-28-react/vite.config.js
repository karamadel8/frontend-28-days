import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  base: "/frontend-28-days/day-06-to-28-react/",
  plugins: [react(), tailwindcss()],
});

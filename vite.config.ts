import { defineConfig } from "vite";
import { ghPages } from "vite-plugin-gh-pages";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/memory-game-react/",
    plugins: [react(), ghPages()],
});

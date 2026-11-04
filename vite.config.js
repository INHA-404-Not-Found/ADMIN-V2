import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      port: 3000,
      // WSL에서 /mnt 경로는 파일 변경 감지가 안 돼서 폴링 사용
      watch: { usePolling: true },
      proxy: {
        "/api": {
          target: env.REACT_APP_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});

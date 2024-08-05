import { fileURLToPath, URL } from "node:url";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), "");
  console.log('proxy.target',env.VITE_RES_URL);
  return {
    // vite 配置
    base: "/",
    plugins: [
      react(),
    ],
    css: {

    },
    resolve: {
      alias: {
        "@/": `${path.resolve(process.cwd(), "src")}/`,
      },
    },
    // 强制预构建插件包
    optimizeDeps: {
      include: ["axios"],
    },
    // 打包配置
    build: {
      target: "modules",
      outDir: "dist",
      assetsDir: "assets",
      minify: "terser",
    },
    // 本地运行配置，及反向代理配置
    server: {
      host: true,
      port: 9000,
      strictPort:true,
      hotOnly: false,
      cors: true,
      // open: true,
      proxy: {
        "/api": {
          target: env.VITE_RES_URL, //代理接口
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
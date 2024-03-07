import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      "/api": {
        //target是代理的目标路径
        target: "http://192.168.1.12:3000",
        changeOrigin: true, //必须要开启跨域
        //pathRewrite重写请求的路径,实际请求的路径没有代理标识api,需要把斗鱼重置为空字符串
        rewrite: (path) => path.replace(/\/api/, ""), // 路径重写
      },
    }
  }
})

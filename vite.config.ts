import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: 'extensions.png', // 源文件路径
          dest: '', // 目标路径（相对于dist目录）
        },
        {
          src: 'manifest.json', // 源文件路径
          dest: '', // 目标路径（相对于dist目录）
        },
        {
          src: 'background.js', // 源文件路径
          dest: '', // 目标路径（相对于dist目录）
        },
        {
          src: 'content.js', // 源文件路径
          dest: '', // 目标路径（相对于dist目录）
        },
        {
          src: 'script.js', // 源文件路径
          dest: '', // 目标路径（相对于dist目录）
        },
        {
          src: 'manifest-pwa.json', // 源文件路径
          dest: '', // 目标路径（相对于dist目录）
        },
        {
          src: 'sw-register.js', // 源文件路径
          dest: '', // 目标路径（相对于dist目录）
        },
        {
          src: 'pwa-192.png', // 源文件路径
          dest: '', // 目标路径（相对于dist目录）
        },
        {
          src: 'pwa-512.png', // 源文件路径
          dest: '', // 目标路径（相对于dist目录）
        },
        {
          src: 'pwa-750x1334.png', // 源文件路径
          dest: '', // 目标路径（相对于dist目录）
        },
        {
          src: 'pwa-1280x720.png', // 源文件路径
          dest: '', // 目标路径（相对于dist目录）
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        popup: resolve(__dirname, 'popup.html')
      },
      output: {
        // 让不同页面 js 带名字前缀，避免冲突
        entryFileNames: 'assets/[name]/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/static/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    open: '/index.html'   // 默认启动页
  }
})

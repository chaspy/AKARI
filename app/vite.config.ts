import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 0.0.0.0でリッスン（すべてのネットワークインターフェースで受け付ける）
    port: 5173,
    allowedHosts: [
      'localhost',
      'takeshis-mac-studio-1.tailb74fce.ts.net',
      '.tailb74fce.ts.net', // すべての*.tailb74fce.ts.netを許可
      '.ts.net' // すべての*.ts.netを許可
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
})

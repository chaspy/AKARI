#!/bin/bash

# AKARI PWA起動スクリプト

echo "🚀 Starting AKARI PWA..."

# バックエンドサーバーを起動
echo "📦 Starting backend server..."
cd server
npm run dev &
BACKEND_PID=$!

# 少し待つ
sleep 3

# フロントエンドサーバーを起動
echo "🎨 Starting frontend..."
cd ../app
npm run dev &
FRONTEND_PID=$!

echo "✅ AKARI is running!"
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop all servers"

# 終了処理
trap "echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT

# 待機
wait
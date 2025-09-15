#!/usr/bin/env bash
set -euo pipefail

# AKARI PWA 起動スクリプト（開発向け安定化込み）

banner() {
  echo "\n============================================"
  echo "$1"
  echo "============================================\n"
}

kill_on_port() {
  local port=$1
  local pids
  pids=$(lsof -ti tcp:${port} || true)
  if [[ -n "${pids}" ]]; then
    echo "⚠️  Port ${port} is in use by: ${pids}. Killing..."
    kill ${pids} || true
    # 余韻
    sleep 1
  fi
}

banner "🚀 Starting AKARI (dev)"

# 既存プロセスを掃除（5173: Vite / 3001: API）
kill_on_port 5173
kill_on_port 3001

# Viteのキャッシュをクリア（HMR取りこぼし対策）
if [[ -d app/node_modules/.vite ]]; then
  echo "🧹 Clearing Vite cache: app/node_modules/.vite"
  rm -rf app/node_modules/.vite
fi

# バックエンドサーバーを起動
banner "📦 Starting backend server (http://localhost:3001)"
pushd server >/dev/null
npm run dev &
BACKEND_PID=$!
popd >/dev/null

# 少し待つ
sleep 3

# フロントエンドサーバーを起動（5173固定・強制再バンドル）
banner "🎨 Starting frontend (http://localhost:5173)"
pushd app >/dev/null
npm run dev -- --force &
FRONTEND_PID=$!
popd >/dev/null

GIT_REV=$(git rev-parse --short HEAD 2>/dev/null || echo unknown)
echo "✅ AKARI is running!   commit: ${GIT_REV}"
echo "Frontend: http://localhost:5173/?hud=1"
echo "Backend : http://localhost:3001/health"
echo "\nTips: devではSW登録は既定で無効（?sw=1で有効化）"
echo "      反映が鈍い時はこのスクリプトを再実行してください"

# 終了処理
trap "echo; echo '🛑 Stopping servers...'; kill ${BACKEND_PID} ${FRONTEND_PID} 2>/dev/null || true; exit" INT TERM

# 待機
wait

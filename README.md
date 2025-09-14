# AKARI - 健康管理支援PWAアプリ

AKARIは、食事記録のリマインダーを通じて健康的な生活習慣をサポートするPWAアプリです。

## 機能

- 🍽️ **食事記録**: 朝・昼・夜・間食の簡単記録
- 🔔 **プッシュ通知**: 08:00、12:30、19:00の定時リマインダー
- 🤖 **AIコーチ**: 記録を分析して健康アドバイスを提供
- 📱 **PWA対応**: iOSのホーム画面に追加して通知受信可能

## 技術スタック

### フロントエンド
- Vite + React + TypeScript
- Tailwind CSS
- PWA (Service Worker + Web Push)

### バックエンド
- Node.js + Express + TypeScript
- Prisma + SQLite
- Web Push (VAPID)
- node-cron

## セットアップ

### 1. 依存関係のインストール

```bash
# フロントエンド
cd app
npm install

# バックエンド
cd ../server
npm install
```

### 2. データベースの初期化

```bash
cd server
npx prisma migrate dev
```

### 3. 環境変数の設定

`server/.env`ファイルを確認し、必要に応じて以下を設定:

- `VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY`: 生成済み
- `OPENAI_API_KEY`: AIコーチ機能を使う場合は設定
- `DATABASE_URL`: デフォルトはSQLite

## 起動方法

### 開発環境

2つのターミナルで以下を実行:

```bash
# ターミナル1: バックエンド
cd server
npm run dev

# ターミナル2: フロントエンド
cd app
npm run dev
```

フロントエンド: http://localhost:5173
バックエンド: http://localhost:3001

### Tailscale経由でHTTPS配信

```bash
# Mac Studioで実行
tailscale serve 5173
```

アクセス: https://<mac名>.<tailnet>.ts.net

## iOS PWAセットアップ

1. Safari で https://<mac名>.<tailnet>.ts.net を開く
2. 共有ボタン → ホーム画面に追加
3. ホーム画面からアプリを起動
4. 「通知を有効化」ボタンをタップ
5. 許可する

## API エンドポイント

- `POST /api/subscribe`: 通知購読
- `POST /api/unsubscribe`: 通知購読解除
- `POST /api/notify`: テスト通知送信
- `POST /api/meal`: 食事記録作成
- `GET /api/meal?date=YYYY-MM-DD`: 食事記録取得
- `POST /api/coach/summarize`: AIコーチアドバイス取得

## トラブルシューティング

### 通知が来ない場合

1. PWAがホーム画面に追加されているか確認
2. 通知の許可が有効か確認
3. サーバーログで購読状態を確認
4. Tailscale経由でHTTPSアクセスしているか確認

### データベースエラー

```bash
cd server
npx prisma migrate reset
```

## ライセンス

MIT
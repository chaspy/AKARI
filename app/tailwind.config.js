/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FFE0EC',       // 淡いピンク
          mint: '#D1F2E7',       // ミントグリーン
          peach: '#FFE5D9',      // ピーチ
          lavender: '#E8DFF5',   // ラベンダー
          sky: '#E0F2FE',        // スカイブルー
          cream: '#FEF3E2',      // クリーム
          gray: '#F5F5F7',       // 薄いグレー
          text: '#5A5A5A',       // ソフトグレーテキスト
          success: '#7DD3A0',    // 淡い緑（成功）
          warning: '#FBBF24',    // 淡い黄色（警告）
          danger: '#FB9F9F',     // 淡い赤（危険）
        },
        health: {
          primary: '#A8E6CF',    // パステルミント
          secondary: '#FFD3B6',  // パステルオレンジ
          accent: '#FFAAA5',     // パステルピンク
          success: '#7DD3A0',    // 淡い緑
          warning: '#FBBF24',    // 淡い黄色
          danger: '#FB9F9F',     // 淡い赤
          light: '#FAFAFA',      // 背景
          muted: '#9CA3AF',      // ミュートグレー
          card: '#FFFFFF',       // カード背景
          border: '#F3F4F6',     // 淡いボーダー
        },
        akari: {
          primary: "#10B981",    // Health green
          secondary: "#3B82F6",  // Health blue
          accent: "#06B6D4",     // Cyan accent
          neutral: {
            50: "#FAFAFA",
            100: "#F4F4F5",
            200: "#E4E4E7",
            300: "#D4D4D8",
            400: "#A1A1AA",
            500: "#71717A",
            600: "#52525B",
            700: "#3F3F46",
            800: "#27272A",
            900: "#18181B"
          }
        },
        mint: {
          50: "#E6F9F3",
          100: "#CCF3E7",
          200: "#99E7CF",
          300: "#66DBB7",
          400: "#33CF9F",
          500: "#35C6A6",
          600: "#2AA285",
          700: "#1F7E64",
          800: "#155A43",
          900: "#0A3622"
        }
      },
      animation: {
        'bounce': 'bounce 1s infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      }
    }
  },
  plugins: [],
}
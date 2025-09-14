import { useState, useEffect } from 'react';
import { enablePush, isPushEnabled } from '../enablePush';
import NotificationButton from '../components/NotificationButton';

// VAPID公開鍵（サーバーから取得する必要がある）
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || '';

function Home() {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [motivationalMessage, setMotivationalMessage] = useState('');
  const [currentWeight] = useState(80);
  const [targetWeight] = useState(60);

  useEffect(() => {
    // 通知の状態を確認
    isPushEnabled().then(setNotificationEnabled);

    // モチベーションメッセージをランダムに表示
    const messages = [
      '今日も一緒に頑張ろうね！💪',
      '小さな一歩が大きな変化になるよ✨',
      '継続こそ力なり！ファイト🔥',
      'あなたならできる！信じてる🌸',
      '今日の自分を明日の自分が褒めるように🎆'
    ];
    setMotivationalMessage(messages[Math.floor(Math.random() * messages.length)]);

    // デバッグ情報を収集
    const info = [
      `URL: ${window.location.href}`,
      `Protocol: ${window.location.protocol}`,
      `VAPID Key: ${VAPID_PUBLIC_KEY ? 'Set' : 'Not set'}`,
      `Service Worker: ${('serviceWorker' in navigator) ? 'Supported' : 'Not supported'}`,
      `Push Manager: ${('PushManager' in window) ? 'Supported' : 'Not supported'}`,
      `Notification: ${('Notification' in window) ? 'Supported' : 'Not supported'}`,
      `Standalone: ${(window.matchMedia('(display-mode: standalone)').matches) ? 'Yes' : 'No'}`
    ];
    setDebugInfo(info);
  }, []);

  const handleEnableNotifications = async () => {
    console.log('VAPID Public Key:', VAPID_PUBLIC_KEY);
    console.log('Current URL:', window.location.href);
    console.log('Protocol:', window.location.protocol);

    const enabled = await enablePush(VAPID_PUBLIC_KEY);
    setNotificationEnabled(enabled);
    if (enabled) {
      alert('通知が有効になりました！');
    }
  };

  const testNotification = async () => {
    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'AKARI',
          body: 'テスト通知です！',
          url: '/log?src=test',
        }),
      });
      if (response.ok) {
        alert('テスト通知を送信しました');
      } else {
        const error = await response.text();
        alert(`エラー: ${error}`);
      }
    } catch (error) {
      console.error('Error sending test notification:', error);
      alert(`通知送信エラー: ${error}`);
    }
  };

  const progressPercentage = ((currentWeight - targetWeight) / (80 - targetWeight)) * 100;

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero Section with Floating Elements */}
      <div className="relative min-h-[500px] mb-12">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-amber-300/30 to-amber-500/30 rounded-full blur-3xl blob"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-mint-300/30 to-mint-500/30 rounded-full blur-3xl blob" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-blue-300/20 to-blue-500/20 rounded-full blur-3xl blob" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 text-center pt-12 pb-8">
          {/* Animated Avatar */}
          <div className="mb-8 animate-float">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-akari-amber via-amber-400 to-akari-mint rounded-full shadow-2xl flex items-center justify-center animate-glow">
              <span className="text-6xl">👩‍🏫</span>
            </div>
          </div>

          {/* Title with Shimmer Effect */}
          <h1 className="text-5xl md:text-6xl font-black mb-4 gradient-text-shimmer">
            AKARI
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 font-medium mb-2">
            あかり先生があなたの健康をサポート
          </p>

          <div className="inline-block glass rounded-full px-6 py-3 mt-4">
            <p className="text-lg font-bold text-gray-800">
              {motivationalMessage}
            </p>
          </div>
        </div>

        {/* Progress Card with Glassmorphism */}
        <div className="relative z-10 max-w-md mx-auto">
          <div className="glass rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center">
              <span className="text-2xl mr-2 animate-heartbeat">❤️</span>
              目標達成まで
            </h3>

            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>現在: {currentWeight}kg</span>
                <span>目標: {targetWeight}kg</span>
              </div>

              <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-akari-amber to-akari-mint rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${100 - progressPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                </div>
              </div>

              <p className="text-center mt-3 text-lg font-bold text-gray-800">
                あと{currentWeight - targetWeight}kg！頑張ろう🔥
              </p>
            </div>

            {/* Quick Start Steps */}
            <div className="space-y-3">
              {[
                { icon: '📱', text: 'ホーム画面に追加', done: false },
                { icon: '🔔', text: '通知を有効化', done: notificationEnabled },
                { icon: '🍱', text: '毎日の記録', done: false }
              ].map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center p-3 rounded-xl transition-all ${
                    step.done
                      ? 'bg-green-100 border-2 border-green-300'
                      : 'bg-white/50 border-2 border-gray-200'
                  }`}
                >
                  <span className="text-2xl mr-3">{step.icon}</span>
                  <span className={`flex-1 font-medium ${step.done ? 'text-green-700' : 'text-gray-700'}`}>
                    {step.text}
                  </span>
                  {step.done && <span className="text-green-500 text-xl">✓</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notification Section */}
      <div className="mb-12">
        <NotificationButton
          enabled={notificationEnabled}
          onEnable={handleEnableNotifications}
        />

        {notificationEnabled && (
          <button
            onClick={testNotification}
            className="mt-4 w-full premium-card bg-gradient-to-r from-akari-amber to-amber-500 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            <span className="inline-block animate-bounce mr-2">🔔</span>
            テスト通知を送信
          </button>
        )}
      </div>

      {/* Feature Cards with Premium Design */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          {
            icon: '🍱',
            title: 'スマート食事記録',
            description: 'AIがあなたの食事パターンを学習。最適なタイミングでリマインド',
            gradient: 'from-amber-400 to-orange-500',
            delay: '0s'
          },
          {
            icon: '📊',
            title: 'リアルタイム分析',
            description: 'あかり先生が24時間365日、あなたの健康データを見守ります',
            gradient: 'from-mint-400 to-green-500',
            delay: '0.1s'
          },
          {
            icon: '🎯',
            title: 'パーソナルコーチ',
            description: '管理栄養士の知識とギャルマインドで楽しくダイエット',
            gradient: 'from-blue-400 to-indigo-500',
            delay: '0.2s'
          }
        ].map((feature, index) => (
          <div
            key={index}
            className="animate-slideInUp premium-card"
            style={{ animationDelay: feature.delay }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-xl"
                style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
              ></div>

              <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  <span className="text-4xl">{feature.icon}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-6 flex justify-center">
                  <div className="w-12 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="glass-dark rounded-3xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          あなたの成長データ
        </h2>

        <div className="grid grid-cols-3 gap-6">
          {[
            { label: '継続日数', value: '7', unit: '日', icon: '🔥' },
            { label: '記録回数', value: '21', unit: '回', icon: '📝' },
            { label: '達成率', value: '87', unit: '%', icon: '🎯' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-white">
                {stat.value}
                <span className="text-lg text-gray-300">{stat.unit}</span>
              </div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="relative overflow-hidden rounded-3xl p-12 mb-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white">
          <p className="text-2xl md:text-3xl font-bold mb-4">
            「できないと思った時が、<br/>
            一番成長するチャンス」
          </p>
          <p className="text-lg opacity-90">
            - あかり先生 -
          </p>
        </div>

        {/* Sparkle effects */}
        <div className="absolute top-4 left-4 text-4xl animate-pulse">✨</div>
        <div className="absolute bottom-4 right-4 text-4xl animate-pulse" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute top-1/2 right-8 text-3xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
      </div>

      {/* Debug Info (hidden by default) */}
      {showDebug && (
        <div className="fixed bottom-20 left-4 right-4 max-w-md mx-auto glass rounded-2xl p-4 shadow-xl z-40">
          <h4 className="font-bold text-sm mb-2">Debug Info:</h4>
          <ul className="text-xs space-y-1 font-mono">
            {debugInfo.map((info, index) => (
              <li key={index}>{info}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => setShowDebug(!showDebug)}
        className="fixed bottom-4 right-4 w-12 h-12 bg-gray-800 text-white rounded-full shadow-lg flex items-center justify-center text-xs z-40"
      >
        🐛
      </button>
    </div>
  );
}

export default Home;
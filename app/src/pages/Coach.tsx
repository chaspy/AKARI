import { useState } from 'react';

interface CoachAdvice {
  summary: string;
  advice: string;
  nextSteps: string[];
}

function Coach() {
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<CoachAdvice | null>(null);
  const [period, setPeriod] = useState<'week' | 'month'>('week');

  const requestAdvice = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/coach/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          period,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAdvice(data);
      } else {
        alert('アドバイスの取得に失敗しました');
      }
    } catch (error) {
      console.error('Error getting advice:', error);
      alert('エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* あかり先生のヘッダー */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-mint-50 to-amber-50 rounded-3xl shadow-xl p-8 mb-6">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-akari-mint/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-akari-amber/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-akari-mint to-mint-300 rounded-3xl flex items-center justify-center shadow-xl">
              <span className="text-4xl">👩‍🏫</span>
            </div>
            <div className="ml-5">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-akari-blue to-akari-mint bg-clip-text text-transparent">
                あかり先生のコーチング
              </h2>
              <p className="text-gray-600 mt-1">
                管理栄養士兼ダイエットコーチ
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6">
            <p className="text-lg font-medium text-gray-800 leading-relaxed">
              やっほー！あかり先生だよ〜✨<br/>
              今日も一緒に頑張ろうね！
            </p>
            <p className="text-sm text-gray-600 mt-3">
              あなたの食事記録を分析して、目標体重60kgに向けて<br/>
              楽しく続けられるアドバイスをお届けするよ🎯
            </p>
          </div>
        </div>
      </div>

      {/* 分析設定 */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="text-2xl mr-2">📊</span>
          分析期間を選択
        </h3>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setPeriod('week')}
            className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 ${
              period === 'week'
                ? 'bg-gradient-to-r from-akari-blue to-blue-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="text-lg mr-2">📅</span>
            過去1週間
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 ${
              period === 'month'
                ? 'bg-gradient-to-r from-akari-blue to-blue-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="text-lg mr-2">📆</span>
            過去1ヶ月
          </button>
        </div>

        <button
          onClick={requestAdvice}
          disabled={loading}
          className="w-full bg-gradient-to-r from-akari-mint to-mint-400 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin mr-2">🔄</span>
              分析中...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <span className="text-xl mr-2">✨</span>
              アドバイスをもらう
            </span>
          )}
        </button>
      </div>

      {/* アドバイス結果 */}
      {advice && (
        <div className="space-y-4 animate-fadeIn">
          {/* 要約 */}
          <div className="bg-gradient-to-br from-blue-50 to-mint-50 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-lg text-akari-blue mb-3 flex items-center">
              <span className="text-2xl mr-2">📋</span>
              記録の要約
            </h3>
            <p className="text-gray-700 leading-relaxed">{advice.summary}</p>
          </div>

          {/* アドバイス */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-lg text-amber-700 mb-3 flex items-center">
              <span className="text-2xl mr-2">💝</span>
              あかり先生からのメッセージ
            </h3>
            <p className="text-gray-700 leading-relaxed">{advice.advice}</p>
            <div className="mt-4 p-4 bg-white/70 rounded-xl">
              <p className="text-sm text-gray-600">
                💡 ポイント：無理せず、楽しく続けることが一番大事！<br/>
                小さな変化でも、積み重ねれば大きな成果になるよ🌈
              </p>
            </div>
          </div>

          {/* 次のステップ */}
          <div className="bg-gradient-to-br from-mint-50 to-green-50 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-lg text-green-700 mb-3 flex items-center">
              <span className="text-2xl mr-2">🎯</span>
              今週のチャレンジ
            </h3>
            <div className="space-y-3">
              {advice.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-akari-mint/20 rounded-full flex items-center justify-center text-sm font-bold text-akari-mint">
                    {index + 1}
                  </span>
                  <p className="ml-3 text-gray-700 flex-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* モチベーションカード */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 transform hover:scale-105">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center mb-4 group-hover:animate-bounce">
            <span className="text-2xl">📈</span>
          </div>
          <h3 className="font-bold text-gray-800 mb-2">継続は力なり</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            毎日の小さな記録が、大きな変化を生むよ！<br/>
            完璧じゃなくていい、続けることが最高✨
          </p>
        </div>

        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 transform hover:scale-105">
          <div className="w-12 h-12 bg-gradient-to-br from-mint-100 to-mint-200 rounded-xl flex items-center justify-center mb-4 group-hover:animate-bounce">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="font-bold text-gray-800 mb-2">小さな目標から</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            いきなり大きく変えなくていいよ！<br/>
            今日できることから、一緒に始めよう🌟
          </p>
        </div>
      </div>

      {/* あかり先生の格言 */}
      <div className="mt-6 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-2xl p-6 text-center">
        <p className="text-lg font-bold text-gray-800 mb-2">
          「今日のあなたは、昨日のあなたより成長してる」
        </p>
        <p className="text-sm text-gray-600">
          - あかり先生の今日の格言 -
        </p>
      </div>
    </div>
  );
}

export default Coach;
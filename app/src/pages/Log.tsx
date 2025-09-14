import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

type MealSlot = 'breakfast' | 'lunch' | 'dinner' | 'snack';

interface MealLog {
  id: string;
  slot: MealSlot;
  memo: string;
  photoUrl?: string;
  calories?: number;
  at: string;
}

function Log() {
  const [searchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [logs, setLogs] = useState<MealLog[]>([]);
  const [activeSlot, setActiveSlot] = useState<MealSlot | null>(null);
  const [memo, setMemo] = useState('');
  const [akariComment, setAkariComment] = useState('');

  useEffect(() => {
    // URLパラメータから来た場合の処理
    const src = searchParams.get('src');
    if (src === 'push' || src === 'test') {
      const now = new Date();
      const hour = now.getHours();

      // 時間帯に応じて自動選択
      if (hour < 10) {
        setActiveSlot('breakfast');
        setAkariComment('朝ごはんタイム！今日も元気にスタートしよう✨');
      } else if (hour < 14) {
        setActiveSlot('lunch');
        setAkariComment('ランチタイム！午後のエネルギーチャージだね🌟');
      } else if (hour < 21) {
        setActiveSlot('dinner');
        setAkariComment('夕食の時間！今日も一日お疲れさま💕');
      } else {
        setActiveSlot('snack');
        setAkariComment('間食も記録してえらい！継続が大事だよ🎯');
      }
    }

    // 既存のログを取得
    fetchLogs();
  }, [searchParams]);

  const fetchLogs = async () => {
    try {
      const response = await fetch(`/api/meal?date=${selectedDate}`);
      if (response.ok) {
        const data = await response.json();
        setLogs(data);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const saveMeal = async (slot: MealSlot) => {
    try {
      const response = await fetch('/api/meal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slot,
          memo,
          at: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        await fetchLogs();
        setMemo('');
        setActiveSlot(null);

        // 褒めメッセージ
        const praises = [
          'えらい！記録できてすごい💪',
          'ナイス記録！この調子で続けよう🌟',
          'さすが！継続は力なりだね✨',
          '今日も記録できて最高！🎉',
          'いいね！あなたの頑張り見てるよ🌸'
        ];
        alert(praises[Math.floor(Math.random() * praises.length)]);
      }
    } catch (error) {
      console.error('Error saving meal:', error);
    }
  };

  const mealSlots = [
    { key: 'breakfast' as MealSlot, label: '朝食', icon: '🌅', time: '08:00', color: 'amber' },
    { key: 'lunch' as MealSlot, label: '昼食', icon: '☀️', time: '12:30', color: 'mint' },
    { key: 'dinner' as MealSlot, label: '夕食', icon: '🌙', time: '19:00', color: 'blue' },
    { key: 'snack' as MealSlot, label: '間食', icon: '🍿', time: '-', color: 'purple' },
  ];

  const hasLogForSlot = (slot: MealSlot) => {
    return logs.some(log => log.slot === slot);
  };

  // 記録状況に応じたメッセージ
  const getProgressMessage = () => {
    const recordedCount = logs.length;
    if (recordedCount === 0) {
      return '今日の記録を始めよう！一歩ずつ前進だよ🚀';
    } else if (recordedCount < 3) {
      return `${recordedCount}食記録済み！あと${3 - recordedCount}食で今日はパーフェクト🌟`;
    } else {
      return '今日は完璧な記録！すごすぎる〜🎊';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* あかり先生のメッセージカード */}
      <div className="bg-gradient-to-br from-white to-mint-50 rounded-3xl shadow-lg p-6 mb-6">
        <div className="flex items-start">
          <div className="w-12 h-12 bg-gradient-to-br from-akari-mint to-mint-300 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">👩‍🏫</span>
          </div>
          <div className="ml-4 flex-1">
            <p className="font-bold text-gray-800 mb-1">あかり先生</p>
            <p className="text-gray-700">
              {akariComment || getProgressMessage()}
            </p>
          </div>
        </div>
      </div>

      {/* 日付選択 */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-akari-blue to-akari-mint bg-clip-text text-transparent">
            食事記録
          </h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-akari-mint focus:outline-none transition-colors"
          />
        </div>

        {/* 食事スロット選択 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {mealSlots.map(slot => (
            <button
              key={slot.key}
              onClick={() => {
                setActiveSlot(slot.key);
                const messages = {
                  breakfast: '朝食は一日の始まり！バランス良く食べよう🌈',
                  lunch: 'お昼はしっかりエネルギー補給！午後も頑張れる💪',
                  dinner: '夕食は明日への準備！消化に良いものを選ぼう🌿',
                  snack: '間食も大事な記録！量を意識してみよう📝'
                };
                setAkariComment(messages[slot.key]);
              }}
              className={`relative p-4 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                hasLogForSlot(slot.key)
                  ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300'
                  : activeSlot === slot.key
                  ? `bg-gradient-to-br from-${slot.color}-50 to-${slot.color}-100 border-${slot.color}-300 shadow-lg`
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-3xl mb-2">{slot.icon}</div>
              <div className="font-bold text-gray-800">{slot.label}</div>
              <div className="text-xs text-gray-500">{slot.time}</div>
              {hasLogForSlot(slot.key) && (
                <div className="absolute top-2 right-2">
                  <span className="text-green-500 text-lg">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* 記録フォーム */}
        {activeSlot && (
          <div className="bg-gradient-to-br from-amber-50 to-mint-50 rounded-2xl p-6 mb-4">
            <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-2">
                {mealSlots.find(s => s.key === activeSlot)?.icon}
              </span>
              {mealSlots.find(s => s.key === activeSlot)?.label}の記録
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                メモ（任意）
              </label>
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-akari-mint focus:outline-none transition-colors"
                rows={3}
                placeholder="例：野菜多めで健康的だった！"
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 食事内容や感想を書くと、あかり先生がより良いアドバイスをくれるよ！
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => saveMeal(activeSlot)}
                className="flex-1 bg-gradient-to-r from-akari-amber to-amber-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                記録する
              </button>
              <button
                onClick={() => {
                  setActiveSlot(null);
                  setMemo('');
                  setAkariComment('');
                }}
                className="px-6 py-3 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}

        {/* 記録一覧 */}
        {logs.length > 0 && (
          <div className="mt-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
              <span className="text-xl mr-2">📋</span>
              今日の記録
            </h3>
            <div className="space-y-3">
              {logs.map(log => {
                const slot = mealSlots.find(s => s.key === log.slot);
                return (
                  <div key={log.id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <span className="text-2xl mr-3">{slot?.icon}</span>
                        <div>
                          <span className="font-bold text-gray-800">
                            {slot?.label}
                          </span>
                          {log.memo && (
                            <p className="text-sm text-gray-600 mt-1">{log.memo}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(log.at).toLocaleTimeString('ja-JP', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 応援メッセージ */}
      <div className="bg-gradient-to-r from-blue-50 to-mint-50 rounded-2xl p-6">
        <h3 className="font-bold text-blue-800 mb-3 flex items-center">
          <span className="text-xl mr-2">💡</span>
          あかり先生のワンポイントアドバイス
        </h3>
        <p className="text-blue-700 leading-relaxed">
          毎日の記録が大切な理由知ってる？<br/>
          それはね、自分の食習慣を「見える化」できるから！<br/>
          何を食べたか意識するだけで、自然と健康的な選択ができるようになるんだよ🌈<br/>
          完璧じゃなくていい、続けることが一番大事！
        </p>
      </div>
    </div>
  );
}

export default Log;
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Sun,
  Sunrise,
  Moon,
  Coffee,
  Check,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

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

  useEffect(() => {
    // URLパラメータから来た場合の処理
    const src = searchParams.get('src');
    if (src === 'push' || src === 'test') {
      const now = new Date();
      const hour = now.getHours();

      // 時間帯に応じて自動選択
      if (hour < 10) {
        setActiveSlot('breakfast');
      } else if (hour < 14) {
        setActiveSlot('lunch');
      } else if (hour < 21) {
        setActiveSlot('dinner');
      } else {
        setActiveSlot('snack');
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
        alert('記録しました');
      }
    } catch (error) {
      console.error('Error saving meal:', error);
    }
  };

  const mealSlots = [
    { key: 'breakfast' as MealSlot, label: '朝食', icon: Sunrise, time: '08:00' },
    { key: 'lunch' as MealSlot, label: '昼食', icon: Sun, time: '12:30' },
    { key: 'dinner' as MealSlot, label: '夕食', icon: Moon, time: '19:00' },
    { key: 'snack' as MealSlot, label: '間食', icon: Coffee, time: '-' },
  ];

  const hasLogForSlot = (slot: MealSlot) => {
    return logs.some(log => log.slot === slot);
  };

  return (
    // フッタ(TabBar)と重ならないように下部余白を確保
    <div className="max-w-md mx-auto space-y-4 pb-[calc(64px+env(safe-area-inset-bottom))]">
      {/* 日付選択と記録 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>食事記録</CardTitle>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-auto"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 食事スロット選択 */}
          <div className="grid grid-cols-2 gap-2">
            {mealSlots.map(slot => {
              const Icon = slot.icon;
              const isLogged = hasLogForSlot(slot.key);
              const isActive = activeSlot === slot.key;

              return (
                <Button
                  key={slot.key}
                  variant={isActive ? "default" : isLogged ? "secondary" : "outline"}
                  className="relative h-auto p-3 flex-col"
                  onClick={() => setActiveSlot(slot.key)}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <div className="text-sm font-medium">{slot.label}</div>
                  <div className="text-xs opacity-70">{slot.time}</div>
                  {isLogged && (
                    <div className="absolute top-2 right-2">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              );
            })}
          </div>

          {/* 記録フォーム */}
          {activeSlot && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  {mealSlots.find(s => s.key === activeSlot)?.label}の記録
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">メモ（任意）</label>
                  <Textarea
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="例：野菜多めで健康的だった"
                    rows={2}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => saveMeal(activeSlot)}
                  >
                    記録する
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setActiveSlot(null);
                      setMemo('');
                    }}
                  >
                    キャンセル
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* 記録一覧 */}
      {logs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">今日の記録</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {logs.map(log => {
              const slot = mealSlots.find(s => s.key === log.slot);
              const Icon = slot?.icon || Coffee;
              return (
                <div key={log.id} className="flex justify-between items-start p-3 bg-muted rounded-lg">
                  <div className="flex items-start">
                    <Icon className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <span className="font-medium text-sm">
                        {slot?.label}
                      </span>
                      {log.memo && (
                        <p className="text-xs text-muted-foreground mt-0.5">{log.memo}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(log.at).toLocaleTimeString('ja-JP', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Log;

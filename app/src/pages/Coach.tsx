import { useState } from 'react';
import {
  ChartBar,
  Sparkles,
  Target,
  Loader2,
  ClipboardList,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    // フッタ(TabBar)と重ならないように下部余白を確保
    <div className="max-w-md mx-auto space-y-4 pb-[calc(64px+env(safe-area-inset-bottom))]">
      {/* コーチング説明 */}
      <Card>
        <CardHeader>
          <CardTitle>コーチング</CardTitle>
          <CardDescription>
            あなたの食事記録を分析して、目標達成に向けたアドバイスをお届けします
          </CardDescription>
        </CardHeader>
      </Card>

      {/* 分析設定 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            <ChartBar className="h-4 w-4 mr-2" />
            分析期間
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={period} onValueChange={(v) => setPeriod(v as 'week' | 'month')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="week">過去1週間</TabsTrigger>
              <TabsTrigger value="month">過去1ヶ月</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            className="w-full"
            onClick={requestAdvice}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                分析中...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                アドバイスを取得
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* アドバイス結果 */}
      {advice && (
        <>
          {/* 要約 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <ClipboardList className="h-4 w-4 mr-2" />
                記録の要約
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {advice.summary}
              </p>
            </CardContent>
          </Card>

          {/* アドバイス */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">アドバイス</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                {advice.advice}
              </p>
            </CardContent>
          </Card>

          {/* 次のステップ */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Target className="h-4 w-4 mr-2" />
                今週の目標
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {advice.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </span>
                    <p className="ml-3 text-sm flex-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

export default Coach;

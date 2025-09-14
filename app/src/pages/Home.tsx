import { useState } from 'react';
import { GradientRing } from '@/components/GradientRing';
import { Sparkline } from '@/components/Sparkline';
import { TrendSheet } from '@/components/TrendSheet';
import { Settings } from 'lucide-react';

// Main Home Component with proper layout
function Home() {
  const [currentWeight] = useState(80);
  const [targetWeight] = useState(60);
  const startWeight = 100;

  const progress = Math.round(((startWeight - currentWeight) / (startWeight - targetWeight)) * 100);
  const remain = Math.max(currentWeight - targetWeight, 0);
  const weightLost = startWeight - currentWeight;

  // Sample data
  const recentHistory = [81.4, 81.2, 81.0, 80.8, 80.6, 80.3, 80.1, 80.0];
  const weeklyChange = -0.8;
  const detailedHistory = [
    { date: '12/1', weight: 82.5 },
    { date: '12/3', weight: 82.2 },
    { date: '12/5', weight: 81.8 },
    { date: '12/7', weight: 81.5 },
    { date: '12/9', weight: 81.2 },
    { date: '12/11', weight: 80.8 },
    { date: '12/13', weight: 80.5 },
    { date: '12/15', weight: 80.0 },
  ];

  return (
    <div className="min-h-[100dvh] bg-white pb-[calc(64px+env(safe-area-inset-bottom))]">
      {/* Header - NO BORDER */}
      <header
        className="bg-[rgb(255,239,245)] px-4 pb-2"
        style={{ paddingTop: 'env(safe-area-inset-top, 12px)' }}
      >
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-[rgb(25,25,25)]">AKARI</h1>
            <p className="text-sm text-[rgb(99,102,106)]">ダイエット記録</p>
          </div>
          <button
            className="p-2 rounded-full hover:bg-white/50 transition-colors"
            onClick={() => window.location.href = '/settings'}
          >
            <Settings className="h-5 w-5 text-[rgb(99,102,106)]" />
          </button>
        </div>
      </header>

      {/* Main Content - STRICT 8pt grid (px-4 mt-6 space-y-6) */}
      <main className="px-4 mt-6 space-y-6 max-w-md mx-auto">

        {/* ProgressCard - Hero with Ring */}
        <div className="rounded-2xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] p-4 flex flex-col items-center">
          <div className="relative w-[200px] h-[200px]">
            <GradientRing
              value={progress}
              size={200}
              thickness={14}
            />
            {/* Center text with proper z-index */}
            <div className="absolute inset-0 grid place-items-center z-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-[rgb(25,25,25)]">{currentWeight}kg</div>
                <div className="text-sm text-[rgb(99,102,106)]">あと{remain}kgで目標</div>
              </div>
            </div>
          </div>
          {/* Single line subtitle */}
          <p className="mt-3 text-sm text-[rgb(99,102,106)]">
            目標 {targetWeight}kg / 開始 {startWeight}kg ・ 達成率 {progress}%
          </p>
        </div>

        {/* SparklineCard - Everything contained within p-4 */}
        <div className="rounded-2xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] p-4">
          <div className="text-sm text-[rgb(99,102,106)] mb-2">最近の傾向</div>
          <div className="w-full flex justify-center">
            <Sparkline data={recentHistory} width={240} height={56} />
          </div>
          <div className="mt-3">
            <TrendSheet data={detailedHistory} weeklyChange={weeklyChange} />
          </div>
        </div>

        {/* Actions - 2 cards (height ≥88px) */}
        <div className="grid grid-cols-2 gap-4">
          <button
            className="rounded-2xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] min-h-[88px] p-4 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)] transition-all flex items-center justify-center"
            onClick={() => window.location.href = '/log'}
          >
            <span className="font-bold text-[rgb(25,25,25)]">食事を記録</span>
          </button>
          <button
            className="rounded-2xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] min-h-[88px] p-4 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)] transition-all flex items-center justify-center"
            onClick={() => window.location.href = '/coach'}
          >
            <span className="font-bold text-[rgb(25,25,25)]">アドバイス</span>
          </button>
        </div>

        {/* MessageCard - White card with light mint background */}
        <div className="rounded-2xl bg-[rgba(217,241,230,0.3)] p-4 text-center">
          <span className="text-[rgb(25,25,25)]">ここまでで{weightLost}kg減量しました</span>
        </div>
      </main>
    </div>
  );
}

export default Home;
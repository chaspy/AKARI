import { useState } from 'react';
import { GradientRing } from '@/components/GradientRing';
import { Settings, Activity, Clock, ArrowDownRight } from 'lucide-react';
import { Screen } from '@/components/Screen';
import DashboardLite from './DashboardLite';
import { Kpi } from '@/components/Kpi';

// Main Home Component with proper layout
function Home() {
  const isLite = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('lite') === '1';
  if (isLite) return <DashboardLite />;
  const today = new Date();
  // 表示用ダミー（後で実データに差し替え）
  const [weightDiff] = useState(-0.4);
  const [steps] = useState(4464);
  const [activeMin] = useState(39);
  const [calGoal] = useState(583);
  const [calories] = useState(221);
  const calPercent = Math.min(100, Math.round((calories / calGoal) * 100));

  return (
    <Screen data-ui-version="home-v2">
      {/* Header */}
      <header className="bg-background px-5 pb-2" style={{ paddingTop: 'env(safe-area-inset-top, 12px)' }}>
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-foreground">AKARI</h1>
          <button className="p-2 rounded-full hover:bg-accent/30 transition-colors" onClick={() => window.location.href = '/settings'}>
            <Settings className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-3 space-y-6">
        <div className="text-center text-sm text-muted-foreground">
          {today.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })}
          ({['日','月','火','水','木','金','土'][today.getDay()]})
        </div>

        {/* Progress */}
        <div className="rounded-2xl bg-card border border-border shadow-sm p-6">
          <div className="relative w-[176px] h-[176px] mx-auto mb-4">
            <GradientRing value={calPercent} size={176} thickness={12} startColor="oklch(0.86 0.12 35)" endColor="oklch(0.72 0.14 35)" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">{calPercent}%</div>
                <div className="text-xs text-muted-foreground mt-1">{calories} / {calGoal} kcal</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Kpi icon={<ArrowDownRight className="w-4 h-4" />} value={`${weightDiff}`} unit="kg" label="体重変化" />
            <Kpi icon={<Activity className="w-4 h-4" />} value={`${steps}`} label="歩数" />
            <Kpi icon={<Clock className="w-4 h-4" />} value={`${activeMin}`} unit="min" label="アクティブ" />
          </div>
        </div>

        {/* Weekly */}
        <div className="rounded-2xl bg-card border border-border shadow-sm p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div>WEEKLY {new Date(today.getTime()-6*86400000).toLocaleDateString('ja-JP',{month:'numeric',day:'numeric'})} - {today.toLocaleDateString('ja-JP',{month:'numeric',day:'numeric'})}</div>
            <div className="text-foreground">3295 kcal</div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-5">
          <button className="rounded-2xl bg-card border border-border shadow-sm min-h-[64px] p-4 hover:shadow-md transition-all" onClick={() => window.location.href = '/log'}>
            <span className="font-medium text-foreground">食事を記録</span>
          </button>
          <button className="rounded-2xl bg-card border border-border shadow-sm min-h-[64px] p-4 hover:shadow-md transition-all" onClick={() => window.location.href = '/coach'}>
            <span className="font-medium text-foreground">アドバイス</span>
          </button>
        </div>
      </main>
    </Screen>
  );
}

export default Home;

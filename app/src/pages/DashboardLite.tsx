import { useMemo } from 'react'
import { Screen } from '@/components/Screen'
import { GradientRing } from '@/components/GradientRing'
import { Kpi } from '@/components/Kpi'
import { Settings, ArrowDownRight, Activity, Clock } from 'lucide-react'

export default function DashboardLite() {
  const today = useMemo(() => new Date(), [])
  // ダミー値（後で実データに差し替え）
  const calGoal = 583
  const calories = 221
  const calPercent = Math.min(100, Math.round((calories / calGoal) * 100))
  const weightDiff = -0.4
  const steps = 4464
  const activeMin = 39

  return (
    <Screen>
      {/* ヘッダ（極力シンプル） */}
      <header className="pb-1" style={{ paddingTop: 'env(safe-area-inset-top, 12px)' }}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">AKARI</h1>
          <button className="p-2 rounded-full hover:bg-accent/30" onClick={() => (window.location.href = '/settings')}>
            <Settings className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      <main className="mt-2 space-y-5">
        {/* 日付 */}
        <div className="text-center text-sm text-muted-foreground">
          {today.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })}
          ({['日','月','火','水','木','金','土'][today.getDay()]})
        </div>

        {/* リング */}
        <div className="rounded-2xl bg-card border border-border shadow-sm p-5">
          <div className="relative w-[180px] h-[180px] mx-auto">
            <GradientRing value={calPercent} size={180} thickness={12} startColor="oklch(0.86 0.12 35)" endColor="oklch(0.72 0.14 35)" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="text-3xl font-bold">{calPercent}%</div>
                <div className="text-xs text-muted-foreground mt-1">{calories} / {calGoal} kcal</div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI列（文字少なくアイコン＋値のみ） */}
        <div className="grid grid-cols-3 gap-4">
          <Kpi icon={<ArrowDownRight className="w-4 h-4" />} value={`${weightDiff}`} unit="kg" label="体重変化" />
          <Kpi icon={<Activity className="w-4 h-4" />} value={`${steps}`} label="歩数" />
          <Kpi icon={<Clock className="w-4 h-4" />} value={`${activeMin}`} unit="min" label="アクティブ" />
        </div>

        {/* WEEKLYスニペット */}
        <div className="rounded-2xl bg-card border border-border shadow-sm p-4 text-xs text-muted-foreground flex items-center justify-between">
          <div>WEEKLY {new Date(today.getTime()-6*86400000).toLocaleDateString('ja-JP',{month:'numeric',day:'numeric'})} - {today.toLocaleDateString('ja-JP',{month:'numeric',day:'numeric'})}</div>
          <div className="text-foreground">3295 kcal</div>
        </div>

        {/* アクション */}
        <div className="grid grid-cols-2 gap-4">
          <button className="rounded-2xl bg-card border border-border shadow-sm min-h-[56px] p-4 hover:shadow-md" onClick={() => (window.location.href = '/log')}>
            <span className="text-sm font-medium">食事を記録</span>
          </button>
          <button className="rounded-2xl bg-card border border-border shadow-sm min-h-[56px] p-4 hover:shadow-md" onClick={() => (window.location.href = '/coach')}>
            <span className="text-sm font-medium">アドバイス</span>
          </button>
        </div>
      </main>
    </Screen>
  )
}


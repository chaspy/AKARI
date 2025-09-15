import { ReactNode } from 'react'

type KpiProps = {
  icon: ReactNode
  value: string
  unit?: string
  label: string
}

export function Kpi({ icon, value, unit, label }: KpiProps) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex items-center gap-2 text-foreground/80">
        <div className="w-6 h-6 grid place-items-center rounded-md bg-muted text-foreground/70">
          {icon}
        </div>
        <div className="text-xl font-semibold leading-none">
          {value}
          {unit && <span className="text-sm text-muted-foreground ml-1">{unit}</span>}
        </div>
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}


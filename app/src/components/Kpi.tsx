import { ReactNode } from 'react'

type KpiProps = {
  icon: ReactNode
  value: string
  unit?: string
  label: string
}

export function Kpi({ icon, value, unit, label }: KpiProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-6 h-6 grid place-items-center rounded-md bg-muted text-foreground/70">
        {icon}
      </div>
      <div className="text-2xl font-semibold leading-none">
        {value}
        {unit && <span className="text-xs text-muted-foreground ml-1">{unit}</span>}
      </div>
      <div className="text-xs text-muted-foreground leading-none">{label}</div>
    </div>
  )
}

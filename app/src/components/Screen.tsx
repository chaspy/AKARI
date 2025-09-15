import { PropsWithChildren } from 'react';

type ScreenProps = PropsWithChildren<{
  className?: string;
}>;

export function Screen({ children, className = '' }: ScreenProps) {
  const hud = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('hud') === '1';
  const info = typeof window !== 'undefined' ? {
    port: window.location.port,
    mode: import.meta.env.MODE,
  } : { port: '', mode: '' };

  return (
    <div className={`min-h-[100dvh] bg-background pb-[calc(64px+env(safe-area-inset-bottom))] ${className}`}>
      <div className="max-w-md mx-auto px-7">{children}</div>
      {hud && (
        <div className="fixed right-2 top-2 z-[200] rounded-md bg-black/60 text-white text-[10px] px-2 py-1 tracking-wide">
          HUD v2 · {info.mode} · :{info.port}
        </div>
      )}
    </div>
  );
}

import { PropsWithChildren } from 'react';

type ScreenProps = PropsWithChildren<{
  className?: string;
}>;

export function Screen({ children, className = '' }: ScreenProps) {
  return (
    <div className={`min-h-[100dvh] bg-background pb-[calc(64px+env(safe-area-inset-bottom))] ${className}`}>
      <div className="max-w-md mx-auto px-5">{children}</div>
    </div>
  );
}


import { NavLink } from 'react-router-dom';
import { Home, PenLine, MessageSquare } from 'lucide-react';

export function TabBar() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 w-full z-[100] bg-white"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)', bottom: 0 as any }}
    >
      <div className="h-[64px] px-6 grid grid-cols-3 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-lg transition-colors min-h-[44px] ${
              isActive ? 'text-primary' : 'text-muted-foreground'
            }`
          }
        >
          <Home className="w-6 h-6" strokeWidth={1.5} />
          <span className="text-xs font-medium">ホーム</span>
        </NavLink>
        <NavLink
          to="/log"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-lg transition-colors min-h-[44px] ${
              isActive ? 'text-primary' : 'text-muted-foreground'
            }`
          }
        >
          <PenLine className="w-6 h-6" strokeWidth={1.5} />
          <span className="text-xs font-medium">記録</span>
        </NavLink>
        <NavLink
          to="/coach"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-lg transition-colors min-h-[44px] ${
              isActive ? 'text-primary' : 'text-muted-foreground'
            }`
          }
        >
          <MessageSquare className="w-6 h-6" strokeWidth={1.5} />
          <span className="text-xs font-medium">コーチ</span>
        </NavLink>
      </div>
    </nav>
  );
}

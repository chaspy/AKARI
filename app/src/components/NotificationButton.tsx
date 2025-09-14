import { Bell, Check, ChevronRight } from 'lucide-react';

interface NotificationButtonProps {
  enabled: boolean;
  onEnable: () => void;
}

function NotificationButton({ enabled, onEnable }: NotificationButtonProps) {
  if (enabled) {
    return (
      <div className="relative">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-800/30 rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="ml-4 flex-1">
              <h4 className="text-base font-semibold text-green-800 dark:text-green-400">通知が有効です</h4>
              <p className="text-green-600 dark:text-green-500 text-sm mt-0.5">
                毎日8:00、12:30、19:00にリマインドします
              </p>
            </div>
            <div className="ml-4">
              <Bell className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={onEnable}
      className="w-full group"
    >
      <div className="bg-akari-primary hover:bg-akari-primary/90 text-white px-6 py-4 rounded-xl shadow-md hover:shadow-lg transform transition-all duration-200 hover:scale-[1.02]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4">
              <Bell className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="text-base font-semibold mb-0.5">通知を有効化</div>
              <div className="text-sm opacity-80">
                食事記録のリマインダーを受け取る
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </button>
  );
}

export default NotificationButton;
interface NotificationButtonProps {
  enabled: boolean;
  onEnable: () => void;
}

function NotificationButton({ enabled, onEnable }: NotificationButtonProps) {
  if (enabled) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-3xl blur-xl opacity-50"></div>
        <div className="relative glass bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-white text-3xl">✓</span>
              </div>
            </div>
            <div className="ml-5 flex-1">
              <h4 className="text-lg font-bold text-green-800">通知が有効です</h4>
              <p className="text-green-600 text-sm mt-1">
                毎日8:00、12:30、19:00にリマインドします
              </p>
            </div>
            <div className="ml-4">
              <div className="sparkle">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-heartbeat">
                  <span className="text-white text-2xl">🔔</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={onEnable}
      className="w-full group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-akari-blue via-akari-amber to-akari-mint opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl"></div>

      <div className="relative premium-card bg-gradient-to-r from-akari-blue to-blue-600 text-white px-8 py-6 rounded-3xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-5 group-hover:animate-bounce">
              <span className="text-4xl">🔔</span>
            </div>
            <div className="text-left">
              <div className="text-xl font-bold mb-1">通知を有効化</div>
              <div className="text-sm opacity-90">
                食事記録のリマインダーを受け取る
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <svg className="w-8 h-8 text-white/50 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-[2px] bg-gradient-to-r from-akari-blue to-blue-600 rounded-3xl"></div>
        </div>
      </div>
    </button>
  );
}

export default NotificationButton;
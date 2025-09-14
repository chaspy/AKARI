import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Log from './pages/Log';
import Coach from './pages/Coach';

function App() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 10) {
      setGreeting('おはようございます☀️');
    } else if (hour < 17) {
      setGreeting('こんにちは🌸');
    } else {
      setGreeting('こんばんは🌙');
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-mint-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-akari-amber to-akari-mint rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-xl">✨</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-akari-blue to-akari-mint bg-clip-text text-transparent">AKARI</h1>
                  <p className="text-xs text-gray-600">{greeting}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6 pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/log" element={<Log />} />
            <Route path="/coach" element={<Coach />} />
          </Routes>
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-2 z-50">
          <div className="flex justify-around items-center max-w-md mx-auto">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex flex-col items-center p-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-akari-blue scale-110'
                    : 'text-gray-500 hover:text-akari-blue'
                }`
              }
            >
              <span className="text-2xl mb-1">🏠</span>
              <span className="text-xs">ホーム</span>
            </NavLink>
            <NavLink
              to="/log"
              className={({ isActive }) =>
                `flex flex-col items-center p-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-akari-amber scale-110'
                    : 'text-gray-500 hover:text-akari-amber'
                }`
              }
            >
              <span className="text-2xl mb-1">📝</span>
              <span className="text-xs">記録</span>
            </NavLink>
            <NavLink
              to="/coach"
              className={({ isActive }) =>
                `flex flex-col items-center p-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-akari-mint scale-110'
                    : 'text-gray-500 hover:text-akari-mint'
                }`
              }
            >
              <span className="text-2xl mb-1">👩‍🏫</span>
              <span className="text-xs">コーチ</span>
            </NavLink>
          </div>
        </nav>
      </div>
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Log from './pages/Log';
import Coach from './pages/Coach';
import Settings from './pages/Settings';
import { TabBar } from './components/TabBar';

function App() {

  return (
    <Router>
      <div className="min-h-[100dvh] bg-white">
        {/* Main Content */}
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/log" element={<Log />} />
            <Route path="/coach" element={<Coach />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>

        {/* Fixed TabBar */}
        <TabBar />
      </div>
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { PrivacyPolicy } from './pages/PrivacyPolicy';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              Google Places Widgets Demo
            </Link>
            <nav className="space-x-4">
              <Link to="/" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link to="/datenschutz" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Datenschutz
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/datenschutz" element={<PrivacyPolicy />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} TWB-Digital OG. Demo Application.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="/datenschutz" className="text-sm text-gray-500 hover:text-gray-900">
                  Datenschutzerklärung
                </Link>
                <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                  Impressum
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

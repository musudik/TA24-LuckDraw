import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Euro } from 'lucide-react';
import Registration from './components/Registration';
import AdminLogin from './components/AdminLogin';
import ManageCustomers from './components/ManageCustomers';
import LuckyDraw from './components/LuckyDraw';
import Winners from './components/Winners';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-6 py-3 flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Euro className="h-8 w-8 text-yellow-500" />
              <span className="text-xl font-bold">TakeAway24 Luck Draw</span>
            </Link>
            <div className="space-x-4">
              <Link to="/" className="text-gray-700 hover:text-gray-900">Registration</Link>
              {isAdmin && (
                <>
                  <Link to="/manage-customers" className="text-gray-700 hover:text-gray-900">Manage Customers</Link>
                  <Link to="/lucky-draw" className="text-gray-700 hover:text-gray-900">Lucky Draw</Link>
                </>
              )}
              <Link to="/winners" className="text-gray-700 hover:text-gray-900">Winners</Link>
              {!isAdmin && (
                <Link to="/admin-login" className="text-gray-700 hover:text-gray-900">Admin Login</Link>
              )}
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Registration />} />
            <Route path="/admin-login" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
            <Route path="/manage-customers" element={<ManageCustomers />} />
            <Route path="/lucky-draw" element={<LuckyDraw />} />
            <Route path="/winners" element={<Winners />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
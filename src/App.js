import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Footer from './components/Footer';
import Toast from './components/Toast';

function App() {
  // Theme state with localStorage persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('text-decorator-theme') || 'dark-space';
  });

  // Toast alert system
  const [toast, setToast] = useState(null);

  const showAlert = (message, type = 'Info') => {
    setToast({ message, type });
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  // Sync theme with document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('text-decorator-theme', theme);
  }, [theme]);

  // Sync title alteration decoration
  useEffect(() => {
    let toggle = true;
    const intervalId = setInterval(() => {
      document.title = toggle ? 'Text Decorator ✨' : 'Perfect Text Utility 🔮';
      toggle = !toggle;
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Sticky Premium Navbar */}
      <Navbar title="Text Decorator" theme={theme} setTheme={setTheme} />

      {/* Floating Modern Toast Alerts */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={handleCloseToast} 
        />
      )}

      {/* Main Workspace Frame */}
      <main className="container flex-grow-1 my-2">
        <TextForm showAlert={showAlert} heading="Advanced Text Formatting Hub" />
      </main>

      {/* Minimal Aesthetic Footer */}
      <Footer />
    </div>
  );
}

export default App;

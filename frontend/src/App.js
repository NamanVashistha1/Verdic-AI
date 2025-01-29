import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import components and pages
import TopBar from './components/TopBar';
import NewsArticle from './components/NewsArticle';
import LegalNews from './pages/LegalNews'; // Page for legal news
import Home from './pages/Home'; // Home page
import NotFound from './pages/NotFound'; // 404 Page

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Always Visible Top Bar */}
        <TopBar />

        {/* Page Content */}
        <div className="container mt-5 pt-4">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/legal" element={<LegalNews />} />
            <Route path="/news" element={<NewsArticle />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;

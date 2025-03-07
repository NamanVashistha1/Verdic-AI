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
import Login from './pages/Login';
import OTP from './pages/OTP';
import QueriesPage  from './pages/queries'
import PdfComparator from './pages/PDFcomparator'
import LegalCostEstimator from './pages/Estimator';
import LegalDomains from './pages/Domains';
import DomainPage from './pages/Lawyers';
import RiskAnalysis from './pages/RiskAnalysis';

import DraftPage from './pages/Draftpage'
const App = () => {
  return (
    <Router>
      <div className="App">

        {/* Page Content */}
        <div className="container mt-4 pt-4">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/news" element={<LegalNews />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/otp" element={<OTP/>}/>
            <Route path ="/queries" element={<QueriesPage />} />
            <Route path ="/pdfcompare" element={<PdfComparator />} />
            <Route path ="/estimate" element={<LegalCostEstimator />} />
            <Route path ="/domains" element={<LegalDomains />} />
            <Route path="/lawyers/:domain" element={<DomainPage />} />
            <Route path ="/riskanalysis" element={<RiskAnalysis />} />
            <Route path= "/draft" element ={ <DraftPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;

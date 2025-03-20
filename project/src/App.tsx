import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import ScriptDownloads from './components/ScriptDownloads';
import Services from './components/Services';
import WhyHireMe from './components/WhyHireMe';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import TermsOfService from './pages/TermsOfService';
import HireDialog from './components/HireDialog';

function App() {
  const [isHireDialogOpen, setIsHireDialogOpen] = useState(false);

  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-white">
          <Header onContactClick={() => setIsHireDialogOpen(true)} />
          <Hero />
          <About />
          <Work />
          <ScriptDownloads />
          <Services />
          <WhyHireMe />
          <Testimonials />
          <Footer isDialogOpen={isHireDialogOpen} onDialogOpenChange={setIsHireDialogOpen} />
          <HireDialog isOpen={isHireDialogOpen} onClose={() => setIsHireDialogOpen(false)} />
        </div>
      } />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/cookies" element={<CookiePolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
    </Routes>
  );
}

export default App;
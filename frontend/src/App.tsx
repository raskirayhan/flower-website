import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar.js';
import { Footer } from './components/layout/Footer.js';
import { AIConciergeChat } from './components/ai/AIConciergeChat.js';
import { HomePage } from './pages/HomePage.js';
import { ExplorePage } from './pages/ExplorePage.js';
import { ServiceDetailsPage } from './pages/ServiceDetailsPage.js';
import { LoginPage } from './pages/LoginPage.js';
import { RegisterPage } from './pages/RegisterPage.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { AboutPage } from './pages/AboutPage.js';
import { ContactPage } from './pages/ContactPage.js';
import { BlogPage } from './pages/BlogPage.js';
import { PrivacyPage } from './pages/PrivacyPage.js';
import { NotFoundPage } from './pages/NotFoundPage.js';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/service/:slug" element={<ServiceDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <AIConciergeChat />
      </div>
    </BrowserRouter>
  );
};

export default App;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import { useTheme } from '../../context/ThemeContext.js';
import { Button } from '../ui/Button.js';
import { Badge } from '../ui/Badge.js';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <span className="w-10 h-10 rounded-2xl bg-[#E95A08] flex items-center justify-center text-white text-xl shadow-md group-hover:scale-105 transition-transform">
              🌸
            </span>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-serif">
                Flower Market
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#2D6A4F] dark:text-emerald-400 font-bold">
                Artisanal Stems & Services
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <Link to="/" className="hover:text-[#E95A08] transition">
              Home
            </Link>
            <Link to="/explore" className="hover:text-[#E95A08] transition">
              Catalog & Services
            </Link>
            <Link to="/about" className="hover:text-[#E95A08] transition">
              About Greenhouse
            </Link>
            <Link to="/contact" className="hover:text-[#E95A08] transition">
              Contact
            </Link>

            {/* Authenticated routes (min 6 routes when logged in) */}
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className="hover:text-[#E95A08] transition flex items-center gap-1.5">
                  Dashboard
                  <Badge variant="primary" className="text-[10px] py-0 px-1.5">
                    {user?.role}
                  </Badge>
                </Link>
                <Link to="/blog" className="hover:text-[#E95A08] transition">
                  Botanical Journal
                </Link>
              </>
            )}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Authenticated Profile Dropdown or Login / Register buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 p-1.5 pl-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{user?.name}</p>
                    <p className="text-[10px] text-[#2D6A4F] dark:text-emerald-400 font-semibold uppercase">
                      {user?.role} Member
                    </p>
                  </div>
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
                    alt={user?.name || 'User'}
                    className="w-9 h-9 rounded-xl object-cover ring-2 ring-[#E95A08]/40"
                  />
                </button>

                {/* Advanced Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-3 z-50 animate-scale-up">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        📊 Role Dashboard
                      </Link>
                      <Link
                        to="/explore"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        🌿 Browse Services
                      </Link>
                      <Link
                        to="/privacy"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        🛡️ Privacy & Terms
                      </Link>
                    </div>
                    <div className="px-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <Button variant="danger" size="sm" className="w-full" onClick={handleLogout}>
                        Sign Out
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Join VIP
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu hamburger button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="px-2 py-1 font-semibold text-slate-700 dark:text-slate-300">
              Home
            </Link>
            <Link to="/explore" onClick={() => setIsMenuOpen(false)} className="px-2 py-1 font-semibold text-slate-700 dark:text-slate-300">
              Catalog & Services
            </Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="px-2 py-1 font-semibold text-slate-700 dark:text-slate-300">
              About Greenhouse
            </Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="px-2 py-1 font-semibold text-slate-700 dark:text-slate-300">
              Contact
            </Link>
            {isAuthenticated ? (
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="px-2 py-1 font-semibold text-[#E95A08]">
                Role Dashboard ({user?.role})
              </Link>
            ) : (
              <div className="flex gap-2 pt-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-1/2">
                  <Button variant="outline" size="sm" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-1/2">
                  <Button variant="primary" size="sm" className="w-full">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

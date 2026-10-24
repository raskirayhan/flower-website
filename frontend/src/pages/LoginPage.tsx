import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { Button } from '../components/ui/Button.js';
import { Input } from '../components/ui/Input.js';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setTimeout(async () => {
      await login(email, password);
      setIsLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  const handleDemoClick = (role: 'USER' | 'ADMIN' | 'MANAGER') => {
    demoLogin(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen py-16 flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="text-center mb-8">
          <span className="w-12 h-12 rounded-2xl bg-[#E95A08] inline-flex items-center justify-center text-white text-2xl shadow-md mb-3">
            🌸
          </span>
          <h1 className="text-2xl font-extrabold font-serif text-slate-900 dark:text-slate-100">
            Welcome Back
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Sign in to manage your greenhouse orders, wishlist & subscriptions.
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email Address"
            type="email"
            required
            placeholder="e.g. user@flowermarket.shop"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full mt-2">
            Sign In to Account
          </Button>
        </form>

        {/* 1-Click Demo Login Shortcuts */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs font-bold text-slate-400 text-center uppercase tracking-wider mb-3">
            ⚡ Quick 1-Click Demo Logins
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleDemoClick('USER')}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-950/40 text-xs font-bold text-slate-700 dark:text-slate-300 transition text-center"
            >
              👤 User
            </button>
            <button
              onClick={() => handleDemoClick('ADMIN')}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-950/40 text-xs font-bold text-slate-700 dark:text-slate-300 transition text-center"
            >
              🛡️ Admin
            </button>
            <button
              onClick={() => handleDemoClick('MANAGER')}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-950/40 text-xs font-bold text-slate-700 dark:text-slate-300 transition text-center"
            >
              📊 Manager
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-[#E95A08] hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

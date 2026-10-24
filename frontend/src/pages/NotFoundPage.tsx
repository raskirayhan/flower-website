import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button.js';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-slate-50 dark:bg-slate-950">
      <span className="text-6xl mb-4">🥀</span>
      <h1 className="text-3xl font-extrabold font-serif text-slate-900 dark:text-slate-100">
        404 - Botanical Path Not Found
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
        The garden path or stem variety you are looking for has been relocated or is currently out of season.
      </p>
      <Link to="/" className="mt-6">
        <Button variant="primary">Return to Botanical Nursery</Button>
      </Link>
    </div>
  );
};

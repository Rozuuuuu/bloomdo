import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-off-white dark:bg-near-black flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-golden-yellow/20 to-leaf-green/20 dark:from-dark-golden/20 dark:to-dark-leaf-green/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-golden-yellow dark:text-dark-golden">
            error
          </span>
        </div>
        
        <h1 className="text-4xl font-bold text-chocolate-brown dark:text-ivory mb-3">
          404
        </h1>
        
        <h2 className="text-xl font-semibold text-chocolate-brown/80 dark:text-ivory/80 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-chocolate-brown/60 dark:text-ivory/60 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn-primary px-6 py-3 rounded-xl text-center"
          >
            <span className="material-symbols-outlined mr-2">home</span>
            Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="btn-secondary px-6 py-3 rounded-xl"
          >
            <span className="material-symbols-outlined mr-2">arrow_back</span>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
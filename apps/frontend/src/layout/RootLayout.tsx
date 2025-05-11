import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ErrorBoundary from '../components/ErrorBoundary';
import LoadingSpinner from '../components/common/LoadingSpinner';

const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--primary-bg)] text-[var(--text-100)] transition-colors duration-500">
      <Navbar />
      <main className="flex-grow pt-16">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner size="lg" className="min-h-[80vh]" />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout; 
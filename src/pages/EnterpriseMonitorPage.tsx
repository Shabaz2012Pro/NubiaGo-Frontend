
import React from 'react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import EnterpriseMonitor from '../components/molecules/EnterpriseMonitor';

const EnterpriseMonitorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <EnterpriseMonitor />
      </main>
      
      <Footer />
    </div>
  );
};

export default EnterpriseMonitorPage;

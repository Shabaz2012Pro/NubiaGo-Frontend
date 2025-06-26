import React from 'react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import NotificationManager from '../components/organisms/NotificationManager';
import Breadcrumb from '../components/molecules/Breadcrumb';

const NotificationPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Notifications', current: true }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Header />
      
      <main className="py-8">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <NotificationManager />
      </main>

      <Footer />
    </div>
  );
};

export default NotificationPage;
import React from 'react';
import FormDemo from '../components/organisms/FormDemo';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';

const FormDemoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Header />
      <main className="py-16">
        <FormDemo />
      </main>
      <Footer />
    </div>
  );
};

export default FormDemoPage;
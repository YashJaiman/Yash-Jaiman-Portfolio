import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className='w-full min-h-screen flex flex-col bg-[#05050f] relative app-mesh-bg'>
      <div className='fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden'>
        <div className='blob blob-1' />
        <div className='blob blob-2' />
        <div className='blob blob-3' />
      </div>

      <Navbar />

      <main className='flex-1 w-full relative z-10'>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;

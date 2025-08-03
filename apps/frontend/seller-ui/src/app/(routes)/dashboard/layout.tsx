'use client'
import SideBarWrapper from '../../../shared/components/sidebar/sidebar'
import React, { useState } from 'react';
import './page.css';

const Layout = ({children}: {children:React.ReactNode}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className='flex h-full min-h-screen'>
      
      {/* Sidebar */}
      <div className='main-content'>
        <div className="sticky top-0">
          <SideBarWrapper
            isMobileMenuOpen={isMobileMenuOpen}
            onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
          />
        </div>
    

      {/* Main content */}
      <main>
        {children}
      </main>
      </div>
    </div>
  );
}

export default Layout;

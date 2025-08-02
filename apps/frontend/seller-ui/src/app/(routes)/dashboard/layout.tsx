'use client'
import SideBarWrapper from '../../../shared/components/sidebar/sidebar'
import React, { useState } from 'react';
import './page.css';

const Layout = ({children}: {children:React.ReactNode}) => {
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className='flex h-full  min-h-sreen'>
        {/* sidebar */}
        <aside className='sidebar'>
            <div className='sticky top-0'>
                 <SideBarWrapper
          isMobileMenuOpen={isMobileMenuOpen}
          onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        />
            </div>
        </aside>

        <main className='flex-1'>
            <div className='overflow-x-auto'>
                {children}
            </div>
        </main>
    </div>
  )
}

export default Layout
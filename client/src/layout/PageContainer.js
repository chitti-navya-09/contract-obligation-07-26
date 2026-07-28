import React from 'react';

export default function PageContainer({ children }) {
  return (
    <div className="page-container">
      {children}
    </div>
  );
}
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const PageContainer = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageContainer;

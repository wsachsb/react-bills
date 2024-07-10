import React from 'react';
import Header from '../../../Components/pages/Header/Header';
import Footer from '../../../Components/pages/Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div style={{ minHeight: '80vh' }}> {/* Ajuste o minHeight conforme necessário */}
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

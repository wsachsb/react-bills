import React, { useContext } from 'react';
import Header from '../../../Components/pages/Header/Header';
import Footer from '../../../Components/pages/Footer/Footer';
import { UserContext } from "../../pages/UserContext/UserContext";
import './Layout.css';

const Layout = ({ children }) => {
  const { userResponse } = useContext(UserContext);

  return (
    <div>
      <Header userResponse={userResponse} />
      <div style={{ minHeight: '80vh' }}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

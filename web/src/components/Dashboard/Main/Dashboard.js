import React from "react";
import Header from '../../../Components/Header/Main/Header';
import Footer from '../../../Components/Footer/Main/Footer';


const DashboardMainDashboard = () => {

    return (
        <div>
            <br></br>
          <Header />
          <br></br><br></br><br></br>
          <div>
            {/* Main content of the page */}
            <h1>Welcome to my website!</h1>
            <p>This is the main page content.</p>
            
          </div>
          <br></br>
          <br></br>
          <br></br>
          <Footer />
        </div>
      );
}

export default DashboardMainDashboard;
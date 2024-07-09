import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import Header from '../../../Components/Header/Main/Header';
import Footer from '../../../Components/Footer/Main/Footer';
import MonthyList from '../../../Components/MonthlyBase/MonthyList';
import ListBox from '../../../Components/ListBox/ListBox';

const DashboardMainDashboard = () => {
  const [listBoxItems, setListBoxItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [listBoxLoaded, setListBoxLoaded] = useState(false);

  useEffect(() => {
    api.get('/month/list')
      .then(response => {
        console.log("API Response:", response.data);
        const items = response.data.content;
        setListBoxItems(items);
        setListBoxLoaded(true);
      })
      .catch(error => {
        console.error('There was an error fetching the list box items!', error);
      });
  }, []);

  useEffect(() => {
    console.log("Selected Item:", selectedItem); // Log the selected item
  }, [selectedItem]);

  return (
    <div>
      <br />
      <Header />
      <br /><br /><br />
      <div>
        <h1>Welcome to my Finance!</h1>
        <p>Summary Month</p>
        {listBoxLoaded && ( // Render only when ListBox is loaded
          <ListBox
            items={listBoxItems}
            selectedItem={selectedItem}
            onItemSelected={setSelectedItem}
          />
        )}
        {selectedItem && ( // Render MonthyList only when selectedItem is not null
          <MonthyList 
            selectedItem={selectedItem} 
          />
        )}
      </div>
      <br /><br /><br />
      <Footer />
    </div>
  );
};

export default DashboardMainDashboard;

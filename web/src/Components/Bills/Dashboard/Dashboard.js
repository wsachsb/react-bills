import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import MonthyList from '../../../Components/Bills/MonthlyBase/MonthyList';
import ListBox from '../../../Components/pages/ListBox/ListBox';
import './Dashboard.css';

const Dashboard = () => {
  const [listBoxItems, setListBoxItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [listBoxLoaded, setListBoxLoaded] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false); // Adicione este estado
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/month/list')
      .then(response => {
        const items = response.data.content;
        setListBoxItems(items);
        setListBoxLoaded(true);
      })
      .catch(error => {
        console.error('There was an error fetching the list box items!', error);
      });
  }, []);

  useEffect(() => {
    //console.log("Selecione o mês: ", selectedItem);
    // Verifica se há um item selecionado e define a visibilidade do botão
    setButtonVisible(!!selectedItem);
  }, [selectedItem]);

  const handleRevenuesClick = () => {
    if (selectedItem) {
      navigate(`/revenues`, {
        state: { selectedItem }
      });
    }
  };

  const handleExpensesClick = () => {
    if (selectedItem) {
      navigate(`/expenses`, {
        state: { selectedItem }
      });
    }
  };

  const handleBalancesClick = () => {
    if (selectedItem) {
      navigate(`/balances`, {
        state: { selectedItem }
      });
    }
  };

  return (
    <div>
      <div>
        <h1>Bem vindo(a) ao Dashboard!</h1>
        {listBoxLoaded && (
          <ListBox
            items={listBoxItems}
            selectedItem={selectedItem}
            onItemSelected={setSelectedItem}
          />
        )}
        {selectedItem && (
          <MonthyList selectedItem={selectedItem} />
        )}
      </div>
      {/* Botões visíveis apenas se selectedItem estiver definido */}
      {buttonVisible && (
        <div className="button-container">
          <button 
            onClick={handleRevenuesClick}
            className="dashboard-button"
          >
            Go to Revenues
          </button>
          <button 
            onClick={handleExpensesClick}
            className="dashboard-button"
          >
            Go to Expenses
          </button>
          <button 
            onClick={handleBalancesClick}
            className="dashboard-button"
          >
            Go to Balances
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

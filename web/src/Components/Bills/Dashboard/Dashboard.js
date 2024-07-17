import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import api from "../../../services/api";
import MonthyList from '../../../Components/Bills/MonthlyBase/MonthyList';
import ListBox from '../../../Components/pages/ListBox/ListBox';
import './Dashboard.css';

const Dashboard = () => {
  const [listBoxItems, setListBoxItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [listBoxLoaded, setListBoxLoaded] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/month/list')
      .then(response => {
        const items = response.data.content;
        setListBoxItems(items);
        setListBoxLoaded(true);

        // Carrega a opção selecionada do localStorage
        const savedSelectedItem = localStorage.getItem('selectedItem');
        if (savedSelectedItem) {
          const parsedItem = JSON.parse(savedSelectedItem);
          setSelectedItem(parsedItem);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the list box items!', error);
        setIsModalOpen(true); // Abre o modal em vez de alert
      });
  }, [navigate]);

  useEffect(() => {
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

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/signin');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content-container">
        <h1>Bem-vindo(a) ao Dashboard!</h1>
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
      {buttonVisible && (
        <div className="dashboard-button-container">
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Sessão Expirada"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Sessão Expirada</h2>
        <p>Sua sessão expirou. Por favor, faça um novo login.</p>
        <button onClick={closeModal}>OK</button>
      </Modal>
    </div>
  );
};

export default Dashboard;

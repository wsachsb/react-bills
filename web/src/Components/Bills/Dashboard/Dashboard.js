import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import api from "../../../services/api";
import MonthyList from '../../../Components/Bills/MonthlyBase/MonthyList';
import ListBox from '../../../Components/pages/ListBox/ListBox';
import BalanceForm from '../balances/balanceForm/balanceForm';
import './Dashboard.css';

const Dashboard = () => {
  const [listBoxItems, setListBoxItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [listBoxLoaded, setListBoxLoaded] = useState(false);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    refreshListBoxItems();
  }, [navigate]);

  const refreshListBoxItems = () => {
    api.get('/month/list')
      .then(response => {
        const items = response.data.content;
        setListBoxItems(items);
        setListBoxLoaded(true);

        const savedSelectedItem = localStorage.getItem('selectedItem');
        if (savedSelectedItem) {
          const parsedItem = JSON.parse(savedSelectedItem);
          setSelectedItem(parsedItem);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the list box items!', error);
        setIsSessionModalOpen(true);
      });
  };

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

  const openBalanceModal = () => {
    setIsBalanceModalOpen(true);
  };

  const closeBalanceModal = () => {
    setIsBalanceModalOpen(false);
  };

  const closeSessionModal = () => {
    setIsSessionModalOpen(false);
    navigate('/signin');
  };

  // Determine if the Edit/Delete buttons should be hidden
  const hideEditDeleteButtons = location.pathname === '/dashboard';

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
          <MonthyList
            selectedItem={selectedItem}
            hideEditDeleteButtons={hideEditDeleteButtons}  // Pass the prop here
          />
        )}
      </div>
      <div className="dashboard-button-container">
        <button
          onClick={handleRevenuesClick}
          className={`dashboard-button ${!selectedItem ? 'disabled' : ''}`}
          disabled={!selectedItem}
        >
          Revenues
        </button>
        <button
          onClick={handleExpensesClick}
          className={`dashboard-button ${!selectedItem ? 'disabled' : ''}`}
          disabled={!selectedItem}
        >
          Expenses
        </button>
        <button
          onClick={handleBalancesClick}
          className={`dashboard-button ${!selectedItem ? 'disabled' : ''}`}
          disabled={!selectedItem}
        >
          Balances
        </button>
        <button
          onClick={openBalanceModal}
          className={`add-dashboard-button ${!selectedItem ? 'disabled' : ''}`}
          disabled={!selectedItem}
        >
          +
        </button>
      </div>

      <Modal
        isOpen={isSessionModalOpen}
        onRequestClose={closeSessionModal}
        contentLabel="Sessão Expirada"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Sessão Expirada</h2>
        <p>Sua sessão expirou. Por favor, faça um novo login.</p>
        <button onClick={closeSessionModal}>OK</button>
      </Modal>

      <Modal
        isOpen={isBalanceModalOpen}
        onRequestClose={closeBalanceModal}
        contentLabel="Balance Form"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <BalanceForm closeModal={closeBalanceModal} onBalanceSubmit={handleBalancesClick} />
      </Modal>
    </div>
  );
};

export default Dashboard;

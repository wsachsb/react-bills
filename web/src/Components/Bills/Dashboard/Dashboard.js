import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const user = JSON.parse(localStorage.getItem('userResponse'));

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
        navigate('/signin');
      });
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

  return (
    <div className="dashboard-container">
      <div className="dashboard-content-container">
        <h1>Bem-vindo(a) {user.firstName}</h1>
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

      <button className="add-dashboard-button" onClick={openBalanceModal}>+</button>

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

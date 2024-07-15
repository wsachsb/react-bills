import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import RevenuesCard from "../revenues/revenuesCard";
import AddRevenueForm from "./AddRevenueForm";
import './Revenues.css';

const Revenues = () => {
  const [summaryList, setSummaryList] = useState([]);
  const [showForm, setShowForm] = useState(false); // Estado para controlar a exibição do formulário
  const location = useLocation();
  const { selectedItem } = location.state || {}; // Obtenha selectedItem do estado
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedItem && selectedItem.mesid && selectedItem.year) {
      const { mesid, year } = selectedItem;
      api.get(`/revenues/list/mes/${mesid}&${year}`)
        .then((response) => {
          setSummaryList(response.data.content || []);
        })
        .catch((error) => {
          alert('Sessão expirou, faça um novo login');
          navigate('/');
        });
    } else {
      setSummaryList([]);
    }
  }, [selectedItem, navigate, showForm]); // Adicione showForm como dependência para recarregar a lista

  const handleAddRevenue = () => {
    setShowForm(true); // Mostra o formulário
  };

  const handleCloseForm = () => {
    setShowForm(false); // Fecha o formulário
  };

  return (
    <div style={{ maxWidth: 800, margin: '30px auto' }}>
      {Array.isArray(summaryList) && summaryList.map((summaryItem) => (
        <RevenuesCard key={summaryItem.id} summaryItem={summaryItem} />
      ))}
      {showForm && (
        <div>
          <div className="modal-background" onClick={handleCloseForm}></div>
          <AddRevenueForm
            setSummaryList={setSummaryList}
            closeModal={handleCloseForm}
            mesid={selectedItem.mesid}
            year={selectedItem.year}
          />
        </div>
      )}
      <button className="add-revenue-button" onClick={handleAddRevenue}>
        +
      </button>
    </div>
  );
};

export default Revenues;

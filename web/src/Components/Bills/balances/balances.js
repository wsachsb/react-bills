import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import SummaryCard from "../Summary/Card/Card";

const Balances = () => {
  const [summaryList, setSummaryList] = useState([]);
  const location = useLocation();
  const { selectedItem } = location.state || {}; // Obtenha selectedItem do estado
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedItem && selectedItem.id && selectedItem.year) {
      api.get(`/balance/list`)
        .then((response) => {
          setSummaryList(response.data.content);
        })
        .catch((error) => {
          navigate('/dashboard');
        });
    } else {
      setSummaryList([]);
    }
  }, [selectedItem, navigate]);

  const refreshList = () => {
    localStorage.removeItem('selectedItem'); // Limpar o localStorage
    if (selectedItem && selectedItem.id && selectedItem.year) {
      api.get(`/balance/list`)
        .then((response) => {
          setSummaryList(response.data.content);
        })
        .catch((error) => {
          navigate('/dashboard');
        });
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '30px auto' }}>
      {summaryList.map((summaryItem) => (
        <SummaryCard key={summaryItem.id} summaryItem={summaryItem} refreshList={refreshList} />
      ))}
    </div>
  );
};

export default Balances;

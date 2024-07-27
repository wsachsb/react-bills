import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import SummaryCard from "./balanceCard/Card";
import './Balances.css';

const Balances = () => {
  const [summaryList, setSummaryList] = useState([]);
  const [countResults, setCountResults] = useState(0);
  const location = useLocation();
  const { selectedItem } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedItem && selectedItem.id && selectedItem.year) {
      api.get(`/balance/list`)
        .then((response) => {
          setSummaryList(response.data.content || []);
          setCountResults(response.data.totalElements || 0); // Atualiza o countResults
        })
        .catch((error) => {
          navigate('/dashboard');
        });
    } else {
      setSummaryList([]);
    }
  }, [selectedItem, navigate]);

  const refreshList = () => {
    localStorage.removeItem('selectedItem');
    if (selectedItem && selectedItem.id && selectedItem.year) {
      api.get(`/balance/list`)
        .then((response) => {
          setSummaryList(response.data.content || []);
          setCountResults(response.data.totalElements || 0); // Atualiza o countResults
        })
        .catch((error) => {
          navigate('/dashboard');
        });
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '30px auto' }}>
      <h4 className="balances-header">Balances {countResults} resultados...</h4>
      {summaryList.map((summaryItem) => (
        <SummaryCard
          key={summaryItem.id}
          summaryItem={summaryItem}
          refreshList={refreshList}
        />
      ))}
    </div>
  );
};

export default Balances;

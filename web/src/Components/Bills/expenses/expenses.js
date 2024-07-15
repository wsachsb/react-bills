import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import SummaryCard from "../Summary/Card/Card";

const Expenses = () => {
  const [summaryList, setSummaryList] = useState([]);
  const location = useLocation();
  const { selectedItem } = location.state || {}; // Obtenha selectedItem do estado
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedItem && selectedItem.mesid && selectedItem.year) {
      const { mesid, year } = selectedItem;
      api.get(`/expenses/list/mes/${mesid}&${year}`)
        .then((response) => {
          setSummaryList(response.data.content);
        })
        .catch((error) => {
          alert('Sessão expirou, faça um novo login');
          navigate('/');
        });
    } else {
      setSummaryList([]);
    }
  }, [selectedItem]);

  return (
    <div style={{ maxWidth: 800, margin: '30px auto' }}>
      {summaryList.map((summaryItem) => (
        <SummaryCard key={summaryItem.id} summaryItem={summaryItem} />
      ))}
    </div>
  );
};

export default Expenses;
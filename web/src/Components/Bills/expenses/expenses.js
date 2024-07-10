import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../../services/api";
import SummaryCard from "../Summary/Card/Card";

const Expenses = () => {
  const [summaryList, setSummaryList] = useState([]);
  const location = useLocation();
  const { selectedItem } = location.state || {}; // Obtenha selectedItem do estado

  useEffect(() => {
    console.log("Expenses:", selectedItem);

    if (selectedItem && selectedItem.id && selectedItem.year) {
      const { id, year } = selectedItem;
      api.get(`/expenses/list/mes/${id}&${year}`)
        .then((response) => {
          setSummaryList(response.data.content);
        })
        .catch((error) => {
          console.error('There was an error fetching the summary list!', error);
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

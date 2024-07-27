import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../../services/api";
import SummaryCard from "../../Bills/balances/balanceCard/Card";
import BalanceChart from "../../Bills/charts/balanceChart/BalanceChart";

const MonthyList = ({ selectedItem }) => {
  const [summaryList, setSummaryList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (selectedItem) {
      const { mesid, year } = selectedItem;
      api.get(`/dashboard/mes/${mesid}&${year}`)
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

  return (
    <div style={{ maxWidth: 800, margin: '30px auto' }}>
      {summaryList.map((summaryItem) => (
        <div key={summaryItem.id}>
          {/* <SummaryCard summaryItem={summaryItem} /> */}
          <BalanceChart summaryItem={summaryItem} />
        </div>
      ))}
    </div>
  );
};

export default MonthyList;

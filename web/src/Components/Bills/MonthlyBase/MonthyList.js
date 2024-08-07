import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import BalanceChart from "../../Bills/charts/balanceChart/BalanceChart";
import RevenuesChart from "../../Bills/charts/revenuesChart/RevenuesChart";
import ExpensesChart from "../../Bills/charts/expensesChart/ExpensesChart";
import "./MonthyList.css";

const MonthyList = ({ selectedItem }) => {
  const [summaryList, setSummaryList] = useState([]);
  const [revenuesData, setRevenuesData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const navigate = useNavigate();

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

      api.get(`/revenues/list/mes/${mesid}&${year}`)
        .then((response) => {
          setRevenuesData(response.data.content);
        })
        .catch((error) => {
          navigate('/dashboard');
        });

      api.get(`/expenses/list/mes/${mesid}&${year}`)
        .then((response) => {
          setExpensesData(response.data.content);
        })
        .catch((error) => {
          navigate('/dashboard');
        });
    } else {
      setSummaryList([]);
      setRevenuesData([]);
      setExpensesData([]);
    }
  }, [selectedItem, navigate]);

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
    <div className="charts-container">
      {summaryList.map((summaryItem) => (
        <div key={summaryItem.id} className="chart-item revenues-chart-item">
          <div className="chart-title">Receitas</div>
          <RevenuesChart summaryItem={summaryItem} revenues={revenuesData} />
          <button onClick={handleRevenuesClick} className="dashboard-button">Revenues</button>
        </div>
      ))}
      {summaryList.map((summaryItem) => (
        <div key={summaryItem.id} className="chart-item balance-chart-item">
          <div className="chart-title">Balanço</div>
          <BalanceChart summaryItem={summaryItem} />
          <button onClick={handleBalancesClick} className="dashboard-button">Balances</button>
        </div>
      ))}
      {summaryList.map((summaryItem) => (
        <div key={summaryItem.id} className="chart-item expenses-chart-item">
          <div className="chart-title">Despesas</div>
          <ExpensesChart summaryItem={summaryItem} expenses={expensesData} />
          <button onClick={handleExpensesClick} className="dashboard-button">Expenses</button>
        </div>
      ))}
    </div>
  );
};

export default MonthyList;

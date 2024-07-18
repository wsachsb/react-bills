import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import ExpensesCard from "../expenses/expenseCard/expensesCard";
import AddExpenseForm from "./add/AddExpenseForm";
import './Expenses.css';

const Expenses = () => {
    const [summaryList, setSummaryList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const location = useLocation();
    const { selectedItem } = location.state || {};
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedItem && selectedItem.mesid && selectedItem.year) {
            const { mesid, year } = selectedItem;
            api.get(`/expenses/list/mes/${mesid}&${year}`)
                .then((response) => {
                    setSummaryList(response.data.content || []);
                    console.log("expenses: " + JSON.stringify(response.data.content));
                })
                .catch((error) => {
                    navigate('/dashboard');
                });
        } else {
            setSummaryList([]);
        }
    }, [selectedItem, navigate, showForm]);

    const handleAddExpense = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const refreshList = () => {
        if (selectedItem && selectedItem.mesid && selectedItem.year) {
            const { mesid, year } = selectedItem;
            api.get(`/expenses/list/mes/${mesid}&${year}`)
                .then((response) => {
                    setSummaryList(response.data.content || []);
                    const coutResults = response.totalElements;
                    console.log("expenses: " + JSON.stringify(response.data.content));
                })
                .catch((error) => {
                    navigate('/dashboard');
                });
        }
    };

    return (
        <div style={{ maxWidth: 800, margin: '30px auto' }}>
            {Array.isArray(summaryList) && summaryList.map((summaryItem) => (
                <ExpensesCard
                    key={summaryItem.id}
                    summaryItem={summaryItem}
                    refreshList={refreshList}
                />
            ))}
            {showForm && (
                <div>
                    <div className="modal-background" onClick={handleCloseForm}></div>
                    <AddExpenseForm
                        setSummaryList={setSummaryList}
                        closeModal={handleCloseForm}
                        mesid={selectedItem.mesid}
                        year={selectedItem.year}
                    />
                </div>
            )}
            <button className="add-revenue-button" onClick={handleAddExpense}>
                +
            </button>
        </div>
    );
};

export default Expenses;

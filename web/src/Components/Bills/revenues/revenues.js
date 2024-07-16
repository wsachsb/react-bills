import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import AddRevenueForm from "./add/AddRevenueForm";
import RevenueCard from './revenuesCard/revenuesCard';
import './Revenues.css';

const Revenues = () => {
    const [summaryList, setSummaryList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const location = useLocation();
    const { selectedItem } = location.state || {};
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
                    navigate('/signin');
                });
        } else {
            setSummaryList([]);
        }
    }, [selectedItem, navigate, showForm]);

    const handleAddRevenue = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const refreshList = () => {
        if (selectedItem && selectedItem.mesid && selectedItem.year) {
            const { mesid, year } = selectedItem;
            api.get(`/revenues/list/mes/${mesid}&${year}`)
                .then((response) => {
                    setSummaryList(response.data.content || []);
                })
                .catch((error) => {
                    alert('Erro ao atualizar a lista de receitas');
                    console.error('Erro ao atualizar a lista de receitas:', error);
                });
        }
    };

    return (
        <div style={{ maxWidth: 800, margin: '30px auto' }}>
            {Array.isArray(summaryList) && summaryList.map((summaryItem) => (
                <RevenueCard
                    key={summaryItem.id}
                    summaryItem={summaryItem}
                    refreshList={refreshList}
                />
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

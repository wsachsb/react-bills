import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import SummaryCard from "../Summary/Card/Card";

const MonthyList = ({ selectedItem }) => {
    const [summaryList, setSummaryList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Selected Item antes:", selectedItem);

        if (selectedItem && selectedItem.id && selectedItem.year) {
            const { mesid, year } = selectedItem;
            api.get(`/dashboard/mes/${mesid}&${year}`)
                .then((response) => {
                    console.log("API Response for Summary:", response.data); // Log API response
                    setSummaryList(response.data.content);
                })
                .catch((error) => {
                    console.error('There was an error fetching the summary list!', error);
                    alert('Sessão expirou, faça um novo login');
                    navigate('/');
                });
        } else {
            setSummaryList([]);
        }
    }, [selectedItem, navigate]);

    return (
        <div style={{ maxWidth: 800, margin: '30px auto' }}>
            {summaryList.map((summaryItem) => (
                <SummaryCard key={summaryItem.id} summaryItem={summaryItem} />
            ))}
        </div>
    );
};

export default MonthyList;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import SummaryCard from "../Summary/Card/Card";

const MonthyList = ({ selectedItem }) => {
    const [summaryList, setSummaryList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("MonthList: " + JSON.stringify(selectedItem));
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
                <SummaryCard key={summaryItem.id} summaryItem={summaryItem} />
            ))}
        </div>
    );
};

export default MonthyList;

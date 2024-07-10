import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import SummaryCard from "../Summary/Card/Card";

const revenues = ({ selectedItem }) => {
    const [summaryList, setSummaryList] = useState([]);

    useEffect(() => {
        console.log("Revenues:", selectedItem);

        if (selectedItem && selectedItem.id && selectedItem.year) {
            const { id, year } = selectedItem;
            api.get(`/revenues/list/mes/${id}&${year}`)
                .then((response) => {
                    //console.log("API Response for Summary:", response.data); // Log API response
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

export default revenues;

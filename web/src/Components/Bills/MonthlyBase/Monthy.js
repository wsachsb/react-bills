import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import SummaryCard from "../Summary/Card/Card";

const MontlyBaseGetMontly = () => {

    const [summaryList, setSummaryList] = useState([]);

    useEffect(() => {
        api.get('month/list')
            .then((response) => {
                setSummaryList(response.data.content);
            });
    }, []);

    return (
        <div
            style={{
                maxWidth: 800,
                margin: '30px auto',
            }}
        >

            {summaryList.map((summaryItem) => (
                <SummaryCard summaryItem={summaryItem} />
            ))}

        </div>
    );
};

export default MontlyBaseGetMontly;
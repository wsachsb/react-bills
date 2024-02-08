import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import SummaryCard from "../../Components/Summary/Card/Card";

const MontlyBaseGetMontly = () => {

    const { id } = useParams();
    const [summaryList, setSummaryList] = useState([]);

    useEffect(() => {
        api.get('/summary/list')
            .then((response) => {
                setSummaryList(response.data.content);
                console.log(summaryList);
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
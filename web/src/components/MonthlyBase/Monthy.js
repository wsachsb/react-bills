import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import SummaryCard from "../Summary/Card/Card";

const MontlyBaseGetMontly = () => {

    const { id } = useParams();
    const [summaryList, setSummaryList] = useState([]);

    useEffect(() => {
        api.get('/summary/list/mes/' + id)
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

            <br></br>
            {JSON.stringify(summaryList)}

        </div>
    );
};

export default MontlyBaseGetMontly;
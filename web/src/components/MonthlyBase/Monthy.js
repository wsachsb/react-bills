import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import SummaryCard from "../Summary/Card/Card";
import Header from '../Header/Main/Header';
import Footer from '../Footer/Main/Footer';

const MontlyBaseGetMontly = () => {

    const { id } = useParams();
    const [summaryList, setSummaryList] = useState([]);

    useEffect(() => {
        api.get('/summary/list/mes/' + id)
            .then((response) => {
                console.log('response: ' + response);
                if (response.status === 200) {
                    console.log('200 redirectUrl');
                    setSummaryList(response.data.content);
                } else if (response.status === 403) {
                    const redirectUrl = api.get('/login');
                    console.log('403 redirectUrl: ' + redirectUrl);
                    window.location.href = redirectUrl;
                } else {
                    console.log(' Else Error');
                    console.error('Request failed with status code:', response.status);
                }
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Error occurred:', error.message);
            });
    }, []);

    return (
        <div
            style={{
                maxWidth: 800,
                margin: '30px auto',
            }}
        >
            <br></br>
            <Header />
            <br></br><br></br><br></br>

            {summaryList.map((summaryItem) => (
                <SummaryCard summaryItem={summaryItem} />
            ))}

            <br></br>
            {JSON.stringify(summaryList)}

            <br></br>
            <br></br>
            <br></br>
            <Footer />

        </div>
    );
};

export default MontlyBaseGetMontly;
import React, {useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

const MontlyBaseGetMontly = () => {

    const { id } = useParams();

    useEffect(() => {
        api.get('/summary/list')
            .then((response) =>{
                console.log(response.data);
            });
    });

    return (
        <div>handleMontlyBase {id}</div>
    );
}

export default MontlyBaseGetMontly;
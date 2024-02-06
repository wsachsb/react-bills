import React from "react";
import { useParams, Link } from "react-router-dom";

const MontlyBaseGetMontly = () => {

    const { id } = useParams();

    return (
        <div>handleMontlyBase {id}</div>
    );
}

export default MontlyBaseGetMontly;
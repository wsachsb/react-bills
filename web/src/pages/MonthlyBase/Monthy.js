import React from "react";
import { useParams } from "react-router-dom";

const MontlyBaseGetMontly = () => {
    const { id } = useParams();

    return (
            <div>
                MontlyBaseGetMontly {id && <div> id : {id}</div>} 
            </div>
        );
}

export default MontlyBaseGetMontly;
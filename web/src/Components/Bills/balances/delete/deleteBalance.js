import api from "../../../../services/api";

const deleteBalance = async (id) => {
    try {
        console.log("DeleteBalance: " + JSON.stringify(id));
        const response = await api.post(`/balance/remove/${id}`, {
        });
        console.log("DeleteBalance: " + JSON.stringify(response));
    } catch (error) {
        console.error('Erro ao deletar expense: ', error);
        throw error;
    }
};

export default deleteBalance;

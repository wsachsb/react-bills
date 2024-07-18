import api from "../../../../services/api";

const deleteBalance = async (id) => {
    try {
        await api.post(`/balance/remove/${id}`, {
        });
    } catch (error) {
        console.error('Erro ao deletar expense: ', error);
        throw error;
    }
};

export default deleteBalance;

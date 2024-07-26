import api from "../../../../services/api";

const balanceDelete = async (id) => {
    try {
        const response = await api.delete(`/balance/remove/${id}`, {
        });
    } catch (error) {
        console.error('Erro ao deletar expense: ', error);
        throw error;
    }
};

export default balanceDelete;

import api from "../../../../services/api";

const deleteRevenue = async (id) => {
    try {
        await api.post(`/expenses/remove/${id}`, {
        });
    } catch (error) {
        console.error('Erro ao deletar expense: ', error);
        throw error;
    }
};

export default deleteRevenue;

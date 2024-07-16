import api from "../../../../services/api";

const deleteRevenue = async (id) => {
    try {
        await api.post(`/revenues/remove/${id}`, {
        });
    } catch (error) {
        console.error('Erro ao deletar receita:', error);
        throw error;
    }
};

export default deleteRevenue;

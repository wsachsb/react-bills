import api from "../../../../services/api";

const updateRevenue = async (updatedRevenue) => {
    try {
        const response = await api.post(`/revenues/update/${updatedRevenue.id}`, updatedRevenue);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar receita:', error);
        throw error;
    }
};

export default updateRevenue;

import api from "../../../../services/api";

const updateRevenue = async (updatedRevenue) => {
    try {
        const data = {
            nomeReceita: updatedRevenue.nomeReceita,
            valor: updatedRevenue.valor,
            dtrecebimento: updatedRevenue.dtrecebimento,
            observacoes: updatedRevenue.observacoes,
            mesId: updatedRevenue.mesid,
            yearId: updatedRevenue.year
        }
        const response = await api.put(`/revenues/update/${updatedRevenue.id}`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar receita:', error);
        throw error;
    }
};

export default updateRevenue;

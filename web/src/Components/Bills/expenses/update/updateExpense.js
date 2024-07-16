import api from "../../../../services/api";

const updateExpense = async (updatedExpense) => {
    try {
        const response = await api.post(`/expenses/update/${updatedExpense.id}`, updatedExpense);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar expense:', error);
        throw error;
    }
};

export default updateExpense;

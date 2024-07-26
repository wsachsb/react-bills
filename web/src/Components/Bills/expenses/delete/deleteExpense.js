import api from "../../../../services/api";

const deleteExpense = async (id) => {
    try {
        await api.delete(`/expenses/remove/${id}`, {
        });
    } catch (error) {
        console.error('Erro ao deletar expense: ', error);
        throw error;
    }
};

export default deleteExpense;

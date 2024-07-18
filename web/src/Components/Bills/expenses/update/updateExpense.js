import api from "../../../../services/api";

const updateExpense = async (updatedExpense) => {
    try {
        const data = {
            nomeConta: updatedExpense.nomeConta,
            valor: updatedExpense.valor,
            dtvencimento: updatedExpense.dtvencimento,
            dtpagamento: updatedExpense.dtpagamento,
            situacao: updatedExpense.situacao,
            observacoes: updatedExpense.observacoes,
            mesId: updatedExpense.mesid,
            yearId: updatedExpense.year
        };
        console.log("updatedExpense: " + JSON.stringify(updatedExpense));
        console.log("Data: " + JSON.stringify(data));
        const response = await api.post(`/expenses/update/${updatedExpense.id}`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar despesa:', error);
        throw error;
    }
};

export default updateExpense;

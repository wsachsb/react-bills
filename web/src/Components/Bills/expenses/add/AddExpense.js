import api from "../../../../services/api";

const addExpenses = async (data, navigate) => {
  try {
    await api.post('/expenses/add', data);
    return true;
  } catch (error) {
    console.error('Erro ao adicionar expenses:', error);
    return false;
  }
};

export default addExpenses;

import api from "../../../../services/api";

const addExpenses = async (data, navigate) => {
  console.log("Expenses: ", data);
  try {
    const response = await api.post('/expenses/add', data);
    return true; // Indica que a receita foi adicionada com sucesso
  } catch (error) {
    console.error('Erro ao adicionar expenses:', error);
    return false; // Indica que houve um erro ao adicionar a receita
    // alert('Sessão expirou, faça um novo login');
    // navigate('/');
  }
};

export default addExpenses;

import api from "../../../services/api";

const addRevenues = async (data, navigate) => {
  try {
    const response = await api.post('/revenues/add', data);
    console.log("Revenue response: ", response.data.content);
    return true; // Indica que a receita foi adicionada com sucesso
  } catch (error) {
    console.error('Erro ao adicionar receita:', error);
    return false; // Indica que houve um erro ao adicionar a receita
    // alert('Sessão expirou, faça um novo login');
    // navigate('/');
  }
};

export default addRevenues;

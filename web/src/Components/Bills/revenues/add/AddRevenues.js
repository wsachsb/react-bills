import api from "../../../../services/api";

const addRevenues = async (data, navigate) => {
  try {
    await api.post('/revenues/add', data);
    return true;
  } catch (error) {
    console.error('Erro ao adicionar receita:', error);
    return false;
  }
};

export default addRevenues;

import React, { useState } from 'react';
import addExpense from './AddExpense.js';
import './AddExpenseForm.css';

const AddExpenseForm = ({ setSummaryList, closeModal, mesid, year }) => {
  const [nomeConta, setNomeConta] = useState('');
  const [valor, setValor] = useState('');
  const [dtvencimento, setDtvencimento] = useState('');
  const [dtpagamento, setDtpagamento] = useState('');
  const [situacao, setSituacao] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [error, setError] = useState('');

  const formatCurrency = (value) => {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = (numericValue / 100).toFixed(2).replace('.', ',');
    return `R$ ${formattedValue}`;
  };

  const handleValorChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    if (numericValue.length <= 15) {
      setValor(formatCurrency(numericValue));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const numericValor = valor.replace(/[^\d,]/g, '').replace(',', '.');

    const dataToSubmit = {
      nomeConta,
      valor: numericValor,
      dtvencimento,
      dtpagamento,
      situacao: situacao === 'aberto' ? 'open' : 'paid',
      observacoes,
      mesId: mesid,
      yearId: year
    };

    try {
      const newExpense = await addExpense(dataToSubmit);
      setSummaryList((prevList) => [...prevList, newExpense]);
      closeModal();
    } catch (error) {
      setError('Erro ao adicionar despesa. Por favor, tente novamente.'); // Atualiza o estado de erro
    }
  };

  return (
    <div className="add-expense-form">
      <h2>Adicionar Despesas</h2>
      {error && <p className="error-message">{error}</p>} {/* Exibe mensagem de erro */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nomeConta">Nome</label>
          <input
            id="nomeConta"
            type="text"
            placeholder="Nome da Despesa"
            value={nomeConta}
            onChange={(e) => setNomeConta(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="valor">Valor</label>
          <input
            id="valor"
            type="text"
            placeholder="Valor"
            value={valor}
            onChange={handleValorChange}
            required
            title="Digite apenas números. Exemplo: 1099 para R$ 10,99"
          />
        </div>
        <div>
          <label htmlFor="dtvencimento">Data de Vencimento</label>
          <input
            id="dtvencimento"
            type="date"
            placeholder="Data de Vencimento"
            value={dtvencimento}
            onChange={(e) => setDtvencimento(e.target.value)}
            onFocus={(e) => e.target.showPicker && e.target.showPicker()}
            required
          />
        </div>
        <div>
          <label htmlFor="dtpagamento">Data de Pagamento</label>
          <input
            id="dtpagamento"
            type="date"
            placeholder="Data de Pagamento"
            value={dtpagamento}
            onChange={(e) => setDtpagamento(e.target.value)}
            onFocus={(e) => e.target.showPicker && e.target.showPicker()}
            required
          />
        </div>
        <div>
          <label htmlFor="situacao">Situação</label>
          <select className='add-expense-form-select'
            id="situacao"
            value={situacao}
            onChange={(e) => setSituacao(e.target.value)}
            required
          >
            <option value="" disabled>Selecione uma opção</option>
            <option value="aberto">Aberto</option>
            <option value="pago">Pago</option>
          </select>
        </div>
        <div>
          <label htmlFor="observacoes">Observações</label>
          <textarea
            id="observacoes"
            placeholder="Observações"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            maxLength={4000}
          />
        </div>
        <input
          type="hidden"
          id="mesId"
          name="mesId"
          value={mesid}
        />
        <input
          type="hidden"
          id="yearId"
          name="yearId"
          value={year}
        />
        <button type="submit">Enviar</button>
        <button type="button" onClick={closeModal}>Cancelar</button>
      </form>
    </div>
  );
};

export default AddExpenseForm;

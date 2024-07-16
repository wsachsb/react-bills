import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddExpense from './AddExpense.js';
import './AddExpenseForm.css';

const AddExpenseForm = ({ setSummaryList, closeModal, mesid, year }) => {
    const [nomeConta, setNomeConta] = useState('');
    const [valor, setValor] = useState('');
    const [dtvencimento, setDtvencimento] = useState('');
    const [dtpagamento, setDtpagamento] = useState('');
    const [situacao, setSituacao] = useState('');    
    const [observacoes, setObservacoes] = useState('');
    const navigate = useNavigate();

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

        const mesId = mesid;
        const yearId = year;

        const numericValor = valor.replace(/[^\d,]/g, '').replace(',', '.');

        const dataToSubmit = {
            nomeConta,
            valor: numericValor,
            dtvencimento,
            dtpagamento,
            situacao,
            observacoes,
            mesId,
            yearId
        };

        try {
            await AddExpense(dataToSubmit, setSummaryList, navigate);
            console.log('Despesa adicionada com sucesso');
            closeModal();
        } catch (error) {
            console.error('Erro ao adicionar despesa:', error);
        }
    };

    return (
        <div className="add-expense-form">
            <h2>Adicionar Despesas</h2>
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
                    <input
                        id="situacao"
                        type="text"
                        placeholder="Situação"
                        value={situacao}
                        onChange={(e) => setSituacao(e.target.value)}
                        required
                    />
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

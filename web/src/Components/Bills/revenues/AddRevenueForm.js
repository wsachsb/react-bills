import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import addRevenues from './addRevenues';
import './AddRevenueForm.css';

const AddRevenueForm = ({ setSummaryList, closeModal, mesid, year }) => {
    const [nomeReceita, setNomeReceita] = useState('');
    const [valor, setValor] = useState('');
    const [dtrecebimento, setDtrecebimento] = useState('');
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
            nomeReceita,
            valor: numericValor,
            dtrecebimento,
            observacoes,
            mesId,
            yearId
        };

        try {
            await addRevenues(dataToSubmit, setSummaryList, navigate);
            console.log('Receita adicionada com sucesso');
            closeModal();
        } catch (error) {
            console.error('Erro ao adicionar receita:', error);
        }
    };

    return (
        <div className="add-revenue-form">
            <h2>Adicionar Receita</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nomeReceita">Nome</label>
                    <input
                        id="nomeReceita"
                        type="text"
                        placeholder="Nome da Receita"
                        value={nomeReceita}
                        onChange={(e) => setNomeReceita(e.target.value)}
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
                    <label htmlFor="data">Data</label>
                    <input
                        id="data"
                        type="date"
                        placeholder="Data de recebimento da receita"
                        value={dtrecebimento}
                        onChange={(e) => setDtrecebimento(e.target.value)}
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

export default AddRevenueForm;

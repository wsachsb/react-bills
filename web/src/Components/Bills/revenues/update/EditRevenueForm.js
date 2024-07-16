import React, { useState } from 'react';
import updateRevenue from './updateRevenue';
import './EditRevenueForm.css';  // Reutilizando o mesmo CSS do AddRevenueForm

const EditRevenueForm = ({ revenue, closeModal, refreshList }) => {
    const [nomeReceita, setNomeReceita] = useState(revenue.nomeReceita);
    const [valor, setValor] = useState(revenue.valor);
    const [dtrecebimento, setDtrecebimento] = useState(revenue.dtrecebimento);
    const [observacoes, setObservacoes] = useState(revenue.observacoes);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedRevenue = {
            id: revenue.id,
            nomeReceita,
            valor,
            dtrecebimento,
            observacoes,
        };

        try {
            await updateRevenue(updatedRevenue);
            if (refreshList) {
                refreshList();
            }
            closeModal();
        } catch (error) {
            console.error('Erro ao atualizar receita:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={closeModal}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Descrição</label>
                        <input
                            type="text"
                            value={nomeReceita}
                            onChange={(e) => setNomeReceita(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Valor</label>
                        <input
                            type="number"
                            value={valor}
                            onChange={(e) => setValor(parseFloat(e.target.value))}
                        />
                    </div>
                    <div className="form-group">
                        <label>Data de Recebimento</label>
                        <input
                            type="date"
                            value={dtrecebimento}
                            onChange={(e) => setDtrecebimento(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Observações</label>
                        <textarea
                            value={observacoes}
                            onChange={(e) => setObservacoes(e.target.value)}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="save-button">Salvar</button>
                        <button type="button" className="cancel-button" onClick={closeModal}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditRevenueForm;

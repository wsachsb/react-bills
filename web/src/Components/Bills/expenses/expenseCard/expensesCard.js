import React, { useState } from 'react';
import deleteExpense from '../delete/deleteExpense';
import EditExpenseForm from '../update/EditExpenseForm';
import './expensesCard';

const formatCurrency = (value) => {
    if (value == null) {
        return "R$ 0,00";
    }
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const ExpenseCard = ({ summaryItem, refreshList }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = () => {
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteExpense(summaryItem.id);
            if (refreshList) {
                refreshList();
            }
        } catch (error) {
            console.error('Erro ao deletar expense:', error);
        } finally {
            setShowConfirm(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCloseEditForm = () => {
        setIsEditing(false);
    };

    return (
        <div className="promotion-card">
            <div className="button-container">
                <button className="edit-button" onClick={handleEdit}>Editar</button>
                <button className="delete-button" onClick={handleDelete}>Excluir</button>
            </div>
            <div className="card-content">
                <div className="field-container">
                    <label className="field-label">Descrição:</label>
                    <input
                        className="promotion-card__info"
                        type="text"
                        value={summaryItem.nomeConta}
                    />
                </div>
                <div className="field-container">
                    <label className="field-label">Valor à pagar:</label>
                    <input
                        type="text"
                        value={formatCurrency(summaryItem.valor)}
                    />
                </div>
                <div className="field-container">
                    <label className="field-label">Data de Vencimento:</label>
                    <input
                        type="text"
                        value={summaryItem.dtvencimento}
                    />
                </div>
                <div className="field-container">
                    <label className="field-label">Data de Pagamento:</label>
                    <input
                        type="text"
                        value={summaryItem.dtpagamento}
                    />
                </div>                
                <div className="field-container">
                    <label className="field-label">Situacao:</label>
                    <input
                        type="text"
                        value={summaryItem.situacao}
                    />
                </div>
                <div className="field-container">
                    <label className="field-label">Observações:</label>
                    <input
                        type="text"
                        value={summaryItem.observacoes}
                    />
                </div>
                <div className="field-container">
                    <label className="field-label">Categoria:</label>
                    <input
                        type="text"
                        value={summaryItem.categoria}
                    />
                </div>
            </div>
            {showConfirm && (
                <div className="confirm-modal">
                    <p>Deseja deletar esse registro?</p>
                    <button className="confirm-yes" onClick={handleConfirmDelete}>Sim</button>
                    <button className="confirm-no" onClick={() => setShowConfirm(false)}>Não</button>
                </div>
            )}
            {isEditing && (
                <EditExpenseForm
                    expense={summaryItem}
                    closeModal={handleCloseEditForm}
                    refreshList={refreshList}
                />
            )}
        </div>
    );
};

export default ExpenseCard;

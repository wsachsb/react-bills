import React, { useState } from 'react';
import deleteRevenue from '../delete/deleteRevenue';
import EditRevenueForm from '../update/EditRevenueForm';
import './revenuesCard.css';

const formatCurrency = (value) => {
    if (value == null) {
        return "R$ 0,00";
    }
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const RevenueCard = ({ summaryItem, refreshList }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = () => {
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteRevenue(summaryItem.id);
            if (refreshList) {
                refreshList();
            }
        } catch (error) {
            console.error('Erro ao deletar receita:', error);
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
                        value={summaryItem.nomeReceita}
                    />
                </div>
                <div className="field-container">
                    <label className="field-label">Valor à receber:</label>
                    <input
                        type="text"
                        value={formatCurrency(summaryItem.valor)}
                    />
                </div>
                <div className="field-container">
                    <label className="field-label">Data à receber:</label>
                    <input
                        type="text"
                        value={summaryItem.dtrecebimento}
                    />
                </div>
                <div className="field-container">
                    <label className="field-label">Observações:</label>
                    <input
                        type="text"
                        value={summaryItem.observacoes}
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
                <EditRevenueForm
                    revenue={summaryItem}
                    closeModal={handleCloseEditForm}
                    refreshList={refreshList}
                />
            )}
        </div>
    );
};

export default RevenueCard;

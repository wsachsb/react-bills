import React, { useState } from 'react';
import Modal from 'react-modal';
import deleteRevenue from '../delete/deleteRevenue';
import updateRevenue from '../update/updateRevenue';
import './revenuesCard.css';

const formatCurrency = (value) => {
    if (value == null) {
        return "R$ 0,00";
    }
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const RevenueCard = ({ summaryItem, selectedItem, refreshList }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editValues, setEditValues] = useState({
        nomeReceita: summaryItem.nomeReceita,
        valor: summaryItem.valor,
        dtrecebimento: summaryItem.dtrecebimento,
        observacoes: summaryItem.observacoes,
    });
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

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

    const handleSave = async () => {
        try {
            await updateRevenue({
                ...summaryItem,
                ...selectedItem,
                ...editValues,
            });
            setModalMessage("Atualizado com sucesso!");
            setShowModal(true);
            if (refreshList) {
                refreshList();
            }
            setIsEditing(false); // Finaliza o modo de edição após salvar
        } catch (error) {
            console.error('Erro ao atualizar receita:', error);
            setModalMessage("Erro ao atualizar receita.");
            setShowModal(true);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditValues({
            ...editValues,
            [name]: value,
        });
    };

    const handleCancelEdit = () => {
        // Resetar os valores de edição para os originais
        setEditValues({
            nomeReceita: summaryItem.nomeReceita,
            valor: summaryItem.valor,
            dtrecebimento: summaryItem.dtrecebimento,
            observacoes: summaryItem.observacoes,
        });
        setIsEditing(false); // Finaliza o modo de edição sem salvar
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="promotion-card">
            <div className="button-container">
                {isEditing ? (
                    <React.Fragment>
                        <button className="save-button" onClick={handleSave}>Salvar</button>
                        <button className="cancel-button" onClick={handleCancelEdit}>Cancelar</button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <button className="edit-button" onClick={handleEdit}>Editar</button>
                        <button className="delete-button" onClick={handleDelete}>Excluir</button>
                    </React.Fragment>
                )}
            </div>
            <div className="card-content">
                <div className="field-container">
                    <label className="field-label">Descrição:</label>
                    <input
                        className="promotion-card__info"
                        type="text"
                        name="nomeReceita"
                        value={isEditing ? editValues.nomeReceita : summaryItem.nomeReceita}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>
                <div className="field-container">
                    <label className="field-label">Valor à receber:</label>
                    <input
                        type="text"
                        name="valor"
                        value={isEditing ? editValues.valor : formatCurrency(summaryItem.valor)}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>
                <div className="field-container">
                    <label className="field-label">Data à receber:</label>
                    <input
                        type="text"
                        name="dtrecebimento"
                        value={isEditing ? editValues.dtrecebimento : summaryItem.dtrecebimento}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>
                <div className="field-container">
                    <label className="field-label">Observações:</label>
                    <input
                        type="text"
                        name="observacoes"
                        value={isEditing ? editValues.observacoes : summaryItem.observacoes}
                        onChange={handleChange}
                        readOnly={!isEditing}
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
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                className="modal-revenue"
                overlayClassName="modal-background"
                ariaHideApp={false}
            >
                <div>
                    <p>{modalMessage}</p>
                    <button className="modal-button" onClick={closeModal}>OK</button>
                </div>
            </Modal>
        </div>
    );
};

export default RevenueCard;

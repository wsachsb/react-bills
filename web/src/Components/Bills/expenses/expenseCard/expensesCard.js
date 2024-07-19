import React, { useState } from 'react';
import Modal from 'react-modal';
import deleteExpense from '../delete/deleteExpense';
import updateExpense from '../update/updateExpense';
import './expensesCard.css';

// Configuração do appElement para acessibilidade
Modal.setAppElement('#root'); // Certifique-se de que o ID está correto para o seu elemento root

const formatCurrency = (value) => {
    if (value == null) {
        return "R$ 0,00";
    }
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const translateSituacao = (situacao) => {
    switch (situacao) {
        case 'open':
            return 'Aberto';
        case 'paid':
            return 'Pago';
        default:
            return 'Desconhecido';
    }
};

const ExpenseCard = ({ summaryItem, refreshList }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editValues, setEditValues] = useState({
        nomeConta: summaryItem.nomeConta,
        valor: summaryItem.valor,
        dtvencimento: summaryItem.dtvencimento,
        dtpagamento: summaryItem.dtpagamento,
        situacao: summaryItem.situacao,
        observacoes: summaryItem.observacoes,
        categoria: summaryItem.categoria,
    });
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

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

    const handleSave = async () => {
        try {
            await updateExpense({
                ...summaryItem,
                ...editValues,
            });
            if (refreshList) {
                refreshList();
            }
            setModalMessage("Atualizado com sucesso!");
            setShowModal(true); // Atualizado aqui
            setIsEditing(false);
        } catch (error) {
            console.error('Erro ao atualizar receita:', error);
            setModalMessage("Erro ao atualizar receita.");
            setShowModal(true); // Atualizado aqui
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
        setEditValues({
            nomeConta: summaryItem.nomeConta,
            valor: summaryItem.valor,
            dtvencimento: summaryItem.dtvencimento,
            dtpagamento: summaryItem.dtpagamento,
            situacao: summaryItem.situacao,
            observacoes: summaryItem.observacoes,
            categoria: summaryItem.categoria,
        });
        setIsEditing(false);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="expense-card">
            <div className="expense-card__button-container">
                {isEditing ? (
                    <React.Fragment>
                        <button className="expense-card__save-button" onClick={handleSave}>Salvar</button>
                        <button className="expense-card__cancel-button" onClick={handleCancelEdit}>Cancelar</button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <button className="expense-card__edit-button" onClick={handleEdit}>Editar</button>
                        <button className="expense-card__delete-button" onClick={handleDelete}>Excluir</button>
                    </React.Fragment>
                )}
            </div>
            <div className="expense-card__content">
                <div className="expense-card__field-container">
                    <label className="expense-card__field-label">Descrição:</label>
                    <input
                        className="expense-card__info"
                        type="text"
                        name="nomeConta"
                        value={isEditing ? editValues.nomeConta : summaryItem.nomeConta}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>
                <div className="expense-card__field-container">
                    <label className="expense-card__field-label">Valor à pagar:</label>
                    <input
                        type="text"
                        name="valor"
                        value={isEditing ? editValues.valor : formatCurrency(summaryItem.valor)}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>
                <div className="expense-card__field-container">
                    <label className="expense-card__field-label">Data de Vencimento:</label>
                    <input
                        type="text"
                        name="dtvencimento"
                        value={isEditing ? editValues.dtvencimento : summaryItem.dtvencimento}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>
                <div className="expense-card__field-container">
                    <label className="expense-card__field-label">Data de Pagamento:</label>
                    <input
                        type="text"
                        name="dtpagamento"
                        value={isEditing ? editValues.dtpagamento : summaryItem.dtpagamento}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>
                <div className="expense-card__field-container">
                    <label className="expense-card__field-label">Situação:</label>
                    <div className="expense-card__info">
                        {isEditing ? (
                            <select
                                name="situacao"
                                value={editValues.situacao}
                                onChange={handleChange}
                            >
                                <option value="open">Aberto</option>
                                <option value="paid">Pago</option>
                            </select>
                        ) : (
                            translateSituacao(summaryItem.situacao)
                        )}
                    </div>
                </div>
                <div className="expense-card__field-container">
                    <label className="expense-card__field-label">Observações:</label>
                    <input
                        type="text"
                        name="observacoes"
                        value={isEditing ? editValues.observacoes : summaryItem.observacoes}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                </div>
                <div className="expense-card__field-container">
                    <label className="expense-card__field-label">Categoria:</label>
                    <input
                        type="text"
                        name="categoria"
                        value={isEditing ? editValues.categoria : summaryItem.categoria}
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

export default ExpenseCard;

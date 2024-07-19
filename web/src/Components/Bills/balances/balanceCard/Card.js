import React, { useState } from 'react';
import './Card.css';
import deleteBalance from '../balanceDelete/balanceDelete';
import Modal from 'react-modal';

const formatCurrency = (value) => {
  if (value == null) {
    value = 0.00;
  }
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const SummaryCard = ({ summaryItem, refreshList, hideEditDeleteButtons }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEdit = () => {
    // Implementar a lógica de edição aqui
    console.log('Editar item:', summaryItem);
  };

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteBalance(summaryItem.id);
      console.log('Item deletado:', summaryItem);
      if (refreshList) {
        refreshList();
      }
    } catch (error) {
      console.error('Erro ao deletar o item:', error.message);
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <div className="promotion-card">
      <h3 className="promotion-card__title">Resumo mês: {summaryItem.mes}</h3>

      <div className="card-content">
        <div className="field-container">
          <span className="field-label">Receitas:</span>
          <input
            type="text"
            value={formatCurrency(summaryItem.totalReceitas)}
            readOnly
            className="promotion-card__info"
          />
        </div>
        <div className="field-container">
          <span className="field-label">Despesas:</span>
          <input
            type="text"
            value={formatCurrency(summaryItem.totalDespesas)}
            readOnly
            className="promotion-card__info"
          />
        </div>
        <div className="field-container">
          <span className="field-label">Saldo:</span>
          <input
            type="text"
            value={formatCurrency(summaryItem.totalReceitas - summaryItem.totalDespesas)}
            readOnly
            className="promotion-card__info"
          />
        </div>
      </div>

      {!hideEditDeleteButtons && (
        <div className="button-container">
          <button className="edit-button" onClick={handleEdit}>Editar</button>
          <button className="delete-button" onClick={handleDelete}>Deletar</button>
        </div>
      )}

      {showConfirm && (
        <Modal
          isOpen={showConfirm}
          onRequestClose={() => setShowConfirm(false)}
          className="confirm-modal"
          overlayClassName="modal-background"
          ariaHideApp={false}
        >
          <div>
            <p>Deseja deletar esse registro?</p>
            <button className="confirm-yes" onClick={handleConfirmDelete}>Sim</button>
            <button className="confirm-no" onClick={() => setShowConfirm(false)}>Não</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SummaryCard;

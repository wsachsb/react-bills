import React from 'react';
import './Card.css';
import deleteBalance from '../../balances/delete/deleteBalance';

const formatCurrency = (value) => {
  if (value == null) {
    value = 0.00;
  }
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const SummaryCard = ({ summaryItem }) => {
  const handleEdit = () => {
    // Implementar a lógica de edição aqui
    console.log('Editar item:', summaryItem);
  };

  const handleDelete = async () => {
    try {
      await deleteBalance(summaryItem.id); // Chamada para deletar o item
      console.log('Item deletado:', summaryItem);
      // Aqui você pode adicionar lógica adicional após a exclusão, como atualizar a UI
    } catch (error) {
      // Tratar erros de deleção aqui
      console.error('Erro ao deletar o item:', error.message);
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

      <div className="button-container">
        <button className="edit-button" onClick={handleEdit}>Editar</button>
        <button className="delete-button" onClick={handleDelete}>Deletar</button>
      </div>
    </div>
  );
};

export default SummaryCard;

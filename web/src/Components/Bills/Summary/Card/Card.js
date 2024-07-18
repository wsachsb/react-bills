import React from 'react';
import './Card.css';

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

  const handleDelete = () => {
    // Implementar a lógica de exclusão aqui
    console.log('Deletar item:', summaryItem);
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

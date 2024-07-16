import React from 'react';
import './Card.css';

const formatCurrency = (value) => {
  if (value == null) {
    value = 0.00;
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });;
  }
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const SummaryCard = ({ summaryItem }) => (
  <div className="promotion-card">
    <h1 className="promotion-card__title">{'Resumo mês: ' + summaryItem.mes}</h1>

    <div className="promotion-card__info">
      <div className="promotion-card__field">
        <label className="promotion-card__label">Receitas:</label>
        <input
          type="text"
          value={formatCurrency(summaryItem.totalReceitas)}
          readOnly
          className="promotion-card__input promotion-card__revenues"
        />
      </div>
      <div className="promotion-card__field">
        <label className="promotion-card__label">Despesas:</label>
        <input
          type="text"
          value={formatCurrency(summaryItem.totalDespesas)}
          readOnly
          className="promotion-card__input promotion-card__expenses"
        />
      </div>
      <div className="promotion-card__field">
        <label className="promotion-card__label">Saldo:</label>
        <input
          type="text"
          value={formatCurrency(summaryItem.totalReceitas - summaryItem.totalDespesas)}
          readOnly
          className="promotion-card__input promotion-card__price"
        />
      </div>
    </div>
  </div>
);

export default SummaryCard;

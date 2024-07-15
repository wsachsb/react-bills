import React from 'react';
import './Card.css';

const formatCurrency = (value) => {
  if (value == null) {
    return "0,00";
  }
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const SummaryCard = ({ summaryItem }) => (
  <div className="promotion-card">
    <div className="promotion-card__info">
      <h1 className="promotion-card__title">{'Resumo mês: ' + summaryItem.mes}</h1>

      <span className="promotion-card__revenues">{formatCurrency(summaryItem.totalReceitas)}</span>
      <br></br>
      <span className="promotion-card__expenses">{formatCurrency(summaryItem.totalDespesas)}</span>
      <br></br>
      <span className="promotion-card__price">{formatCurrency(summaryItem.totalReceitas - summaryItem.totalDespesas)}</span>

      <footer className="promotion-card__footer">
      </footer>
    </div>
  </div>
);

export default SummaryCard;

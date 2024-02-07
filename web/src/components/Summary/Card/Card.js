import React from 'react';
import './Card.css';
import Logo from "./logo.svg";

const SummaryCard = ({ summaryItem }) => (
  <div className="promotion-card">
    <img
      src={Logo}
      alt="Logo descrição"
      className="promotion-card__image"
    />
    <div className="promotion-card__info">
      <h1 className="promotion-card__title">{summaryItem.mes.nome_mes}</h1>
      <span className="promotion-card__price">R$ {summaryItem.totalReceitas}</span>

      <span className="promotion-card__price"> R$ {summaryItem.totalDespesas}</span>
      <footer className="promotion-card__footer">
        {summaryItem.length > 0 && (
          <div className="promotion-card__comment">
            "{summaryItem.mes.nome_mes}"
          </div>
        )}
        <div className="promotion-card__comments-count">
          {summaryItem.mes.length}{' '}
          {summaryItem.mes.length > 1 ? 'Mês Referência' : 'Selecione mês referência'}
        </div>
        <a
          href={summaryItem.mes.nome_mes}
          target="_blank"
          rel="noopener noreferrer"
          className="promotion-card__link"
        >
          IR PARA O SITE
        </a>
      </footer>
    </div>
  </div>
);

export default SummaryCard;

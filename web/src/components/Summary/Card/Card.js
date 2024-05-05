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
      <h1 className="promotion-card__title">{'Resumo mês: ' + summaryItem.mes.mes}</h1>
      <span className="promotion-card__price">R$ {summaryItem.totalReceitas}</span>
      <br></br>
      <span className="promotion-card__price"> R$ {summaryItem.totalDespesas}</span>
      
      <footer className="promotion-card__footer">
        {summaryItem.length > 0 && (
          <div className="promotion-card__comment">
            "{summaryItem.mes.nome_mes}"
          </div>
        )}
        <div className="promotion-card__comments-count">
          {summaryItem.mes.length}{' '}
          {summaryItem.mes.length > 1 ? 'Mês Referência: ' + summaryItem.mes.nome_mes : 'Mês referência: ' + summaryItem.mes.nome_mes}
        </div>
        <a
          href={summaryItem.mes.nome_mes}
          target="_blank"
          rel="noopener noreferrer"
          className="promotion-card__link"
        >
          CLIQUE PARA EDITAR
        </a>
      </footer>
    </div>
    <br></br><br></br><br></br>
  </div>
);

export default SummaryCard;

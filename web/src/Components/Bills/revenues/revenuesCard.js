import React from 'react';

const formatCurrency = (value) => {
    if (value == null) {
        return "0,00";
    }
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const SummaryCard = ({ summaryItem }) => (
    <div className="promotion-card">
        <div>
            <h2 className="promotion-card__info">{'Descrição: ' + summaryItem.nomeReceita}</h2>
            <span>{'Valor à receber: ' + formatCurrency(summaryItem.valor)}</span>
            <br></br>
            <span>{'Data à receber: ' + summaryItem.dtrecebimento}</span>
            <br></br>
            <span>{'Observações: ' + summaryItem.observacoes}</span>
        </div>
    </div>

);

export default SummaryCard;

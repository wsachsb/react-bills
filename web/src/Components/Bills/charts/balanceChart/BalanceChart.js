import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './BalanceChart.css';

const PRIMARY_COLOR = '#007bff'; // Cor primária do projeto
const LIGHT_PRIMARY_COLOR = '#66b3ff'; // Cor mais clara da primária

const COLORS = [PRIMARY_COLOR, LIGHT_PRIMARY_COLOR]; // Atualize conforme necessário

const formatCurrency = (value) => {
  if (value == null) {
    value = 0.00;
  }
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const calculatePercentage = (value, total) => {
  return total ? ((value / total) * 100).toFixed(2) : '0.00';
};

const BalanceChart = ({ summaryItem }) => {
  if (!summaryItem || (summaryItem.totalReceitas == null && summaryItem.totalDespesas == null)) {
    return null;
  }

  const total = summaryItem.totalReceitas + summaryItem.totalDespesas;
  const data = [
    { name: 'Receitas', value: summaryItem.totalReceitas, percentage: calculatePercentage(summaryItem.totalReceitas, total) },
    { name: 'Despesas', value: summaryItem.totalDespesas, percentage: calculatePercentage(summaryItem.totalDespesas, total) },
  ];

  // Ordenar os dados para que o maior valor venha primeiro
  data.sort((a, b) => b.value - a.value);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12} // Reduzir o tamanho da fonte para 12px
        fontWeight="bold" // Deixar em negrito
      >
        {`${data[index].percentage}%`}
      </text>
    );
  };

  const renderTooltipContent = ({ payload }) => {
    if (!payload || payload.length === 0) return null;

    const { name, value, percentage } = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="tooltip-text">{`${name}: ${formatCurrency(value)} (${percentage}%)`}</p>
      </div>
    );
  };

  return (
    <div className="balance-chart">
      <h3 className="balance-chart__title">
        <span className="title-label">Resumo mês:</span> {summaryItem.mes} <br />
        <span className="title-label">Receitas:</span> {formatCurrency(summaryItem.totalReceitas)} <span className="title-percentage">({data[0].percentage}%)</span> <br />
        <span className="title-label">Despesas:</span> {formatCurrency(summaryItem.totalDespesas)} <span className="title-percentage">({data[1].percentage}%)</span>
      </h3>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <PieChart width={400} height={400}> {/* Reduzir o tamanho do gráfico */}
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={90} // Reduzir o valor para deixar o gráfico menos espesso
            outerRadius={160} // Ajustar conforme necessário
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={renderTooltipContent} />
          <Legend
            layout="radial"
            align="right"
            verticalAlign="top"
          />
        </PieChart>
      </div>
    </div>
  );
};

export default BalanceChart;

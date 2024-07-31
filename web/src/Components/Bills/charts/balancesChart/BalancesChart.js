import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import '../../../Bills/Dashboard/Dashboard.css';

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

const BalancesChart = ({ summaryItem }) => {
  if (!summaryItem) {
    return <div className="balance-chart__no-data">Nenhum dado disponível</div>;
  }

  const total = (summaryItem.totalReceitas || 0) + (summaryItem.totalDespesas || 0);
  const data = [
    { name: 'Receitas', value: summaryItem.totalReceitas || 0, percentage: calculatePercentage(summaryItem.totalReceitas, total) },
    { name: 'Despesas', value: summaryItem.totalDespesas || 0, percentage: calculatePercentage(summaryItem.totalDespesas, total) },
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

    const { name, value, percentage, fill } = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="tooltip-text">
          <span className="tooltip-label">{name}:</span><br />
          <span className="tooltip-value">{formatCurrency(value)}</span><br />
          <span className="tooltip-percentage" style={{ color: fill }}>({percentage}%)</span>
        </p>
      </div>
    );
  };

  return (
    <div className="balance-chart">
      <h3 className="balance-chart__title">
        <div className="title-row">
          <span className="title-label">Resumo mês:</span>
          <span className="title-value">{summaryItem.mes}</span>
        </div>
        <div className="title-row">
          <span className="title-label">Receitas:</span>
          <span className="title-value">{formatCurrency(summaryItem.totalReceitas)} <span className="title-percentage">({data[0].percentage}%)</span></span>
        </div>
        <div className="title-row">
          <span className="title-label">Despesas:</span>
          <span className="title-value">{formatCurrency(summaryItem.totalDespesas)} <span className="title-percentage">({data[1].percentage}%)</span></span>
        </div>
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
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
          />
        </PieChart>
      </div>
    </div>
  );
};

export default BalancesChart;

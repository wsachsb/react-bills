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

const RevenuesChart = ({ summaryItem, revenues }) => {
  console.log("revenuesDataChart: " + JSON.stringify(revenues));

  if (!summaryItem || !Array.isArray(revenues) || revenues.length === 0) {
    return <div className="balance-chart__no-data">Nenhum dado disponível</div>;
  }

  // Filtra e mapeia os dados necessários para o gráfico
  const data = revenues.map(item => ({
    name: item.nomeReceita,
    value: item.valor,
  }));

  // Ordena os dados por valor em ordem decrescente
  data.sort((a, b) => b.value - a.value);

  const total = data.reduce((sum, entry) => sum + entry.value, 0);

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
        {`${calculatePercentage(data[index].value, total)}%`}
      </text>
    );
  };

  const renderTooltipContent = ({ payload }) => {
    if (!payload || payload.length === 0) return null;

    const { name, value, fill } = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="tooltip-text">
          <span className="tooltip-label">{name}:</span><br />
          <span className="tooltip-value">{formatCurrency(value)}</span><br />
          <span className="tooltip-percentage" style={{ color: fill }}>({calculatePercentage(value, total)}%)</span>
        </p>
      </div>
    );
  };

  return (
    <div className="revenues-chart">
      <h3 className="revenues-chart__title">
        <div className="title-row">
          <span className="title-label">Qtd de Receitas:</span>
          <span className="title-value">{data.length}</span>
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

export default RevenuesChart;

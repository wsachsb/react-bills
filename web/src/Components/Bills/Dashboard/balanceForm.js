import React, { useState, useEffect, useRef } from 'react';
import { getMonths } from '../../../Components/Bills/MonthlyBase/Monthy';
import './balanceForm.css';

const BalanceForm = ({ closeModal, onBalanceSubmit }) => {
  const [balanceData, setBalanceData] = useState({
    year: '',
    month: ''
  });

  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  
  const formRef = useRef(null);

  useEffect(() => {
    // Gerar anos a partir do ano atual e 10 anos anteriores
    const currentYear = new Date().getFullYear();
    const yearRange = Array.from({ length: 11 }, (_, i) => currentYear - i);
    setYears(yearRange);
  }, []);

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const monthsData = await getMonths(); 
        setMonths(monthsData);
      } catch (error) {
        console.error('Failed to fetch months:', error);
      }
    };

    fetchMonths();
  }, []);

  useEffect(() => {
    // Verifica se ambos os campos foram preenchidos
    setIsFormValid(balanceData.year !== '' && balanceData.month !== '');
  }, [balanceData]);

  const handleChange = (e) => {
    setBalanceData({ ...balanceData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Selected month:", balanceData.month, "Selected year:", balanceData.year);
      const newItem = { month: balanceData.month, year: balanceData.year };
      onBalanceSubmit(newItem);
      closeModal();
    } catch (error) {
      alert('Erro ao adicionar o balanço. Tente novamente.');
    }
  };

  // Fecha o modal quando clicado fora do formulário
  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="addbalance-form" onClick={handleClickOutside}>
      <div className="addbalance-form-container" ref={formRef}>
        <h2 className="addbalance-form-title">Adicionar Balanço</h2>
        <form onSubmit={handleSubmit} className="addbalance-form-content">
          <div className="addbalance-form-group">
            <select
              name="year"
              value={balanceData.year}
              onChange={handleChange}
              className="addbalance-form-select"
              required
            >
              <option value="" disabled>Selecione o Ano</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select
              name="month"
              value={balanceData.month}
              onChange={handleChange}
              className="addbalance-form-select"
              required
            >
              <option value="" disabled>Selecione o Mês</option>
              {months.map((month) => (
                <option key={month.id} value={month.id}>{month.monthName}</option>
              ))}
            </select>
          </div>
          <div className="addbalance-form-buttons">
            <button 
              type="submit" 
              className={`addbalance-form-button ${isFormValid ? 'addbalance-form-button-primary' : 'disabled'}`}
              disabled={!isFormValid}
            >
              Criar Balanço
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BalanceForm;

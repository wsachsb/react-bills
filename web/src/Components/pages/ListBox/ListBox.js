import React, { useEffect, useState } from 'react';

const ListBox = ({ items, selectedItem, onItemSelected }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (selectedItem) {
      setValue(selectedItem.id.toString());
    } else {
      setValue(""); // Garantir que o valor vazio é selecionado inicialmente se não houver item selecionado
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    const selectedId = e.target.value;
    const selectedItem = items.find(item => item.id.toString() === selectedId);
    if (typeof onItemSelected === 'function') {
      onItemSelected(selectedItem || null);

      // Atualiza o localStorage quando uma nova opção é selecionada
      if (selectedItem) {
        localStorage.setItem('selectedItem', JSON.stringify(selectedItem));
      } else {
        localStorage.removeItem('selectedItem');
      }
    }
  };

  return (
    <div>
      <select 
        className='dashboard-select'
        onChange={handleChange}
        value={value}
      >
        <option value="">Selecione...</option>
        {items
          .sort((a, b) => a.mesid - b.mesid)
          .map((item, index) => (
            <option key={index} value={item.id}>
              {item.nome_mes}-{item.year}
            </option>
          ))}
      </select>
    </div>
  );
};

export default ListBox;

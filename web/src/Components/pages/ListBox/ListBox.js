import React, { useEffect, useState } from 'react';

const ListBox = ({ items, selectedItem, onItemSelected }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (selectedItem) {
      setValue(selectedItem.id.toString());
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    const selectedId = e.target.value;
    const selectedItem = items.find(item => item.id.toString() === selectedId);
    if (typeof onItemSelected === 'function') {
      onItemSelected(selectedItem || null);
    }
  };

  return (
    <div>
      <select
        onChange={handleChange}
        value={value}
      >
        <option value="" disabled>Select an option</option>
        {items.map((item, index) => (
          <option key={index} value={item.id}>
            {item.nome_mes}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ListBox;

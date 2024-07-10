import React from 'react';

const ListBox = ({ items, selectedItem, onItemSelected }) => {
    const handleChange = (e) => {
        const selectedId = e.target.value;
        const selectedItem = items.find(item => item.id.toString() === selectedId);
        if (typeof onItemSelected === 'function') {
            onItemSelected(selectedItem || null); // Ensure selectedItem is null if no item is selected
        }
    };

    return (
        <div>
            <select
                onChange={handleChange}
                value={selectedItem ? selectedItem.id : ""}
            >
                <option value="" disabled>Selecione o mês</option>
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

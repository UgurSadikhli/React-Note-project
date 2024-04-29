import React from 'react';
import './Button.css'

function FilterButton({ filterType, onClick }) {
  let label = '';
  switch (filterType) {
    case 'all':
      label = 'All';
      break;
    case 'favorites':
      label = '☑';
      break;
    case 'notFavorites':
      label = '☐';
      break;
    default:
      label = '';
  }

  return (
    <button className='filterB' onClick={onClick}>{label}</button>
  );
}

export default FilterButton;
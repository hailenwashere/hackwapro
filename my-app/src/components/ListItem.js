import React from 'react';

export default function ListItem({ props }) {
  //console.log(props);

  return (
    <div className="listItem" style={{ display: 'flex' }}>
      <div style={{ marginRight: '10px' }}>{props.ingredient_name}</div>
      <div style={{ marginRight: '10px' }}>{props.total_quantity}</div>
      <div style={{ marginRight: '10px' }}>{props.min_expiry}</div>
      <div>
        <button>Request</button>
      </div>
    </div>
  );
}

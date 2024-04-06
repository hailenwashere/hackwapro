import React from 'react';

export default function ListItem({ props }) {
  //console.log(props);

  return (
    <tr className="listItem">
      <td>{props.ingredient_name}</td>
      <td>{props.total_quantity}</td>
      <td>{props.min_expiry}</td>
      <td>
        <button>Request</button>
      </td>
    </tr>
  );
}

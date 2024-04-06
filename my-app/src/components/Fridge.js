import React from 'react';
import ListItem from './ListItem';

export default function Fridge({ props }) {
  let items = props.category_data;

  return (
    <div className="fridge">
      <h2>{props.category_name}</h2>
      <ul>
        {items.map((item) => (
          <li>
            <ListItem props={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

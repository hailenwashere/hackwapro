import React from 'react';
import ListItem from './ListItem';

export default function Fridge({ props }) {
  let items = props.category_data;
  // console.log("lhihihihihi")
  console.log(items)
  // console.log("lhihihihihi")

  return (
    <div className="fridge">
      <h2>{props.category_name}</h2>
      <table>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Quantity</th>
            <th>Earliest Expiration Date</th>
            <th>Request</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ListItem props={item} />
          ))}
        </tbody>
      </table>
      <ul></ul>
    </div>
  );
}

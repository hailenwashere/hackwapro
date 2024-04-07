import React from 'react';
import ListItem from './ListItem';

export default function Fridge({ props }) {
    /* props looks like this
    [ "meat",
      {
        "chicken": {
            "total_quantity": 4,
            "min_expiry": "01/24/2024",
            "ingredient_info": {
                "Yifan": {
                    "quantity": 2,
                    "expiration": "01/24/2024"
                },
                "Ellen": {
                    "quantity": 2,
                    "expiration": "01/30/2024"
                }
            }
        },
        "beef": {
            "total_quantity": 1,
            "min_expiry": "04/09/2024",
            "ingredient_array": {
                "Jacky": {
                    "quantity": 1,
                    "expiration": "04/09/2024"
                }
            }
        }
      }
    ]
  */

    let items = Array();
    for (const property in props[1]) {
        items.push([property, props[1][property]]);
    }
    // console.log(items)

    return (
        <div className="fridge-outer-div">
            <h2>{props[0]}</h2>
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
                        <ListItem category={props[0]} ingredient={item} key={item[0]} />
                    ))}
                </tbody>
            </table>
            <ul></ul>
        </div>
    );
}

import React from 'react';
import { useNavigate } from 'react-router-dom'

export default function ListItem({ props }) {
    /* props looks like this 
        [
            "chicken",
            {
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
        ]
    */

    const navigate = useNavigate()
    const onClick = () =>
    {
        localStorage.setItem("currentIngredient", props[0])
        localStorage.setItem("ingredientSummary", JSON.stringify(props[1]))
        navigate('/request')
    }

    return (
        <tr className="listItem">
        <td>{props[0]}</td>
        <td>{props[1].total_quantity}</td>
        <td>{props[1].min_expiry}</td>
        <td>
            <button onClick={ onClick }>Request</button>
        </td>
        </tr>
    );
}

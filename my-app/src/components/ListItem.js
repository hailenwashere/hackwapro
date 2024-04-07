import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ListItem({ category, ingredient }) {
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
        localStorage.setItem("currentCategory", category)
        localStorage.setItem("currentIngredient", ingredient[0])
        localStorage.setItem("ingredientSummary", JSON.stringify(ingredient[1]))
        navigate('/request')
    }

    return (
        <tr className="listItem">
        <td>{ingredient[0]}</td>
        <td>{ingredient[1].total_quantity}</td>
        <td>{ingredient[1].min_expiry}</td>
        <td>
            <button onClick={ onClick }>Request</button>
        </td>
        </tr>
    );
}

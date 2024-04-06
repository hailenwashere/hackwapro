import React from 'react';
import { useNavigate } from 'react-router-dom'

export default function ListItem({ props }) {
    const navigate = useNavigate()
    const onClick = () =>
    {
        localStorage.setItem("ingredientinfo", JSON.stringify(props))
        navigate('/request')
    }

    return (
        <tr className="listItem">
        <td>{props.ingredient_name}</td>
        <td>{props.total_quantity}</td>
        <td>{props.min_expiry}</td>
        <td>
            <button onClick={ onClick }>Request</button>
        </td>
        </tr>
    );
}

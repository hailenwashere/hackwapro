import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header';

const IngredientRequest = () => {
    const [requestmade, setRequestmade] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const navigate = useNavigate()
    /* example props - a single entry in category_data corresponding to the desired ingredient
        {
            ingredient_name: 'Chicken',
            total_quantity: 4,
            min_expiry: '01/24/2024',
            ingredient_array: [
                {
                    owner: 'Yifan',
                    quantity: 2,
                    expiration: '01/24/2024',
                },
                {
                    owner: 'Ellen',
                    quantity: 2,
                    expiration: '01/30/2024',
                },
            ],
        }
    */

    const onReturnClick = () => {
        localStorage.removeItem("ingredientinfo")
        navigate('/home')
    }

    let props = JSON.parse(localStorage.getItem("ingredientinfo"))
    if (props == null)
    {
        return (
            <>
                <h2>No ingredient selected!</h2>
                <button onClick={ onReturnClick }>Return to the fridge</button>
            </>
        )
    }
    
    const ingredient_name = props.ingredient_name;
    let total_quantity = props.total_quantity;
    let min_expiry = props.min_expiry;
    let ingredient_array = props.ingredient_array;

    // sort ingredients by soonest expiring ingredients
    function compareIngredients(a, b)
    {
        // split exp day into month, day, year
        const a_date = a.expiration.split('/');
        const b_date = b.expiration.split('/');
 
        if (a_date[2] < b_date[2])
        {
            return -1;
        } 
        else if (a_date[2] > b_date[2])
        {
            return 1;
        } 
        else { // equal years
            if (a_date[0] < b_date[0])
            {
                return -1;
            } 
            else if (a_date[0] > b_date[0])
            {
                return 1;
            }  
            else { // equal months
                if (a_date[1] < b_date[1])
                {
                    return -1;
                } 
                else if (a_date[1] > b_date[1])
                {
                    return 1;
                }  
                else 
                {
                    return 0;
                }
            }
        }
    }
    ingredient_array.sort(compareIngredients)

    // quantity dropdown: update quantity using dropdown, gives options up to total_quantity
    const possiblequantities = Array(total_quantity + 1).fill(0).map((_, index)=> index);
    const handleChange = (event) => {
        setQuantity(event.target.value)
    };

    // request button: on request, update the data
    function onRequestClick() 
    {
        // update data
        
        // post data
            /* schema:
            
            */

        setRequestmade(true);
    }

    if (requestmade)
    {
        return (
            <>
                <Header/>
                <div className='requestsuccess'>
                    <h2>Request Made!</h2>
                    <button onClick={ onReturnClick }>Return to the fridge</button>
                </div>
            </>
        );
    }
    return ( 
        <>
            <Header/>
            <div className="requestcontainer">
                <h2>Available Ingredients</h2>
                <table className="avaliableingredients">
                    <thead>
                        <tr>
                            <th>Owner</th>
                            <th>Quantity</th>
                            <th>Expiration</th>
                        </tr>
                    </thead>
                    {ingredient_array.map((ingredient) => (
                    <tbody>
                        <tr>
                            <td rowSpan={ingredient.owner.length + 1}>{ingredient.owner}</td>
                            <td rowSpan={ingredient.quantity.length + 1}>{ingredient.quantity}</td>
                            <td rowSpan={ingredient.expiration.length + 1}>{ingredient.expiration}</td>
                        </tr>
                    </tbody>
                    ))}
                </table>
                <div className="requestsection">
                    <h3>Quantity</h3>
                    <label>
                        How many {ingredient_name.toLowerCase()}'s?
                        <select value={quantity} onChange={handleChange}>
                            {possiblequantities.map((quantity) => (
                                <option value={ quantity }>{quantity}</option>
                            ))}
                        </select>
                    </label>
                    <button onClick={ onRequestClick }>Request!</button>
                </div>
            </div>
        </>
    );
}
 
export default IngredientRequest;
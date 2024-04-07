import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header';

const IngredientRequest = () => {
    /*
        
        [
            "chicken", <---- currentIngredient
            { <---- ingredientSummary
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

    const [requestmade, setRequestmade] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const navigate = useNavigate()

    const onReturnClick = () => {
        localStorage.removeItem("ingredientSummary")
        navigate('/home')
    }

    // fetch data from local storage
    const currentCategory = localStorage.getItem("currentCategory")
    const ingredientName = localStorage.getItem("currentIngredient")
    let props = JSON.parse(localStorage.getItem("ingredientSummary"))
    if (props == null || ingredientName == null || currentCategory == null)
    {
        return (
            <>
                <h2>No ingredient selected!</h2>
                <button onClick={ onReturnClick }>Return to the fridge</button>
            </>
        )
    }
    
    let total_quantity = props.total_quantity;
    let ingredient_info = props.ingredient_info;
    let owner_ingredient = [];
    for (const property in ingredient_info)
    {
        owner_ingredient.push([property, ingredient_info[property]])
    }
                    /* looks like this
                        [
                            ["yifan", {...}],
                            ["ellen", {...}]
                        ]
                    */

    // sort ingredients by soonest expiring ingredients
    function compareIngredients(a, b)
    {
        // split exp day into month, day, year
        const a_date = a[1].expiration.split('/');
        const b_date = b[1].expiration.split('/');
 
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
    owner_ingredient.sort(compareIngredients)

    // quantity dropdown: update quantity using dropdown, gives options up to total_quantity
    const possiblequantities = Array(total_quantity + 1).fill(0).map((_, index)=> index);
    const handleChange = (event) => {
        setQuantity(event.target.value)
    };

    // request button: on request, update the data
    async function onRequestClick() 
    {
        // update data
        let quantityleft = quantity;
        let currentowner = 0;

        const code = localStorage.getItem("code");
        const requester = localStorage.getItem("name");
        const requestee = owner_ingredient[currentowner];
        const food_type = currentCategory;
        const category = ingredientName;
        let newquantity = owner_ingredient[currentowner][1].quantity

        while (quantityleft > 0)
        {
            // get number of ingredients this person has
            let numowned = owner_ingredient[currentowner][1].quantity;

            // subtract number of ingredients needed
            if (quantityleft > numowned)
            {
                quantityleft -= numowned;
                numowned = 0;
            } else {
                quantityleft = 0;
                numowned -= quantityleft;
            }
            newquantity = numowned
            
            // post data
            let obj = {
                fridgeID: code,
                requester: requester,
                requestee: requestee,
                food_type: food_type,
                category: category,
                quantity: newquantity
            }

            await fetch("http://localhost:7272/requestitem", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),

            })
                .catch(error => {
                    window.alert(error);
                    return;
            });
        }

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
                        {owner_ingredient.map((ingredient) => (
                            <tbody>
                                <tr>
                                    <td rowSpan={ingredient[0].length + 1}>{ingredient[0]}</td>
                                    <td rowSpan={ingredient[1].quantity.length + 1}>{ingredient[1].quantity}</td>
                                    <td rowSpan={ingredient[1].expiration.length + 1}>{ingredient[1].expiration}</td>
                                </tr>
                            </tbody>
                        ))}
                </table>
                <div className="requestsection">
                    <h3>Quantity</h3>
                    <label>
                        How many {ingredientName.toLowerCase()}'s?
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
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datetime/css/react-datetime.css';
import Header from '../components/Header';

const AddIngredient = () => {
    const [ingredientName, setIngredientName] = useState('');
    const [quantity, setQuantity] = useState(null);
    const [expirationDate, setExpirationDate] = useState(null);
    const [category, setCategory] = useState(null);

    // Handle form input

    function preventEnter(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }

    function handleIngredientNameChange(e) {
        setIngredientName(e.target.value);
    }

    function handleQuantityChange(e) {
        setQuantity(e.target.value);
    }

    function handleExpirationDateChange(date) {
        setExpirationDate(date);
    }

    function handleCategoryChange(e) {
        setCategory(e.target.value);
    }

    // Format Date
    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }

    // Submit Form
    function handleSubmit(e) {
        e.preventDefault();
        if (quantity === '0') {
            window.alert('Choose a non zero quantity!');
            return;
        }

        // POST THIS TO BACKEND
        let obj = {
            food_type: category,
            category: ingredientName.toLowerCase(),
            owner: 'TEMP FIX THIS',
            quantity: quantity,
            expiration: formatDate(expirationDate),
        };
    }

    return (
        <>
            <Header />
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Ingredient Name:
                            <br />
                            <input
                                type="text"
                                value={ingredientName}
                                placeholder="E.g. bok choy"
                                onChange={handleIngredientNameChange}
                                autoComplete="off"
                                onKeyDown={preventEnter}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Quantity:
                            <br />
                            <input
                                type="number"
                                value={quantity}
                                placeholder=""
                                onChange={handleQuantityChange}
                                onKeyDown={preventEnter}
                                min="0"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Expiration Date:
                            <br />
                            <DatePicker
                                selected={expirationDate}
                                id="start-time"
                                onChange={handleExpirationDateChange}
                                dateFormat="MM/dd/yyyy"
                                placeholderText="Expiration date"
                                isClearable
                                autoComplete="off"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Category:
                            <br />
                            <select value={category} onChange={handleCategoryChange}>
                                <option value="">Select category</option>
                                <option value="Meat">Meat</option>
                                <option value="Vegatables">Vegatables</option>
                                <option value="Dairy">Dairy</option>
                                <option value="Other">Other</option>
                            </select>
                        </label>
                    </div>
                    <div className="submit">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddIngredient;

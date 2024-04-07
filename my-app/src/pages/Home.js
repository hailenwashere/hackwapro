import Fridge from '../components/Fridge';
import Header from '../components/Header';
import '../styles/Home.css';
import React, { useEffect, useState } from 'react';

export default function HomePage() {
    const [code, setCode] = useState(null);
    const [res, setRes] = useState(null);

    useEffect(() => {
        async function updateRecords() {
            const response = await fetch('http://localhost:7272/getdata', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fridgeID: 'JACHEWY',
                }),
            });
            const records = await response.json();
            localStorage.setItem('data', JSON.stringify(records));
        }
        updateRecords();
        const code = localStorage.getItem('code');
        const res = JSON.parse(localStorage.getItem('data'));

        // console.log(code);
        // console.log('this is res');
        // console.log(typeof(res));

        if (code) {
            setCode(code);
        }
        if (res) {
            setRes(res);
        }
    }, []);

    let categories = Array();
    for (const property in res) {
        if (property !== 'emails') {
            categories.push([property, res[property]]); // push ["meat", {"beef"...}]
        }
    }
    // console.log(categories)

    return (
        <div>
            <Header />
            {categories.map((fridgecategory) => (
                <Fridge props={fridgecategory} key={fridgecategory[0]} />
            ))}
        </div>
    );
}

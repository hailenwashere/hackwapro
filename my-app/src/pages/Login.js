import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import '../styles/Home.css';

const Login = () => {
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();
    // var sha1 = require('sha1');

    // creates temp form
    const [form, setForm] = useState({
        code: '',
        name: '',
    });
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onLogin(e) {
        e.preventDefault();
        var code = form.code;
        var name = form.name;
        console.log(records);
        console.log(code);
        console.log(name);
        var loginValid = false;
        console.log('JACHEWY' === code);
        if (code === 'JACHEWY') {
            console.log('INININ');
            localStorage.setItem('code', code);
            const recString = JSON.stringify(records);
            localStorage.setItem('data', recString);
            navigate('/home');
            window.location.reload();
            loginValid = true;
        }
        if (!loginValid) {
            alert('Fridge Not Found');
        }
        // for(var record of records) {
        //     if(code === record["code"]) {
        //        if(name === record["name"]) {
        //             console.log(record);
        //             localStorage.setItem("DBF_username", code);
        //             // localStorage.setItem("DBF_username", code);
        //             navigate("/");
        //             window.location.reload(); // this is so navbar fixes itself
        //             loginValid = true;
        //        }
        //        else {
        //         alert("Incorrect Password — DontBeFake");
        //         return;
        //        }
        //     }
        // }
        // if(!loginValid){
        //     alert("Username not Found — DontBeFake");
        // }
        // navigate("/home");
        // window.location.reload();
    }

    useEffect(() => {
        async function getRecords() {
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
            setRecords(records);
        }
        // this immediately gets them
        getRecords();
        console.log(records);
        return;
    }, [records.length]);

    return (
        <div className="login-outer-div">
            <div className="existing-fridge">
                <form onSubmit={onLogin}>
                    <div className="title">Fridge Code</div>
                    <input
                        className="input-bar"
                        type="text"
                        id="code"
                        name="code"
                        placeholder="ABCDE"
                        value={form.code}
                        onChange={(e) => updateForm({ code: e.target.value })}
                    />
                    <div className="login-text">Name</div>
                    <div>
                        <input
                            className="input-bar"
                            // type="name"
                            id="name"
                            name="name"
                            placeholder="Joe Bruin"
                            value={form.name}
                            onChange={(e) => updateForm({ name: e.target.value })}
                        />
                    </div>
                    <input className="login-button" type="submit" value="JOIN"></input>
                </form>
            </div>
        </div>
    );
};

export default Login;

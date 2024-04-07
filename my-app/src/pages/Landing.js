import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// import { useNavigate } from "react-router";

import '../styles/Home.css';

const Home = () => {
    // const [records, setRecords] = useState([]);
    // const navigate = useNavigate();
    // // var sha1 = require('sha1');

    // // creates temp form
    // const [form, setForm] = useState({
    //     username: "",
    //     password: "",
    // });

    // // updates form
    // function updateForm(value) {
    //     return setForm((prev) => {
    //     return { ...prev, ...value };
    //     });
    // }

    // async function onLogin(e) {
    //     e.preventDefault();
    //     var username = form.username
    //     var password = form.password
    //     console.log(records)
    //     var loginValid = false;
    //     for(var record of records) {
    //         if(username === record["username"]) {
    //            if(password === record["password"]) {
    //                 console.log(record);
    //                 localStorage.setItem("DBF_username", username);
    //                 // localStorage.setItem("DBF_username", username);
    //                 navigate("/");
    //                 window.location.reload(); // this is so navbar fixes itself
    //                 loginValid = true;
    //            }
    //            else {
    //             alert("Incorrect Password — DontBeFake");
    //             return;
    //            }
    //         }
    //     }
    //     if(!loginValid){
    //         alert("Username not Found — DontBeFake");
    //     }
    // }

    // This method fetches the records from the database.
    //     useEffect(() => {
    //     async function getRecords() {
    //       const response = await fetch('http://localhost:4000/login');
    //       const records = await response.json();
    //       setRecords(records);
    //     }
    //     // this immediately gets them
    //     getRecords();
    //     return;
    //   }, [records.length]);

    return (
        <body className="landing-body">
            <div style={styles.container}>
                <div className="title" style={styles.title}>
                    OURFRIDGE
                </div>
                <Link to="./login" style={styles.startButton}>
                    Start
                </Link>

                <Link to="./create" style={styles.startButton}>
                    Create 
                </Link>
            </div>
        </body>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh', // This will make the container take up the full height of the viewport
    },
    title: {
        fontSize: '200px', // Increase font size for a big title
        fontFamily: 'monospace',
        marginBottom: '20px',
    },
    startButton: {
        display: 'inline-block',
        padding: '10px 20px',
        fontSize: '18px',
        backgroundColor: '#007bff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
    },
    startButtonHover: {
        backgroundColor: '#0056b3',
    },
};

export default Home;
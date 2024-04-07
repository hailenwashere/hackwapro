import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router";
import Header from '../components/Header_left';
import '../styles/Home.css';

const Login = () => {
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();
    // var sha1 = require('sha1')

    const [formCre, setFormCre] = useState({
        code: "",
        name1: "",
        email1: "",
        name2: "",
        email2: "",
        name3: "",
        email3: "",
        name4: "",
        email4: "",
        name5: "",
        email5: "",
        name6: "",
        email6: "",
        name7: "",
        email7: "",
        name8: "",
        email8: "",
    });

    function updateFormCre(value) {
        return setFormCre((prev) => {
        return { ...prev, ...value };
        });
    }

    async function onLogin(e) {
        e.preventDefault();
        var code = formCre.code
        //var name = form.name
        const nameArray = [formCre.name1 , formCre.name2, formCre.name3, formCre.name4, formCre.name5, formCre.name6, formCre.name7, formCre.name7];
        const emailArray = [formCre.email1, formCre.email2, formCre.email3, formCre.email4, formCre.email5, formCre.email6, formCre.email7, formCre.email8];
        
        // console.log(code)
        // console.log(nameArray)
        // console.log(emailArray)

        let obj = {
            code: code,
            nameArray: nameArray,
            emailArray: emailArray,
        };
        console.log(obj)

        if (!code){
            alert("Must have code");
        }

        await fetch("http://localhost:7272/makefridge", {
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

        console.log("Add fridge works");




        // var loginValid = false;
        // if(code === "JACHEWY"){
        //     if(name){
        //         // console.log("INININ");
        //         localStorage.setItem("code", code);
        //         const recString = JSON.stringify(records);
        //         localStorage.setItem("data", recString)
        //         localStorage.setItem("name", name)
        //         navigate("/home");
        //         window.location.reload();
        //         loginValid = true;
        //     }
        // }
        // if(!loginValid){
        //     alert("Login Error");
        // }
    }

    // useEffect(() => {
    //     async function getRecords() {
    //       const response = await fetch('http://localhost:7272/getdata', {
    //         method: 'POST',
    //         headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           fridgeID: 'JACHEWY',
    //         })
    //       });
    //       const records = await response.json();
    //       setRecords(records);
    //     }
    //     // this immediately gets them
    //     getRecords();
    //     console.log(records)
    //     return;
    //   }, [records.length]);


    return (
        <body>
            <Header />
            <div className="login-outer-div">
            <div className="existing-fridge-prime">
            
            <form  onSubmit={onLogin}>
            <div className="title"> Create New Fridge</div>
                <input 
                className= "input-bar" 
                type="text" id="code" 
                name="code" 
                placeholder="ABCDE"
                value={formCre.code}
                onChange={(e) => updateFormCre({ code: e.target.value })}
                />

                <div className="login-text">Person 1</div>
                <div>
                    <input 
                    className= "input-bar" 
                    // type="name" 
                    id="name" 
                    name="name" 
                    placeholder="Joe Bruin"
                    value={formCre.name1}
                    onChange={(e) => updateFormCre({ name1: e.target.value })}
                    />
                    <input 
                    className= "input-bar" 
                    type="email" 
                    id="name" 
                    name="name" 
                    placeholder="email"
                    value={formCre.email1}
                    onChange={(e) => updateFormCre({ email1: e.target.value })}
                    />
                </div>
                <div className="login-text">Person 2</div>
                <div>
                    <input 
                    className= "input-bar" 
                    // type="name" 
                    id="name" 
                    name="name" 
                    placeholder="Joe Bruin"
                    value={formCre.name2}
                    onChange={(e) => updateFormCre({ name2: e.target.value })}
                    />
                    <input 
                    className= "input-bar" 
                    type="email" 
                    id="name" 
                    name="name" 
                    placeholder="email"
                    value={formCre.email2}
                    onChange={(e) => updateFormCre({ email2: e.target.value })}
                    />
                </div>
                <div className="login-text">Person 3</div>
                <div>
                    <input 
                    className= "input-bar" 
                    // type="name" 
                    id="name" 
                    name="name" 
                    placeholder="Joe Bruin"
                    value={formCre.name3}
                    onChange={(e) => updateFormCre({ name3: e.target.value })}
                    />
                    <input 
                    className= "input-bar" 
                    type="email" 
                    id="name" 
                    name="name" 
                    placeholder="email"
                    value={formCre.email3}
                    onChange={(e) => updateFormCre({ email3: e.target.value })}
                    />
                </div>
                <div className="login-text">Person 4</div>
                <div>
                    <input 
                    className= "input-bar" 
                    // type="name" 
                    id="name" 
                    name="name" 
                    placeholder="Joe Bruin"
                    value={formCre.name4}
                    onChange={(e) => updateFormCre({ name4: e.target.value })}
                    />
                    <input 
                    className= "input-bar" 
                    type="email" 
                    id="name" 
                    name="name" 
                    placeholder="email"
                    value={formCre.email4}
                    onChange={(e) => updateFormCre({ email4: e.target.value })}
                    />
                </div>
                <div className="login-text">Person 5</div>
                <div>
                    <input 
                    className= "input-bar" 
                    // type="name" 
                    id="name" 
                    name="name" 
                    placeholder="Joe Bruin"
                    value={formCre.name5}
                    onChange={(e) => updateFormCre({ name5: e.target.value })}
                    />
                    <input 
                    className= "input-bar" 
                    type="email" 
                    id="name" 
                    name="name" 
                    placeholder="email"
                    value={formCre.email5}
                    onChange={(e) => updateFormCre({ email5: e.target.value })}
                    />
                </div>
                <div className="login-text">Person 6</div>
                <div>
                    <input 
                    className= "input-bar" 
                    // type="name" 
                    id="name" 
                    name="name" 
                    placeholder="Joe Bruin"
                    value={formCre.name6}
                    onChange={(e) => updateFormCre({ name6: e.target.value })}
                    />
                    <input 
                    className= "input-bar" 
                    type="email" 
                    id="name" 
                    name="name" 
                    placeholder="email"
                    value={formCre.email6}
                    onChange={(e) => updateFormCre({ email6: e.target.value })}
                    />
                </div>
                <div className="login-text">Person 7</div>
                <div>
                    <input 
                    className= "input-bar" 
                    // type="name" 
                    id="name" 
                    name="name" 
                    placeholder="Joe Bruin"
                    value={formCre.name7}
                    onChange={(e) => updateFormCre({ name7: e.target.value })}
                    />
                    <input 
                    className= "input-bar" 
                    type="email" 
                    id="name" 
                    name="name" 
                    placeholder="email"
                    value={formCre.email7}
                    onChange={(e) => updateFormCre({ email7: e.target.value })}
                    />
                </div>
                <div className="login-text">Person 8</div>
                <div>
                    <input 
                    className= "input-bar" 
                    // type="name" 
                    id="name" 
                    name="name" 
                    placeholder="Joe Bruin"
                    value={formCre.name8}
                    onChange={(e) => updateFormCre({ name8: e.target.value })}
                    />

                    <input 
                    className= "input-bar" 
                    type="email" 
                    id="name" 
                    name="name" 
                    placeholder="email"
                    value={formCre.email8}
                    onChange={(e) => updateFormCre({ email8: e.target.value })}
                    />
                </div>
                <input className="button" type="submit" value="Create."></input>
                
            </form>
        </div>
        </div>
        </body>
        
    )
}

export default Login;
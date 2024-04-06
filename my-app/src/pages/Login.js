import React, {useEffect, useState} from "react";
// import { useNavigate } from "react-router";

import '../styles/Home.css';

const Login = () => {


    return (
        <body>
        <div>
            <div className="title">Fridge Code</div>
            <form  /*</div>onSubmit={onLogin}*/>
                <input 
                className= "input-bar" 
                type="text" id="username" 
                name="username" 
                placeholder="ABCDE"
                // value={form.username}
                // onChange={(e) => updateForm({ username: e.target.value })}
                />
                <div className="login-text">Name</div>
                
                <div>

                    <input 
                    className= "input-bar" 
                    // type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Joe Bruin"
                    // value={form.password}
                    // onChange={(e) => updateForm({ password: e.target.value })}
                    />
                </div>
                <input className="button" type="submit" value="Login."></input>
            </form>
        </div>
        </body>
        
    )
}

export default Login;
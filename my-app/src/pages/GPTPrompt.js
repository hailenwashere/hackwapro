import React, { useEffect, useState } from "react";
import '../styles/Home.css';
import Header from '../components/Header';

import '../styles/Home.css';

const GPTPrompt = () => {
    const [form, setForm] = useState({
        prompt: "",
    });

    const [responseText, setResponseText] = useState("");

    // updates form 
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onLogin(e) {
        e.preventDefault()
        var prompt = form.prompt
        
        setResponseText("Jesus is Thinking...");
        const response = await fetch('http://localhost:7272/askgpt', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt,
            })
        });
        
        const responseData = await response.json();
        setResponseText(responseData.response);
    }

    return (
        <body>
            <Header />
            <div className="login-outer-div">
            <div className="existing-fridge">
                <form onSubmit={onLogin}>
                    <input
                        className="input-bar"
                        type="text"
                        id="prompt"
                        name="prompt"
                        placeholder="Enter your fridge ID."
                        value={form.prompt}
                        onChange={(e) => updateForm({ prompt: e.target.value })}
                    />
                    <div>
                        <pre>{responseText}</pre>
                    </div>
                    <input className="button" type="submit" value="Ask Jesus."></input>
                </form>
            </div>
            </div>
        </body>
    )
}

export default GPTPrompt;

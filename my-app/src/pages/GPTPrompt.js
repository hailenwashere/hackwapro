import React, { useEffect, useState } from "react";
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
            <div>
                <form onSubmit={onLogin}>
                    <input
                        className="input-bar"
                        type="text"
                        id="prompt"
                        name="prompt"
                        placeholder="Enter your prompt."
                        value={form.prompt}
                        onChange={(e) => updateForm({ prompt: e.target.value })}
                    />
                    <div>
                        <p>{responseText}</p>
                    </div>
                    <input className="button" type="submit" value="Ask Jesus."></input>
                </form>
            </div>
        </body>
    )
}

export default GPTPrompt;

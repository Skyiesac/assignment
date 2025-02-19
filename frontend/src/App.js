import React, { useState } from "react";

function App() {
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");

    const fetchData = () => {
        fetch("http://127.0.0.1:5000/api")
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(error => console.error("Error:", error));
    };

    return (
        <div>
            <h1>React + Flask</h1>
            <button onClick={fetchData}>Get Data</button>
            <p>{message}</p>

            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
         
        </div>
    );
}

export default App;

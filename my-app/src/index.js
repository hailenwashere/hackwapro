import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
// import App from './App';
import Login from './pages/Login.js';
import Landing from './pages/Landing.js';
import Home from './pages/Home.js';
import reportWebVitals from './reportWebVitals';
import GPTPrompt from './pages/GPTPrompt.js';
import IngredientRequest from './pages/IngredientRequest.js';
import AddIngredient from './pages/AddIngredient.js';
import Create from './pages/Create.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <React.StrictMode>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Landing />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/add" element={<AddIngredient />} />
                    <Route exact path="/request" element={<IngredientRequest />} />
                    <Route exact path="/gpt" element={<GPTPrompt/>}/>
                    <Route exact path="/create" element={<Create/>}/>
                </Routes>
            </Router>
        </React.StrictMode>
        <a href="./"> land</a>
        <a href="./login"> login</a>
        <a href="./home"> home</a>
        <a href="./gpt"> GPTPrompt</a>
        <a href="./create"> create</a>
    </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// // import React from 'react';
// import ReactDOM from 'react-dom';
// // import './index.css';
// // import App from './pages/App';
// // import Home from './pages/home.js';
// // import Login from './pages/Login.js';
// // import Signup from './pages/Signup';
// // import Friends from './pages/Friends';
// // import Task from './components/TaskComp';
// // import reportWebVitals from './reportWebVitals';
// // import Taskmake from './pages/taskmaketemp';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <div>

//     <React.StrictMode>
//     <Router>
//     <Routes>
//       <Route exact path="/" element={<Home/>}/>
//       {/* <Route exact path="/login" element={<Login/>}/>
//       <Route exact path="/signup" element={<Signup/>}/>
//       <Route exact path="/friends" element={<Friends/>}/>
//       <Route exact path="/task" element={<Task/>}/>
//       <Route exact path="/taskmake" element={<Taskmake/>}/> */}
//     </Routes>
//     </Router>
//   </React.StrictMode>
//   <a href="./"> home</a>
//   <a>   </a>
//   <a href="./friends"> friends</a>
//   <a>   </a>
//   <a href="./signup"> signup</a>
//   <a>   </a>
//   <a href="./login"> login.</a>

//   </div>

// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

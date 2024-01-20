import './assets/style/App.css';
import React from "react";
import {Outlet, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {MyProvider} from "./global/MyProvider";

function App(props) {
    return (
        <MyProvider>
            <div className="App">
                <Routes path="/Home" element={<Home username={props.username}/>}/>
                <Outlet/>
            </div>
        </MyProvider>
    );
}

export default App;

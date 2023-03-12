import React from 'react';
import './App.css';
import NavigationBar from "./components/NavigationBar";
import {Provider} from "react-redux";
import {store} from "./store";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <NavigationBar/>
            </div>
        </Provider>
    );
}

export default App;

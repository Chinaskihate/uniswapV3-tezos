import React, {useState} from 'react';
import './App.css';
import {TezosToolkit} from "@taquito/taquito";
import NavigationBar from "./components/NavigationBar";
import {Provider} from "react-redux";
import {store} from "./store";

function App() {
    const [Tezos, setTezos] = useState<TezosToolkit>(
        new TezosToolkit("https://ghostnet.ecadinfra.com")
    );
    const [publicToken, setPublicToken] = useState<string | null>(null);
    const [userAddress, setUserAddress] = useState<string>("");

    return (
        <Provider store={store}>
            <div className="App">
                <NavigationBar/>
            </div>
        </Provider>
    );
}

export default App;

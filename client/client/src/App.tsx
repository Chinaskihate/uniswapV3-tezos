import React, {useState} from 'react';
import './App.css';
import {TezosToolkit} from "@taquito/taquito";
import NavigationBar from "./components/NavigationBar";

function App() {
    const [Tezos, setTezos] = useState<TezosToolkit>(
        new TezosToolkit("https://ghostnet.ecadinfra.com")
    );
    const [publicToken, setPublicToken] = useState<string | null>(null);
    const [userAddress, setUserAddress] = useState<string>("");

    return (
        <div className="App">
            <NavigationBar/>
        </div>
    );
}

export default App;

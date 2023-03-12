import React, {useState} from 'react';
import './App.css';
import {TezosToolkit} from "@taquito/taquito";
import NavigationBar from "./components/NavigationBar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
  
import Exchange from "./pages/Exchange";
import NoPage from "./pages/NoPage";
import Pools from "./pages/Pools";
import TokenStats from "./pages/TokenStats";
import AllTokenStats from "./pages/AllTokenStats";
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
            <Router>
                <div className="App">
                    <NavigationBar/>
                </div>
                <Routes>
                    <Route path="/exchange" element = {<Exchange></Exchange>}>
                </Route>
                    <Route path="/alltokenstats" element = {<AllTokenStats></AllTokenStats>}>
                        <Route path = "tokenstats" element = {<TokenStats></TokenStats>}>
                        </Route>
                </Route>
                    <Route path="/pools" element = {<Pools></Pools>}>
                </Route>
                <Route path="*" element={<NoPage />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;

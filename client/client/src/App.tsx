import React from 'react';
import './App.css';
import NavigationBar from "./components/NavigationBar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate
  } from "react-router-dom";
import SwapPage from "./pages/swap_window/SwapPage";
import NoPage from "./pages/NoPage";
import Pools from "./pages/Pools";
import TokenStats from "./pages/TokenStats";
import AllTokenStats from "./pages/AllTokenStats";
import {Provider} from "react-redux";
import {store} from "./store";



function Home(){
    return <Navigate to='/exchange'/>;
}


function App() {
    return (

        <Provider store={store}>
            <Router>
                <div className="App">
                    <NavigationBar/>
                </div>
                <Routes>
                    <Route path="/" element = {<Home/>}>
                        </Route>
                    <Route path="/exchange" element = {<SwapPage></SwapPage>}>
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

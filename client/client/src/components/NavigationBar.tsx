import React from 'react';
import '../App.css';
import LoginButton from "./buttons/LoginButton";
import {useSelector} from "react-redux";
import {RootState} from "../store";

const NavigationBar = () => {
    const storeUserAddress = useSelector((state: RootState) => state.userAddress);
    return (
        <div className="navbar">
            <div className="buttons">
                <button className="button" onClick={() => console.log(storeUserAddress)}>Exchange</button>
            </div>
            <div className="buttons">
                <button className="button">Statistics</button>
            </div>
            <div className="buttons">
                <button className="button">Pools</button>
            </div>
            <LoginButton/>
        </div>
    );
};

export default NavigationBar;
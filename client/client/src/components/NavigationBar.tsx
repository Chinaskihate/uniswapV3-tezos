import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import LoginButton from "./buttons/LoginButton";
import {useSelector} from "react-redux";
import {RootState} from "../store";

const NavigationBar = () => {
    const storeUserAddress = useSelector((state: RootState) => state.userAddress);

    return (
        <div className="navbar">
            <div className="buttons">
                <Link to='/exchange'>
                    <button className="button" onClick={() => console.log(storeUserAddress)}>Exchange</button>
                </Link>
            </div>
            <div className="buttons">
                <Link to='alltokenstats'>
                    <button className="button">Statistics</button>
                </Link>
            </div>
            <div className="buttons">
                <Link to='pools'>
                    <button className="button">Pools</button>
                </Link>
            </div>
            <LoginButton/>
        </div>
    );
};

export default NavigationBar;
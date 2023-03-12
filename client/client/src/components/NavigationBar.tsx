import React from 'react';
import '../App.css';

const NavigationBar = () => {
    return (
        <div className="navbar">
            <div className="buttons">
                <button className="button">Exchange</button>
            </div>
            <div className="buttons">
                <button className="button">Statistics</button>
            </div>
            <div className="buttons">
                <button className="button">Pools</button>
            </div>
            <div className="buttons">
                <button className="button">Login</button>
            </div>
        </div>
    );
};

export default NavigationBar;
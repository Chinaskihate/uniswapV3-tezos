import React, {Component} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';



const NavigationBar = () => {
    return (
        <div className="navbar">
            <div className="buttons">
                <Link to='/exchange'>
                    <button className="button">Exchange</button>
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
            <div className="buttons">
                <button className="button">Login</button>
            </div>
        </div>
    );
};

export default NavigationBar;
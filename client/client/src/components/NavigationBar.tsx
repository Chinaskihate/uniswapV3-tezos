import React, {Component} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators, RootState} from "../store";
import {userAddressReducer} from "../store/reducers/UserAddressReducer";

const NavigationBar = () => {
    const dispatch = useDispatch();
    const userAddress = useSelector((state: RootState) => state.userAddress);
    const {setUserAddress} = bindActionCreators(actionCreators, dispatch);

    const setUserAddressWrapper = () => {
        setUserAddress(Date().toLocaleUpperCase());
        alert(userAddress);
    }

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
            <div className="buttons" onClick={setUserAddressWrapper}>
                <button className="button">Login</button>
            </div>
        </div>
    );
};

export default NavigationBar;
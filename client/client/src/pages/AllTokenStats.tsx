import React, { Component } from 'react'
import TokenStats from './TokenStats'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";

export default function AllTokenStats() {
  
    return (
        <div>
          <div className="tokenlist">
            <h1>
              AllTokenStats
            </h1>
            <li>
              <Link to="tokenstats">TokenStats</Link>
            </li>
            <hr />
          </div>
          <Outlet />
        </div>
      )
}

import React from 'react';
import { Link } from "react-router-dom";
import './navbar.css'
const Navbar = () => {
    return (
        <div className=''>
                    <ul className="topnav">
                        <li className='active'>
                            <Link to="/">
                            <i className="fa fa-home" aria-hidden="true"></i>
                            {" "} Home 
                                </Link>
                        </li>
                        <li>
                            <Link to="/stat">
                            <i className="fa fa-table" aria-hidden="true"></i>
                            {" "} Countries 
                                </Link>
                        </li>
                        <li>
                            <Link to="/charts">
                            <i className="fa fa-line-chart" aria-hidden="true"></i>
                            {" "} Charts 
                                </Link>
                        </li>
                        <li>
                            <Link to="/map">
                            <i className="fa fa-map" aria-hidden="true"></i>
                            {" "} Map 
                                </Link>
                        </li>
                        <li className='about'>
                            <Link to="/about">
                            <i className="fa fa-info" aria-hidden="true"></i>
                            {" "} About
                                </Link>
                        </li>
                    </ul>
        </div>
    );
}

export default Navbar;
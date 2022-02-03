import React from 'react';
import { Link, NavLink } from "react-router-dom";
import './navbar.css'
const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">
                                <i className="fa fa-home" aria-hidden="true"></i>
                                {" "} Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/stat" className="nav-link">
                            <i className="fa fa-table" aria-hidden="true"></i>
                            {" "} Countries
                        </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/charts" className="nav-link">
                            <i className="fa fa-line-chart" aria-hidden="true"></i>
                            {" "} Charts
                        </NavLink>
                        </li>
                        <li className="nav-item ">
                        <NavLink to="/map" className="nav-link">
                            <i className="fa fa-map" aria-hidden="true"></i>
                            {" "} Map
                        </NavLink>
                        </li>
                        {/* <li className="nav-item ">
                        <NavLink to="/about" className="nav-link" style={{position:'absolute',right:'0%'}}>
                            <i className="fa fa-info" aria-hidden="true"></i>
                            {" "} About
                        </NavLink>
                        </li> */}
                    </ul>
                </div>
            </nav>

            {/* <div>
                <ul className="topnav">
                    <li>
                        <NavLink to="/">
                            <i className="fa fa-home" aria-hidden="true"></i>
                            {" "} Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/stat">
                            <i className="fa fa-table" aria-hidden="true"></i>
                            {" "} Countries
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/charts">
                            <i className="fa fa-line-chart" aria-hidden="true"></i>
                            {" "} Charts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/map">
                            <i className="fa fa-map" aria-hidden="true"></i>
                            {" "} Map
                        </NavLink>
                    </li>
                    <li className='about'>
                        <NavLink to="/about">
                            <i className="fa fa-info" aria-hidden="true"></i>
                            {" "} About
                        </NavLink>
                    </li>
                </ul>
            </div> */}
        </>
    );
}

export default Navbar;
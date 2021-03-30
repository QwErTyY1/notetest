import React from 'react';
import logo from "../../../logo.svg";
import classes from './Navbar.module.css';

export const Navbar = (props) => {

    return (
        <nav className={classes.nav_bar}>
            <a href="/#" className={classes.nav_bar__logo}>
                <img height={'88px'} src={logo} className="App-logo" alt="logo"/>
            </a>
            <ul className={classes.nav_bar__list}>
                <li className={classes.nav_bar__item}>1</li>
                <li className={classes.nav_bar__item}>2</li>
            </ul>
        </nav>
    )
}

import React from 'react';
import {Navbar} from './Navbar/Navbar';
import classes from './Header.module.css'

export const Header = (props) => {
    return (
        <header className={classes.page_header}>
            <Navbar/>
        </header>
    )
}
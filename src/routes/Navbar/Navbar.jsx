import React, { Fragment } from 'react';
import { Outlet } from "react-router-dom"

const Navbar = () => {
    return (
        <Fragment>
            <h2>NFT Collections</h2>

            <Outlet />
        </Fragment>
    );
}

export default Navbar;
import { Fragment } from 'react';
import { Outlet } from "react-router-dom"

import {CssBaseline, AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';

const Navbar = () => {
    return (
        <Fragment>
            <CssBaseline/>
            <AppBar position="static" >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <AdbIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>NFT Collections</Typography>

                    <Button variant='contained' color="error">Create collection</Button>
                </Toolbar>
            </AppBar>


            <Outlet />
        </Fragment>
    );
}

export default Navbar;
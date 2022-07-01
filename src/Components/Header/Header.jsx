import React from 'react';
import './Header.css';
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import { Button } from '@mui/material';

const Header = () => {

    return (
        <>
            <div className='full_header'>
                <div className='header_top'>
                    <div className='red-header'></div>
                    <div className='green-header'></div>
                    <div className='yellow-header'></div>
                    <div className='blue-header'></div>
                </div>
                <div className='header_bottom'>
                    <div className="header_left">
                        <img className='only_large' src="/logo-full.png" alt="logo" />
                        <img className='only_small' src="/logo.png" alt="logo" />
                    </div>
                    <div className="header_right">
                        <NavLink to="admin">
                            <Button variant="contained" color="success" className='login_button' >
                                <span className="only_large">Iniciar Sesión</span>
                                <span className='only_small login_btn_text'>
                                    <Icon color='#fff' icon="uil:signin" />
                                </span>
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className='navbar'>
                <div className='bloque'>
                    <Navbar className="navbar" />
                </div>
            </div>
        </>
    )
}

export default Header;
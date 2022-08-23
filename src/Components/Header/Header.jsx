import React, { useContext, useState } from 'react';
import './Header.css';
import { Icon } from '@iconify/react';
import DrawerAppBar from './Navbar/Appbar';
import { Button } from '@mui/material';
import LoginDialog from '../Dialog/LoginDialog';
import AuthContext from '../../Context/AuthProvider';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [open, setOpen] = useState(false);
    const { auth } = useContext(AuthContext);
    const [navbar, setNavbar] = useState(false);

    const changeHeader = () => {
        if(window.scrollY >+ 80){
            setNavbar(true);
        }else{
            setNavbar(false);
        }
    }

    window.addEventListener('scroll', changeHeader);

    const handleClickOpen = () => {
        setOpen(!open);
    };

    return (
        <>
            <div className= 'full_header'>
                <div className='header_top'>
                    <div className='red-header'></div>
                    <div className='green-header'></div>
                    <div className='yellow-header'></div>
                    <div className='blue-header'></div>
                </div>
                <div className= {navbar ? 'header_bottom active_scroll' : 'header_bottom'}>
                    <div className= "header_left">
                        <img className='only_large' src="/logo-full.png" alt="logo" />
                        <img className='only_small' src="/logo.png" alt="logo" />
                    </div>
                    <div className="header_right">
                        {
                            auth.user ? (
                                <NavLink to='/admin'>
                                    <Button variant="contained" color="success" className='login_button' >
                                        <span className="only_large">Ir a Admin</span>
                                        <span className='only_small login_btn_text'>
                                            <Icon color='#fff' icon="uil:signin" />
                                        </span>
                                    </Button>
                                </NavLink>
                            ) : (<Button variant="contained" color="success" className='login_button' onClick={() => handleClickOpen()} >
                                <span className="only_large">Iniciar Sesión</span>
                                <span className='only_small login_btn_text'>
                                    <Icon color='#fff' icon="uil:signin" />
                                </span>
                            </Button>)
                        }
                        <LoginDialog open={open} handleClose={() => setOpen(false)} />
                    </div>
                </div>
            </div>
            <div className='navbar'>
                <DrawerAppBar className="navbar" />
            </div>
        </>
    )
}

export default Header;
import React from 'react';
import './Header.css';
import { useContext } from 'react';
import { Icon } from '@iconify/react';
import AuthContext from '../../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { SecondaryButton } from '../Form/Button/Button';
import Navbar from './Navbar/Navbar';

const Header = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
        setAuth({});
        navigate('/login');
    }

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
                        {
                            auth.user ? (
                                <>
                                    <button type='button' className='login_button' onClick={() => navigate(`/profile/${auth.user._id}`)}>
                                        <span className="only_large">{auth.user.username.split(' ')[0]}</span>
                                        <span className='only_small login_btn_text'>
                                            <Icon color='#fff' icon="uil:signin" />
                                        </span>
                                    </button>
                                    <SecondaryButton onClick={logout}>
                                        Cerrar Sesión
                                    </SecondaryButton>
                                </>
                            ) : (
                                <button type='button' className='login_button' onClick={() => navigate('/login')}>
                                    <span className="only_large">Iniciar Sesión</span>
                                    <span className='only_small login_btn_text'>
                                        <Icon color='#fff' icon="uil:signin" />
                                    </span>
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='navbar'>
                <div className='bloque'>
                    <Navbar className="navbar"/>
                </div>
            </div>
        </>
    )
}

export default Header;
import { Icon } from '@iconify/react';
import React, { useState, useContext } from 'react';
import Burger from '../Burger/Burger';
import './HeaderNav.css';
import { NavLink, useNavigate } from 'react-router-dom';

import AuthContext from '../../Context/AuthProvider';

const HeaderNav = ({ Title }) => {
    const { auth, setAuth } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [hideNav, setHideNav] = useState(['hide_admin']);
    const navigate = useNavigate();
    const menuId = "main-menu";
    const toggleHamburger = () => {
        setOpen(!open);
        setHideNav(open ? ["hide_admin"] : ["show_admin"]);
    }

    const logout = () => {
        setAuth({});
        localStorage.removeItem("user");
        navigate('/');
    }
    return (
        <div className='full_hdr'>
            <div className="dashboard-header">
                <div className='head_header'>
                    <Burger className='burgerNav' open={open} setOpen={setOpen} aria-controls={menuId} onClick={toggleHamburger} />
                    <h1>{Title}</h1>
                    {/* <Image className="rnp-logo" src="/img/rnp-logo.png" alt="rnp logo"> */}
                </div>
                <nav className={["dashboard-nav", ...hideNav].join(' ')} >
                    <div className="user-img">
                        <Icon className="iconify person-circle" icon="bi:person-circle" />
                        <p className="auth-user">
                            {
                                auth.user ? auth.user.username : logout
                            }
                        </p>
                    </div>
                    <ul className="dash-nav-items">
                        <li className="dash-nav-item">
                            <NavLink to="/admin" end className={({ isActive }) => (isActive ? "active-dash" : "") + " dash-nav-link "}>
                                <Icon className='iconify' icon="ic:outline-space-dashboard" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="dash-nav-item">
                            <NavLink to="/admin/news" className={({ isActive }) => (isActive ? "active-dash" : "") + " dash-nav-link "}>
                                <Icon className='iconify' icon="bi:person-badge" />
                                <span>Noticias</span>
                            </NavLink>
                        </li>
                        <li className="dash-nav-item">
                            <NavLink to="/admin/events" className={({ isActive }) => (isActive ? "active-dash" : "") + " dash-nav-link "}>
                                <Icon className='iconify' icon="ant-design:file-search-outlined" />
                                <span>Eventos</span>
                            </NavLink>
                        </li>
                        {
                            (auth.user.idPost === 1 || auth.user.idPost === 4) ? (
                            <li className="dash-nav-item">
                                <NavLink to="/admin/users" className={({ isActive }) => (isActive ? "active-dash" : "") + " dash-nav-link "}>
                                    <Icon className='iconify' icon="la:users" />
                                    <span>Usuarios</span>
                                </NavLink>
                            </li>
                            ) : <></>
                        }
                    </ul>
                    <div className="dashboard-logout-section">
                        <button className="btn-logout" onClick={logout}>Logout</button>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default HeaderNav;
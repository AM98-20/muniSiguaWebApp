import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import Burger from '../Burger/Burger';
import './HeaderNav.css';

const HeaderNav = () => {
    const [open, setOpen] = useState(false);
    const [hideNav, setHideNav] = useState(['hide']);
    const menuId = "main-menu";
    const toggleHamburger = () => {
        setOpen(!open);
        setHideNav(open ? ["hide"] : ["show"]);
    }

    return (
        <div>
            <div className="dashboard-header">
                <Burger className='burgerNav' open={open} setOpen={setOpen} aria-controls={menuId} onClick={toggleHamburger} />
                <h1>Dashboard </h1>
                {/* <Image className="rnp-logo" src="/img/rnp-logo.png" alt="rnp logo"> */}
                <div>
                </div>
                <nav className={["dashboard-nav", ...hideNav].join(' ')} >
                    <div className="user-img">
                        <Icon className="iconify person-circle" icon="bi:person-circle" />
                        <p className="auth-user">
                            Name
                        </p>
                    </div>
                    <ul className="dash-nav-items">
                        <li className="dash-nav-item">
                            <a href="/dashboard/registrados" className="dash-nav-link {{ session('activeDash') === 'Registrados' ? 'active-dash' : null }}">
                                <Icon icon="bi:person-badge" />
                                <span>Noticias</span>
                            </a>
                        </li>
                        <li className="dash-nav-item">
                            <a href="/dashboard/colaboradores" className="dash-nav-link {{ session('activeDash') === 'Colaboradores' ? 'active-dash' : null }}">
                                <Icon icon="ant-design:file-search-outlined" />
                                <span>Eventos</span>
                            </a>
                        </li>
                        <li className="dash-nav-item">
                            <a href="/dashboard/colaboradores" className="dash-nav-link {{ session('activeDash') === 'Colaboradores' ? 'active-dash' : null }}">
                                <Icon icon="la:users" />
                                <span>Usuarios</span>
                            </a>
                        </li>
                    </ul>
                    <div className="dashboard-logout-section">
                        <a href="/logout" className="btn-logout">Logout</a>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default HeaderNav;
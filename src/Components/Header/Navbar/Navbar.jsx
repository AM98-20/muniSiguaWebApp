import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { Icon } from '@iconify/react';
import Burger from '../../Burger/Burger';

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const [hideNav, setHideNav] = useState(['']);
    const [hideA, setHideA] = useState(['hideA']);
    const [hideB, setHideB] = useState(['hideA']);
    const [accordionOpenA, setAccordionOpenA] = useState(true);
    const [accordionOpenB, setAccordionOpenB] = useState(true);

    const menuId = "main-menu";

    const toggleHamburger = () => {
        setOpen(!open);
        setHideNav(open ? ["hide"] : ["show"]);
    }

    const toggleAccordionA = () => {
        setAccordionOpenA(!accordionOpenA);
        setHideA(accordionOpenA ? [""] : ["hideA"]);
        if (!accordionOpenB) {
            setAccordionOpenB(!accordionOpenB);
            setHideB(accordionOpenB ? [""] : ["hideA"]);
        }
    }
    const toggleAccordionB = () => {
        setAccordionOpenB(!accordionOpenB);
        setHideB(accordionOpenB ? [""] : ["hideA"]);
        if (!accordionOpenA) {
            setAccordionOpenA(!accordionOpenA);
            setHideA(accordionOpenA ? [""] : ["hideA"]);
        }
    }

    return (
        <>
            <nav className='navigation'>
                <ul className={[hideNav, 'nav'].join(' ')} >
                    <NavLink to="/" end className={({ isActive }) => (isActive ? "activated" : "") + " li"} >
                        <div className='labels'>
                            <Icon className="icon" icon="bxs:home" width="25" />
                            <li>
                                Inicio
                            </li>
                        </div>
                    </NavLink>
                    <div className='tst'>
                        <li className='li label' onClick={toggleAccordionA} onMouseEnter={toggleAccordionA}>
                            <div className='labels'>
                                <Icon className="icon" icon="bxs:home" width="25" />
                                <span>Alcaldía</span>
                            </div>
                            <Icon className="rotate-a" icon="ant-design:caret-down-filled" width="15" />
                        </li>
                        <div className='subMenu'>
                            <ul className={[hideA, 'content'].join(' ')}>
                                <li><Icon className="icon" icon="bxs:home" width="25" />Organigrama</li>
                                <li><Icon className="icon" icon="bxs:home" width="25" />Departamentos</li>
                            </ul>
                        </div>
                    </div>
                    <NavLink to="/back" className={({ isActive }) => (isActive ? "activated" : "") + " li"} >
                        <div className='labels'>
                            <Icon className="icon" icon="bxs:home" width="25" />
                            <li>
                                Noticias
                            </li>
                        </div>
                    </NavLink>
                    <div className='tst'>
                        <li className='li label' onClick={toggleAccordionB} onMouseEnter={toggleAccordionB} >
                            <div className='labels'>
                                <Icon className="icon" icon="bxs:home" width="25" />
                                <span>Turismo</span>
                            </div>
                            <Icon className="rotate-b" icon="ant-design:caret-down-filled" width="15" />
                        </li>
                        <ul className={[hideB, 'content'].join(' ')}>
                            <li><Icon className="icon" icon="bxs:home" width="25" />Organigrama</li>
                            <li><Icon className="icon" icon="bxs:home" width="25" />Departamentos</li>
                        </ul>
                    </div>
                    <NavLink to="/back" className={({ isActive }) => (isActive ? "activated" : "") + " li"} >
                        <div className='labels'>
                            <Icon className="icon" icon="bxs:home" width="25" />
                            <li>
                                Nosotros
                            </li>
                        </div>
                    </NavLink>
                </ul>
                <ul className='toggle' >
                    <div className='hamburger' onClick={toggleHamburger}>
                        <Burger open={open} setOpen={setOpen} aria-controls={menuId}  />
                    </div>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;
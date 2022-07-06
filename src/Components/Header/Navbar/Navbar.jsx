import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { Icon } from '@iconify/react';
import Burger from '../../Burger/Burger';

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const [hideNav, setHideNav] = useState(['']);
    const [hideA, setHideA] = useState(['']);
    const [hideB, setHideB] = useState(['']);
    const [accordionOpenA, setAccordionOpenA] = useState(false);
    const [accordionOpenB, setAccordionOpenB] = useState(false);

    const menuId = "main-menu";

    const toggleHamburger = () => {
        setOpen(!open);
        setHideNav(open ? ["hide"] : ["show"]);
    }

    const toggleAccordionA = () => {
        setAccordionOpenA(!accordionOpenA);
        setHideA(accordionOpenA ? [""] : ["hideA"]);
        if (accordionOpenB) {
            setAccordionOpenB(false);
            setHideB(['hideA']);
        }
    }
    const toggleAccordionB = () => {
        setAccordionOpenB(!accordionOpenB);
        setHideB(accordionOpenB ? [""] : ["hideA"]);
        if (accordionOpenA) {
            setAccordionOpenA(false);
            setHideA(['hideA']);
        }
    }
    const openA = () => {
        setAccordionOpenA(true);
        setHideA([""]);
    }

    const closeA = () => {
        setAccordionOpenA(false);
        setHideA(["hideA"]);
    }
    const openB = () => {
        setAccordionOpenB(true);
        setHideB([""]);
    }

    const closeB = () => {
        setAccordionOpenB(false);
        setHideB(["hideA"]);
    }

    useEffect(() => {
        setHideA(['hideA']);
        setHideB(['hideA']);
        setAccordionOpenA(false);
        setAccordionOpenB(false);
    }, []);

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
                    <div className='tst'onMouseEnter={openA} onMouseLeave={closeA}>
                        <li className='li label' onClick={toggleAccordionA} >
                            <div className='labels'>
                                <Icon className="icon" icon="bxs:home" width="25" />
                                <span>Alcaldía</span>
                            </div>
                            <Icon className="rotate-a" icon="ant-design:caret-down-filled" width="15" />
                        </li>
                        <div className='subMenu'>
                            <ul className={[hideA, 'content'].join(' ')}>
                                <li className='anmt'><Icon className="icon" icon="bxs:home" width="25" />Organigrama</li>
                                <li className='anmt'><Icon className="icon" icon="bxs:home" width="25" />Departamentos</li>
                                <li className='anmt'><Icon className="icon" icon="bxs:home" width="25" />Contactos</li>
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
                    <div className='tst' onMouseEnter={openB} onMouseLeave={closeB}>
                        <li className='li label' onClick={toggleAccordionB} >
                            <div className='labels'>
                                <Icon className="icon" icon="bxs:home" width="25" />
                                <span>Turismo</span>
                            </div>
                            <Icon className="rotate-b" icon="ant-design:caret-down-filled" width="15" />
                        </li>
                        <ul className={[hideB, 'content'].join(' ')}>
                            <li className='anmt'><Icon className="icon" icon="bxs:home" width="25" />Cultura</li>
                            <li className='anmt'><Icon className="icon" icon="bxs:home" width="25" />Eventos</li>
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
                        <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
                    </div>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;
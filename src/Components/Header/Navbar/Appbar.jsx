import * as React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, Divider, Drawer } from '@mui/material';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, IconButton, Accordion, AccordionSummary } from '@mui/material';
import { MenuItem, MenuList, Popper, ClickAwayListener, Grow, Paper } from '@mui/material';
import { Icon } from '@iconify/react';

import './Appbar.css';
import { NavLink } from 'react-router-dom';
const drawerWidth = 240;
function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    //alt
    const [openAlt, setOpenAlt] = React.useState(false);
    const anchorRefAlt = React.useRef(null);
    const [expanded, setExpanded] = React.useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const handleToggleAlt = () => {
        setOpenAlt((prevOpenAlt) => !prevOpenAlt);
    };

    const handleCloseAlt = (event) => {
        if (anchorRefAlt.current && anchorRefAlt.current.contains(event.target)) {
            return;
        }

        setOpenAlt(false);
    };

    function handleListKeyDownAlt(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenAlt(false);
        } else if (event.key === 'Escape') {
            setOpenAlt(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpenAlt = React.useRef(openAlt);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
        if (prevOpenAlt.current === true && openAlt === false) {
            anchorRefAlt.current.focus();
        }

        prevOpenAlt.current = openAlt;
    }, [open, openAlt]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <NavLink to={'/'} className={({ isActive }) => (isActive ? "navlink-active" : "") + ' navlink'}>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={'Inicio'} />
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                <ListItem disablePadding>
                    <Accordion className='accordion-item' expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary className='accordion-content' aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>Alcaldia</Typography>
                        </AccordionSummary>
                        <Divider />
                        <List>
                            <ListItem disablePadding>
                                <NavLink to={'/sample'} className={({ isActive }) => (isActive ? "navlink-active" : "") + ' navlink'}>
                                    <ListItemButton sx={{ textAlign: 'center' }}>
                                        <ListItemText primary={'Organigrama'} />
                                    </ListItemButton>
                                </NavLink>
                            </ListItem>
                            <ListItem disablePadding>
                                <NavLink to={'/sample'} className={({ isActive }) => (isActive ? "navlink-active" : "") + ' navlink'}>
                                    <ListItemButton sx={{ textAlign: 'center' }}>
                                        <ListItemText primary={'Departamentos'} />
                                    </ListItemButton>
                                </NavLink>
                            </ListItem>
                            <ListItem disablePadding>
                                <NavLink to={'/sample'} className={({ isActive }) => (isActive ? "navlink-active" : "") + ' navlink'}>
                                    <ListItemButton sx={{ textAlign: 'center' }}>
                                        <ListItemText primary={'Portal de Transparencia'} />
                                    </ListItemButton>
                                </NavLink>
                            </ListItem>
                        </List>
                        <Divider />
                    </Accordion>
                </ListItem>
                <ListItem disablePadding>
                    <NavLink to={'/sample'} className={({ isActive }) => (isActive ? "navlink-active" : "") + ' navlink'}>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={'Noticias'} />
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                <ListItem disablePadding>
                    <Accordion className='accordion-item' expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary className='accordion-content' aria-controls="panel2d-content" id="panel2d-header">
                            <Typography>Cultura</Typography>
                        </AccordionSummary>
                        <Divider />
                        <List>
                            <ListItem disablePadding>
                                <NavLink to={'/sample'} className={({ isActive }) => (isActive ? "navlink-active" : "") + ' navlink'}>
                                    <ListItemButton sx={{ textAlign: 'center' }}>
                                        <ListItemText primary={'Eventos'} />
                                    </ListItemButton>
                                </NavLink>
                            </ListItem>
                            <ListItem disablePadding>
                                <NavLink to={'/sample'} className={({ isActive }) => (isActive ? "navlink-active" : "") + ' navlink'}>
                                    <ListItemButton sx={{ textAlign: 'center' }}>
                                        <ListItemText primary={'Cultura'} />
                                    </ListItemButton>
                                </NavLink>
                            </ListItem>
                        </List>
                        <Divider />
                    </Accordion>
                </ListItem>
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav" className='appbar'>
                <Toolbar className='appbar-items'>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <Icon icon="charm:menu-hamburger" />
                    </IconButton>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }} className='nav-items' >
                        <NavLink to="/" end className={({ isActive }) => (isActive ? "activated" : "") + ' nav-item'}>
                            <Button
                                sx={{ color: '#fff' }}
                                className='nav-item'
                            >
                                Inicio
                            </Button>
                        </NavLink>
                        <Button
                            endIcon={<Icon className='icon-appbar' style={open ? { transform: 'rotate(180deg)' } : { transform: 'rotate(0deg)' }} icon="ep:arrow-down-bold" />}
                            sx={{ color: '#fff' }}
                            className='nav-item'
                            ref={anchorRef}
                            id="composition-button"
                            aria-controls={open ? 'composition-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                        >
                            Alcaldia
                        </Button>
                        <Popper
                            open={open}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            placement="bottom-start"
                            transition
                            disablePortal
                        >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin:
                                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                                    }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList
                                                autoFocusItem={open}
                                                className='comp-menu'
                                                id="composition-menu"
                                                aria-labelledby="composition-button"
                                                onKeyDown={handleListKeyDown}
                                            >
                                                <NavLink to={'/sample'} end className={({ isActive }) => (isActive ? "activated" : "") + ' nav-item'}>
                                                    <MenuItem className='nav-item' onClick={handleClose}>Departamentos</MenuItem>
                                                </NavLink>
                                                <MenuItem className='nav-item' onClick={handleClose}>Organigrama</MenuItem>
                                                <NavLink to={'/sample'} end className={({ isActive }) => (isActive ? "activated" : "") + ' nav-item'}>
                                                    <MenuItem className='nav-item' onClick={handleClose}>Portal de Transparencia</MenuItem>
                                                </NavLink>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                        <NavLink to="/sample" end className={({ isActive }) => (isActive ? "activated" : "") + ' nav-item'}>
                            <Button
                                sx={{ color: '#fff' }}
                                className='nav-item'
                            >
                                Noticias
                            </Button>
                        </NavLink>
                        <Button
                            endIcon={<Icon className='icon-appbar' style={openAlt ? { transform: 'rotate(180deg)' } : { transform: 'rotate(0deg)' }} icon="ep:arrow-down-bold" />}
                            sx={{ color: '#fff' }}
                            className='nav-item'
                            ref={anchorRefAlt}
                            id="composition-button"
                            aria-controls={openAlt ? 'composition-menu' : undefined}
                            aria-expanded={openAlt ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggleAlt}
                        >
                            Cultura
                        </Button>
                        <Popper
                            open={openAlt}
                            anchorEl={anchorRefAlt.current}
                            role={undefined}
                            placement="bottom-start"
                            transition
                            disablePortal
                        >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin:
                                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                                    }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleCloseAlt}>
                                            <MenuList
                                                autoFocusItem={openAlt}
                                                className='comp-menu'
                                                id="composition-menu"
                                                aria-labelledby="composition-button"
                                                onKeyDown={handleListKeyDownAlt}
                                            >
                                                <MenuItem className='nav-item' onClick={handleCloseAlt}>Eventos</MenuItem>
                                                <MenuItem className='nav-item' onClick={handleCloseAlt}>Cultura</MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

DrawerAppBar.propTypes = {
    window: PropTypes.func,
};

export default DrawerAppBar;

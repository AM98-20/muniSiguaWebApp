import React from 'react';
import './Home.css'
import { Divider, Typography, Card, CardMedia, CardContent, Button, AppBar, Box, Tab, Tabs } from '@mui/material';
import { Icon } from '@iconify/react';
import ErrorBoundary from '../../Error/ErrorBoundary';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box className='tabPanel_box' sx={{ p: 3 }}>
                    <div className='tabPanel_content'>{children}</div>
                </Box>
            )}
        </div>
    );
}

const Home = ({ news, events }) => {
    const [value, setValue] = React.useState(0);
    const [moves, setMoves] = React.useState(0);
    const [movesAlt, setMovesAlt] = React.useState(0);
    var options = { month: 'short', day: 'numeric' };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleMove = (event, value) => {
        setMoves(v => v + value);
    };
    const handleMoveAlt = (event, value) => {
        setMovesAlt(v => v + value);
    };

    return (
        <section className='home-main'>
            <div className='heroPanel'>
                <div className='sliderPanel'></div>
                <div className='displayPanel'>
                    <img className='hero-img' src="/home/Siguatepeque.jpg" alt='' />
                    <div className='hero-main'>
                        <div className='hero-text'>
                            <Typography className='text_main-hero' variant='subtitle2'>¡Bienvenidos!</Typography>
                            <Typography className='text_main-hero' variant='subtitle1'>Portal Oficial de la Municipalidad de Siguatepeque</Typography>
                        </div>
                        <a href='https://portalunico.iaip.gob.hn/portal/index.php?portal=65' target="_blank" rel='noreferrer'>
                            <Button variant='outlined' className='hero-button'>Portal de Tranparencia</Button>
                        </a>
                    </div>
                </div>
            </div>
            <section className='cards'>
                <Card className='card-button'>
                    <div className='icon-back'>
                        <Icon icon="maki:town-hall" height={70} />
                    </div>
                    <CardContent className='card-content'>
                        <h3>PALACIO MUNICIPAL</h3>
                        Estamos atentiendo en horario de 8 am – 4pm de Lns – Vrns y 8am – 12m los Sbds
                    </CardContent>
                </Card>
                <Card className='card-button'>
                    <div className='icon-back'>
                        <Icon icon="bi:credit-card-2-back" height={70} />
                    </div>
                    <CardContent className='card-content'>
                        <h3>PAGOS EN LINEA</h3>
                        Pronto podrás pagar tus impuestos en línea.
                    </CardContent>
                </Card>
                <Card className='card-button'>
                    <div className='icon-back'>
                        <Icon icon="bi:newspaper" height={70} />
                    </div>
                    <CardContent className='card-content'>
                        <h3>NOTICIAS MUNICIPALES</h3>
                        Las noticias más recientes de nuestra administración, eventos y ferias locales.
                    </CardContent>
                </Card>
            </section>
            <section className='news-calendar'>
                <Box sx={{ bgcolor: 'transparent' }}>
                    <div className='tabs_title' >
                        <Typography variant='h4'> Lo que está sucediendo en Siguatepeque.</Typography>
                    </div>
                    <Divider className='divider' variant='middle' />
                    <AppBar position="static" sx={{ bgcolor: 'transparent' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="Tabs"
                        >
                            <Tab className='tab_header' label="Noticias" />
                            <Tab className='tab_header' label="Calendario" />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0} className='slider'>
                        <Button aria-disabled={moves > 0 ? 'false' : 'true'} className='flecha flecha_izq' onClick={(e) => handleMove(e, -1)}><Icon icon="ic:round-greater-than" color='white' width="30" rotate={2} /></Button>
                        <Button aria-disabled={moves < news.length - 1 ? 'false' : 'true'} className='flecha flecha_dre' onClick={(e) => handleMove(e, 1)}><Icon icon="ic:round-greater-than" color='white' width="30" /></Button>
                        <div className="contain">
                            <div className='row news_slider' style={{ transform: `translate(${moves * -250}px)` }}>
                                <div className="row__inner">
                                    {news &&
                                        news.length > 0 ? (news.map((ev) => (
                                            <Card className="tile" key={ev.idNews}>
                                                <CardMedia className="tile__media">
                                                    <img className="tile__img" src={ev.imgPortada} alt="" />
                                                </CardMedia>
                                                <CardContent className="tile__details">
                                                    <div className="tile__title">
                                                        <Typography style={{whiteSpace: 'pre-wrap'}} variant='subtitle' component='h3'>{ev.newsName}</Typography>

                                                        <Typography className='tile__desc'>{ev.newsDesc}</Typography>
                                                    </div>
                                                </CardContent>

                                            </Card>
                                        ))) : (<Typography variant='subtile2' component='p' color='white'> No hay nada que mostrar</Typography>)
                                    }
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1} className='slider'>
                        <Button aria-disabled={movesAlt > 0 ? 'false' : 'true'} className='flecha flecha_izq' onClick={(e) => handleMoveAlt(e, -1)}><Icon icon="ic:round-greater-than" color='white' width="30" rotate={2} /></Button>
                        <Button aria-disabled={movesAlt < events.length - 1 ? 'false' : 'true'} className='flecha flecha_dre' onClick={(e) => handleMoveAlt(e, 1)}><Icon icon="ic:round-greater-than" color='white' width="30" /></Button>
                        <div className="contain">
                            <div className='row news_slider' style={{ transform: `translate(${movesAlt * -250}px)` }}>
                                <ErrorBoundary>
                                    <div className="row__inner">
                                        {events &&
                                            events.length > 0 ? (events.map((ev) => (
                                                <Card className="tile" key={ev.idEvent}>
                                                    <CardMedia className="tile__media">
                                                        <img className="tile__img" src={ev.imgPortada} alt="" />
                                                    </CardMedia>
                                                    <CardContent className="tile__details">

                                                        <div className="tile__title">
                                                            <Typography variant='subtitle' component='h3'>{ev.eventName}</Typography>

                                                            <Typography className='tile__desc'>{ev.eventDescription}</Typography>
                                                        </div>

                                                    </CardContent>
                                                    <div className='tile__date'>
                                                        <Typography className='date'>{new Date(ev.eventDate).toLocaleDateString('es-ES', options)}</Typography>
                                                    </div>
                                                </Card>
                                            ))) : (<Typography variant='subtile2' component='p' color='white'> No hay nada que mostrar</Typography>)
                                        }
                                    </div>
                                </ErrorBoundary>
                            </div>
                        </div>
                    </TabPanel>
                </Box>
            </section>
            <section id='map'>
                <iframe
                    className='map'
                    title='map'
                    src="https://maps.google.com/maps?q=municilidad%20de%20siguatepeque&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    style={{ border: '0' }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                />
            </section>
        </section >
    )
}
export default Home;
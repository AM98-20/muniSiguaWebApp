import React from 'react';
import './Home.css'
import { Divider, Typography, Card, CardContent, Button, AppBar, Box, Tab, Tabs } from '@mui/material';
import { Icon } from '@iconify/react';

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
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}



const Home = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <section className='home-main'>
            <div className='heroPanel'>

                <div className='sliderPanel'></div>
                <div className='displayPanel'>
                    <img className='hero-img' src="/home/Siguatepeque.jpg" alt='' />
                    <div className='hero-main'>
                        <div className='hero-text'>
                            <Typography variant='subtitle2'>¡Bienvenidos!</Typography>
                            <Typography variant='subtitle1'>Portal Oficial de la Municipalidad de Siguatepeque</Typography>
                        </div>
                        <Button variant='outlined' className='hero-button'>Portal de Tranparencia</Button>
                    </div>
                </div>
            </div>
            <Divider><Typography variant='h5' component='h2'>SIGUATEPEQUE</Typography></Divider>
            <section className='cards'>
                <Card className='card-button'>
                    <div className='icon-back'>
                        <Icon icon="maki:town-hall" height={100} />
                    </div>
                    <CardContent className='card-content'>
                        <h3>PALACIO MUNICIPAL</h3>
                        Estamos abiertos en horario de 8 am – 4pm de Lns – Vrns y 8am – 12m los Sbds
                    </CardContent>
                </Card>
                <Card className='card-button'>
                    <div className='icon-back'>
                        <Icon icon="bi:credit-card-2-back" height={100} />
                    </div>
                    <CardContent className='card-content'>
                        <h3>PAGOS EN LINEA</h3>
                        Pronto podrás pagar tus impuestos en línea.
                    </CardContent>
                </Card>
                <Card className='card-button'>
                    <div className='icon-back'>
                        <Icon icon="bi:newspaper" height={100} />
                    </div>
                    <CardContent className='card-content'>
                        <h3>NOTICIAS MUNICIPALES</h3>
                        Las noticias más recientes de nuestra administración local y eventos y ferias locales.
                    </CardContent>
                </Card>
            </section>
            <section className='news-calendar'>
                <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
                    <AppBar position="static">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="Item One" />
                            <Tab label="Item Two" />
                            <Tab label="Item Three" />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0} >
                        Item One
                    </TabPanel>
                    <TabPanel value={value} index={1} >
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2} >
                        Item Three
                    </TabPanel>
                </Box>
            </section>
            <section className='map'>
                
            </section>
        </section>
    )
}

export default Home;
import React from 'react';
import './Home.css'
import { Divider, Typography, Card, CardContent, Button } from '@mui/material';
import { Icon } from '@iconify/react';

const Home = () => {

    return (
        <div className='main'>
            <div className='heroPanel'>

                <div className='sliderPanel'></div>
                <div className='displayPanel'>
                    <img className='hero-img' src="/home/Siguatepeque.jpg" alt='' />
                    <Button variant='outlined' className='hero-button'>Portal de Tranparencia</Button>
                </div>
            </div>
            <Divider><Typography><h1>BIENVENIDOS</h1></Typography></Divider>
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
            <div className='news-calendar'>

            </div>
            <div className='map'>

            </div>
        </div>
    )
}

export default Home;
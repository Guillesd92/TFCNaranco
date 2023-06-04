
import React from 'react';
import NavBarra from '../Components/NavBarra';
import { Grid, Typography } from '@material-ui/core';
import theme from './../Components/theme';
import "./../../css/home.css";

const Home = () => {
    return (
        <div>
            <Grid container direction="column" style={{ minHeight: '100vh', backgroundColor: theme.palette.azulOscuro.color }}>
                <NavBarra />
                <Grid item style={{ backgroundColor: theme.palette.azulOscuro.color}}>
                    <h1 className='text-center' style={{ fontSize: '35px', padding:'0.7em' }}> ¡Bienvenido/a al panel de administrador !&#x1F44B;</h1>
                    <Grid style={{ display: 'flex', justifyContent: 'center'}}>
                        <Typography variant="h6" align="center" style={{ width:'50%'}}>Aquí encontrarás todas las herramientas y funcionalidades necesarias para  poder gestionar y controlar todos los aspectos clave de tu plataforma. </Typography>
                    </Grid>
                    <Grid style={{ display: 'flex', justifyContent: 'center', marginTop:'10px'}}>
                        <Typography variant="h6" align="center" style={{ width:'50%'}}>Estas son las acciones que podrás realizar aquí</Typography>
                    </Grid>
                </Grid>
                <Grid item style={{ flex: 1, backgroundColor: theme.palette.azul.color}}>
                    <Grid container justify="center">
                        <Grid item xs={12} sm={6} md={2} style={{display: 'flex', justifyContent: 'center'}}>
                            <Grid style={{width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <span>Texto 1</span>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2} style={{display: 'flex', justifyContent: 'center'}}>
                            <Grid style={{width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <span>Texto 1</span>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2} style={{display: 'flex', justifyContent: 'center'}}>
                            <Grid style={{width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <span>Texto 1</span>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2} style={{display: 'flex', justifyContent: 'center'}}>
                            <Grid style={{width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <span>Texto 1</span>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2} style={{display: 'flex', justifyContent: 'center'}}>
                            <Grid style={{width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <span>Texto 1</span>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> 
            </Grid>
        </div>
    );
}

export default Home;

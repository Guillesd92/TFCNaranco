
import React from 'react';
import NavBarra from '../Components/NavBarra';
import { Grid, Typography } from '@material-ui/core';
import theme from './../Components/theme';


const Home = () => {
    return (
        <div>
            <Grid container direction="column" style={{ minHeight: '100vh', backgroundColor: theme.palette.azulOscuro.color }}>
                <NavBarra />
                <Grid item style={{ backgroundColor: theme.palette.azulOscuro.color, padding:'1em'}}>
                    <h1 className='text-center' style={{ fontSize: '35px', padding:'0.7em' }}> ¡Bienvenido/a al panel de administrador !&#x1F44B;</h1>
                    <Grid style={{ display: 'flex', justifyContent: 'center'}}>
                        <Typography variant="h6" align="center" style={{  width: '60%'}}>Aquí encontrarás todas las herramientas y funcionalidades necesarias para  poder gestionar y controlar todos los aspectos clave de tu plataforma. </Typography>
                    </Grid>
                    <Grid style={{ display: 'flex', justifyContent: 'center', margin:'1em'}}>
                        <Typography variant="h6" align="center" style={{ width:'60%'}}>Estas son las acciones que podrás realizar aquí</Typography>
                    </Grid>
                </Grid>
                <Grid item style={{ flex: 1, backgroundColor: theme.palette.azul.color, display:'flex', alignItems: 'center' }}>
                    <Grid container style={{display:'flex', justifyContent: 'space-evenly',marginTop: '20px'}}>
                        <Grid item xs={12} sm={6} md={2} style={{display: 'flex', justifyContent: 'center',  marginBottom: window.innerWidth >= 600 ? '20px' : '0px'}}>
                            <Grid style={{width: '200px', height: '200px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <span align="center" className="text-center">Gestionar Usuarios</span>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2} style={{display: 'flex', justifyContent: 'center', marginBottom: window.innerWidth >= 600 ? '20px' : '0px' }}>
                            <Grid style={{width: '200px', height: '200px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <span align="center" className="text-center">Gestionar Grupos</span>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2} style={{display: 'flex', justifyContent: 'center', marginBottom: window.innerWidth >= 600 ? '20px' : '0px' }}>
                            <Grid style={{width: '200px', height: '200px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <span align="center" className="text-center">Gestionar Estudios</span>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2} style={{display: 'flex', justifyContent: 'center', marginBottom: window.innerWidth >= 600 ? '20px' : '0px' }}>
                            <Grid style={{width: '200px', height: '200px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <span align="center" className="text-center">Gestionar Alumnos</span>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2} style={{display: 'flex', justifyContent: 'center', marginBottom: window.innerWidth >= 600 ? '20px' : '0px' }}>
                            <Grid style={{width: '200px', height: '200px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <span align="center" className="text-center">Promocionar Alumnos</span>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> 
            </Grid>
        </div>
    );
}

export default Home;

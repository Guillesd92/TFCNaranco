import { Grid, Button } from '@material-ui/core';
import { Link, Head } from '@inertiajs/react';
import React, { useState} from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './../Components/theme';
import logo from './../Images/FctNaranco.jpg';
import LoginForm from './../Components/LoginForm';
import "./../../css/tipografia.css";
import "./../../css/menu.css";
const Welcome = () => {

    const [showLogin, setShowLogin] = useState(false); 
    const [infoButton, setInfoButton] = useState('contained');
    const [loginButton, setLoginButton] = useState('outlined');

  return (
    <ThemeProvider theme={theme}>
      
      <Grid container style={{minHeight: '100vh'}}>
        
        <Grid item xs={12} md={5} className="button-sm" style={{backgroundColor: theme.palette.azulOscuro.color, display: 'flex', justifyContent: 'center', alignItems: 'center',  flexDirection: 'column'}}>
            
        <img src={logo} alt="Descripción de la imagen"  />
           
            <Button variant="contained" color="primary"  ><a href="https://alojaweb.educastur.es/web/iesmontenaranco">Ir a la web </a></Button>
           
    
        </Grid>
        
       
        <Grid item xs={12} md={7} className='contenedor' style={{backgroundColor: theme.palette.azulClaro.color, display:'flex', justifyContent:'space-evenly',alignItems:'center', flexDirection:'column'}}>
            <Grid item style={{border: '2px solid black', backgroundColor: theme.palette.azul.color, width: '85%'}}>
                    <h1 className='text-center' style={{fontSize: '35px', padding:'1em'}}> ¡Bienvenido/a a FCT Naranco !&#x1F44B;</h1>
                </Grid>
        {showLogin ? (
            <LoginForm />
        ) : (
            <>
               

                <Grid item  style={{ width: '85%' ,border: '2px solid black', backgroundColor: theme.palette.azul.color, padding:'1em'}}>
                    <p className='text-center' >La plataforma de control para la Formación de alumnos en Centros de Trabajo del IES Monte Naranco.</p>
                    <p  className='text-center' style={{marginTop: '25px'}}>En nuestra plataforma, podrás gestionar la asignación de alumnos a empresas colaboradoras para realizar las FCT.</p>
                    <p  className='text-center' style={{marginTop: '25px'}}>Podras indicar la disponibilidad de su empresa para acoger alumnos, la cantidad de estudiantes que pueden recibir y agregar notas adicionales.</p>
                    <p  className='text-center' style={{marginTop: '25px'}}>¡Únete a nuestra web y mejora tu experiencia en la gestión de las FCT!</p>
                </Grid>
            </>
        )}
                    
              
            <Grid item style={{display:'flex', justifyContent:'center'}}>
                <Grid container spacing={3}>
                    <Grid item>
                        <Button variant={infoButton} color="primary" onClick={() => {
                            setLoginButton('outlined');
                            setInfoButton('contained');
                            setShowLogin(false);
                         }}>Info</Button>
                    </Grid>
                    <Grid item>
                        <Button variant={loginButton} color="primary" onClick={() => {
                            setLoginButton('contained');
                            setInfoButton('outlined');
                            setShowLogin(true);
                        }}>Login</Button>
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Welcome;
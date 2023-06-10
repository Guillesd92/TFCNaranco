import React from 'react';
import { Grid, Button, Typography, useMediaQuery } from '@material-ui/core';
import "./../../css/tipografia.css";
import "./../../css/navBar.css";
import theme from './../Components/theme';
import { useTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Route } from 'react-router-dom';
import { useState, useEffect} from 'react';



const NavBarUser = () => {

  const theme2 = useTheme();

  const isSmallScreen = useMediaQuery(theme2.breakpoints.down('sm'));

  const [showLogoutModal, setShowLogoutModal] = useState(false);


  const redirect = (route) => {
    window.location.replace(route);
  };

  return (
 
      <AppBar position="static" style={{backgroundColor: theme.palette.azul.color}}>
        <Toolbar style={{display:'flex', justifyContent:'space-between'}}>
          <Grid>
            <Button className="navbar-button" style={{ fontSize: isSmallScreen ? '8px' : '16px' }} onClick={() => redirect(route('tabla'))}>Convenio</Button>
            <Button className="navbar-button" style={{ fontSize: isSmallScreen ? '8px' : '16px'}} onClick={() => redirect(route('alumnosLista'))}>Alumnos</Button>
            <Button className="navbar-button" style={{ fontSize: isSmallScreen ? '8px' : '16px' }} onClick={() => redirect(route('empresas'))}>Empresas</Button>
            <Button className="navbar-button" style={{ fontSize: isSmallScreen ? '8px' : '16px' }} onClick={() => redirect(route('notas'))}>Notas</Button>
          </Grid>
          <Grid>
            <Button className="navbar-button" style={{ fontSize: isSmallScreen ? '8px' : '16px' }} onClick={() => setShowLogoutModal(true)}><FontAwesomeIcon icon={faArrowRightFromBracket} /></Button>
          </Grid>
        </Toolbar>
        {showLogoutModal && (
        <Grid container item xs={9} sm={6} md={4} lg={3} className="logout-modal"  style={{position: "fixed",top: "50%",left: "50%",transform: "translate(-50%, -50%)",backgroundColor: theme.palette.blanco.color,padding: "2em",border: "2px solid black",borderRadius: "5px",color: "#ffffff",zIndex: "9999"}}>
          <Grid item xs={12} style={{display:"flex",flexDirection:"column", justifyContent:"center",  alignItems: "center",}}>
            <Typography variant="h5"  style={{ color: 'black'}} align="center">¡Te has deslogueado!</Typography>
            <Button variant="contained" onClick={() => redirect(route('inicio'))} style={{backgroundColor: '#ff4d4d', color: 'white', width:"50%", marginTop:"1em"}}>Aceptar</Button>
          </Grid>
        </Grid>
        )}
      </AppBar>
  );
};

export default NavBarUser;







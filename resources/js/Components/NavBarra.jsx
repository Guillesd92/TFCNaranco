import React from 'react';
import { Grid, Button } from '@material-ui/core';
import "./../../css/tipografia.css";
import "./../../css/navBar.css";
import theme from './../Components/theme';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Route } from 'react-router-dom';
import { useState, useEffect} from 'react';


const NavBarra = () => {
  const redirect = (route) => {
    window.location.replace(route);
  };

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
 
      <AppBar position="static" style={{backgroundColor: theme.palette.azul.color}}>
        <Toolbar style={{display:'flex', justifyContent:'space-between'}}>
          <Grid>
            <Button className="navbar-button" onClick={() => redirect(route('home'))}>Home</Button>
            <Button className="navbar-button" onClick={() => redirect(route('usuarios'))}>Usuarios</Button>
            <Button className="navbar-button" onClick={() => redirect(route('grupos'))}>Grupos</Button>
            <Button className="navbar-button" onClick={() => redirect(route('estudios'))}>Estudios</Button>
            <Button className="navbar-button" onClick={() => redirect(route('alumnos'))}>Alumnos</Button>
            <Button className="navbar-button" onClick={() => redirect(route('moverGrupos'))}>Promocionar</Button>
          </Grid>
          <Grid>
            <Button className="navbar-button"  onClick={() => setShowLogoutModal(true)}><FontAwesomeIcon icon={faArrowRightFromBracket} /></Button>
          </Grid>
        </Toolbar>
        {showLogoutModal && (
        <Grid container item xs={9} sm={6} md={4} lg={3} className="logout-modal"  style={{position: "fixed",top: "50%",left: "50%",transform: "translate(-50%, -50%)",backgroundColor: theme.palette.blanco.color,padding: "2em",borderRadius: "5px", border: "2px solid black",zIndex: "9999"}}>
          <Grid item xs={12} style={{display:"flex",flexDirection:"column", justifyContent:"center",  alignItems: "center",}}>
            <Typography variant="h4"  style={{ color: 'black'}} align="center">¡Te has deslogueado!</Typography>
            <Button variant="contained" onClick={() => redirect(route('inicio'))} style={{backgroundColor: '#ff4d4d', color: 'white', width:"50%", marginTop:"1em"}}>Aceptar</Button>
          </Grid>
        </Grid>
        )}
      </AppBar>
  );
};

export default NavBarra;







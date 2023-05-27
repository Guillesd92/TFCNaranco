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



const NavBarra = () => {
  const redirect = (route) => {
    window.location.replace(route);
  };

  return (
 
      <AppBar position="static" style={{backgroundColor: theme.palette.azul.color}}>
        <Toolbar style={{display:'flex', justifyContent:'space-between'}}>
          <Grid>
            <Button className="navbar-button" onClick={() => redirect(route('home'))}>Home</Button>
            <Button className="navbar-button" onClick={() => redirect(route('usuarios'))}>Usuarios</Button>
            <Button className="navbar-button" onClick={() => redirect(route('grupos'))}>Grupos</Button>
            <Button className="navbar-button" onClick={() => redirect(route('estudios'))}>Estudios</Button>
            <Button className="navbar-button" onClick={() => redirect(route('alumnos'))}>Alumnos</Button>
            <Button className="navbar-button" onClick={() => redirect(route('moverGrupos'))}>Mover Alumnos</Button>
          </Grid>
          <Grid>
            <Button className="navbar-button"  onClick={() => redirect(route('inicio'))}><FontAwesomeIcon icon={faArrowRightFromBracket} /></Button>
          </Grid>
        </Toolbar>
      </AppBar>
  );
};

export default NavBarra;







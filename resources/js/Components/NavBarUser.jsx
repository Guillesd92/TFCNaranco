import React from 'react';
import { Grid, Button } from '@material-ui/core';
import "./../../css/tipografia.css";
import theme from './../Components/theme';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Route } from 'react-router-dom';



const NavBarUser = () => {
  const redirect = (route) => {
    window.location.replace(route);
  };

  return (
 
      <AppBar position="static" style={{backgroundColor: theme.palette.azul.color}}>
        <Toolbar style={{display:'flex', justifyContent:'space-between'}}>
          <Grid>
            <Button onClick={() => redirect(route('tabla'))}>Lista</Button>
            <Button onClick={() => redirect(route('alumnosLista'))}>Alumnos</Button>
            <Button onClick={() => redirect(route('empresas'))}>Empresas</Button>
            <Button onClick={() => redirect(route('notas'))}>Notas</Button>
          </Grid>
          <Grid>
            <Button  onClick={() => redirect(route('inicio'))}><FontAwesomeIcon icon={faArrowRightFromBracket} /></Button>
          </Grid>
        </Toolbar>
      </AppBar>
  );
};

export default NavBarUser;







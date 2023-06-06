import React from 'react';
import { Grid, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import theme from './../Components/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation  } from '@fortawesome/free-solid-svg-icons';

const Error = () => {

    const handleVolverInicio = () => {
        window.location.replace(route('inicio'));
    };
    
    return (
        <div>
            <Grid style={{ minHeight: '100vh', backgroundColor: theme.palette.azulOscuro.color , display:'flex', justifyContent:'center', alignItems:'center', paddingTop:'3em', paddingBottom:'3em'}}>
               <Grid  style={{  display:'flex', justifyContent:'center', flexDirection:'column'}}>
                    <FontAwesomeIcon  icon={faCircleExclamation} style={{ fontSize: '5em', color: 'white', marginBottom:"16px" }} />
                    <Typography variant="h5" align="center" style={{marginBottom:"1em", color:'white'}}>No tienes permisos para acceder aquí</Typography>
                    <Grid  style={{  display:'flex', justifyContent:'center'}}>
                        <Button style={{width:"50%"}}  variant="contained" color="primary" onClick={handleVolverInicio}>Volver al inicio</Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Error;
import React from 'react';
import NavBarra from '../Components/NavBarra';
import { Grid } from '@material-ui/core';
import theme from './../Components/theme';

const Estudios = () => {
    return (
        <div>
            <Grid style={{minHeight: '100vh', backgroundColor: theme.palette.azulOscuro.color }}>
            <NavBarra />
                
            </Grid>
        </div>
    );
}

export default Estudios;
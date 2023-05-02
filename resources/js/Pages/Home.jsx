
import React from 'react';
import NavBarra from '../Components/NavBarra';
import { Grid } from '@material-ui/core';
import theme from './../Components/theme';

const Home = () => {
    return (
        <div>
            <Grid container direction="column" style={{ minHeight: '100vh', backgroundColor: theme.palette.azulOscuro.color }}>
                <NavBarra />
                <Grid item style={{ backgroundColor: theme.palette.azulOscuro.color }}>
                    <h1 className='text-center' style={{ fontSize: '35px', padding: '1em' }}> ¡Bienvenido/a al panel de administrador !&#x1F44B;</h1>
                </Grid>
                <Grid item container style={{ display: 'flex', flexDirection: 'row', flex: '1' }}>
                    <Grid item style={{ border: '2px solid black', backgroundColor: theme.palette.azul.color, width: '50%' }}>
                        <h1 className='text-center' style={{ fontSize: '35px', padding: '1em' }}>Paso 1 </h1>
                        <p className='text-center'>Crea los prefesores necesarios para el funcionamiento de la web</p>
                    </Grid>
                    <Grid item style={{ border: '2px solid black', backgroundColor: theme.palette.azul.color, width: '50%' }}>
                        <h1 className='text-center' style={{ fontSize: '35px', padding: '1em' }}>Paso 2</h1>
                        <p className='text-center'>Crea los estudios necesarios para los diferentes cursos del centro</p>
                    </Grid>
                </Grid>
                <Grid item container style={{ display: 'flex', flexDirection: 'row', flex: '1' }}>
                    <Grid item style={{ border: '2px solid black', backgroundColor: theme.palette.azul.color, width: '50%' }}>
                        <h1 className='text-center' style={{ fontSize: '35px', padding: '1em' }}>Paso 3</h1>
                        <p className='text-center'>Ahora disponte a crear los grupos los cuales cursen los estudios previamente creados</p>
                    </Grid>
                    <Grid item style={{ border: '2px solid black', backgroundColor: theme.palette.azul.color, width: '50%' }}>
                        <h1 className='text-center' style={{ fontSize: '35px', padding: '1em' }}>Paso 4</h1>
                        <p className='text-center'>Para acabar puedes crear alumnos y asociarlos a los grupos creados, tambien puedes importarlos con un archivo CSV</p>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;
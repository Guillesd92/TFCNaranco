import { Grid, Button } from '@material-ui/core';
import { Link, Head } from '@inertiajs/react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './../Components/theme';
import logo from './../Images/FctNaranco.jpg';
import "./../../css/tipografia.css";
const Welcome = () => {
  return (
    <ThemeProvider theme={theme}>
      
      <Grid container style={{minHeight: '100vh'}}>
        
        <Grid item xs={5}  style={{backgroundColor: theme.palette.azulOscuro.color, display: 'flex', justifyContent: 'center', alignItems: 'center',  flexDirection: 'column'}}>
            
            <img src={logo} alt="Descripción de la imagen" />
            
            <Button variant="contained" color="primary"  style={{marginTop: '20px'}}>Ir a la web</Button>
        </Grid>
        
       
        <Grid item xs={7} style={{backgroundColor: theme.palette.azulClaro.color, display:'flex', justifyContent:'space-evenly',alignItems:'center', flexDirection:'column'}}>
                <Grid item style={{border: '2px solid black', backgroundColor: theme.palette.azul.color, width: '85%'}}>
                    <h1 className='text-center' style={{fontSize: '35px', padding:'1em'}}> ¡Bienvenido/a a FCT Naranco !&#x1F44B;</h1>
                </Grid>

                <Grid item  style={{ width: '85%' ,border: '2px solid black', backgroundColor: theme.palette.azul.color, padding:'1em'}}>
                    <p className='text-center' >La plataforma de control para la Formación de alumnos en Centros de Trabajo del IES Monte Naranco.</p>
                    <p  className='text-center' style={{marginTop: '25px'}}>En nuestra plataforma, podrás gestionar la asignación de alumnos a empresas colaboradoras para realizar las FCT.</p>
                    <p  className='text-center' style={{marginTop: '25px'}}>Podras indicar la disponibilidad de su empresa para acoger alumnos, la cantidad de estudiantes que pueden recibir y agregar notas adicionales.</p>
                    <p  className='text-center' style={{marginTop: '25px'}}>¡Únete a nuestra web y mejora tu experiencia en la gestión de las FCT!</p>
                </Grid>
               
                    
              
                <Grid item style={{display:'flex', justifyContent:'center'}}>
                    <Grid container spacing={3}>
                        <Grid item>
                            <Button variant="outlined" color="primary">Login</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="primary">Register</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Welcome;
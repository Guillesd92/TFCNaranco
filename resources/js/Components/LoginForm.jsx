import React, { useState } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import theme from './../Components/theme';


import { Alert } from '@material-ui/lab'


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  

  const handleEmailChange = (event) => {
    setEmail( event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
   
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password}),
      });
      

      const data = await response.json();
      
      if (response.ok) {
        if (data.isAdmin) {
          window.location.replace(route('home'));
        }else{
          window.location.replace(route('tabla'));
        }
        
      } else {
        setError('Correo electrónico o contraseña incorrectos');
        document.getElementById('error').style.display = 'block';

        setTimeout(() => {
          document.getElementById('error').style.display = 'none';
        }, 5000);
      }
    } catch (error) {
      console.log('Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.')
    }
  };

  return (
    
    <Grid container style={{border: '2px solid black', backgroundColor: theme.palette.azul.color, width: '55%'}} spacing={8}>
      <Grid item xs={12}>
        <TextField
          label="Correo electrónico"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          style={{color: 'black'}}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Contraseña"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
          style={{color: 'black'}}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Button  variant="contained" color="primary" onClick={handleSubmit}>Aceptar</Button>
        </Grid>
        <Alert id="error" severity="error" style={{display:'none', marginTop:'10px'}}>
            {error}
          </Alert>
      </Grid>
    </Grid>
   
  );
};

export default LoginForm;
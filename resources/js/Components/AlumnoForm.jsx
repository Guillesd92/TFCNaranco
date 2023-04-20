import { useState, useEffect, useRef} from 'react';
import { TextField, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const AlumnoForm = () => {

  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [alerta, setAlerta] = useState('');
  

  const handleSubmit =async (e) => {
    e.preventDefault();
    
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('apellidos', apellidos);
      formData.append('email', email);
      formData.append('password', password);
      
      try {
        const response = await fetch('http://127.0.0.1:8000/api/profesores', {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          setSeveriti('success');
          setAlerta('Alumno creado corectamente');
          document.getElementById('alerta').style.display = 'block';

          setTimeout(() => {
            document.getElementById('alerta').style.display = 'none';
            setNombre('');
            setApellidos('');
            setTelefono('');
            setLocalidad('');
            setDireccion('');
          }, 3000);

          

        } else {
          setSeveriti('error');
          setAlerta('No se ha podido crear al usuario');
          document.getElementById('alerta').style.display = 'block';

          setTimeout(() => {
            document.getElementById('alerta').style.display = 'none';
          }, 3000);
        }
      } catch (error) {
        console.error('Error:', error);
      }

  };

  return (
    <form onSubmit={handleSubmit} >
      
      <TextField 
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Apellidos"
        value={apellidos}
        onChange={(e) => setApellidos(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Contraseña"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Localidad"
        value={localidad}
        onChange={(e) => setLocalidad(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Direccion"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Alert id="alerta" severity={severiti} style={{display:'none', marginTop:'10px'}}>{alerta}</Alert>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{marginTop:'20px'}}
      >
        Crear Alumno
      </Button>
    </form>
  );
};

export default AlumnoForm;
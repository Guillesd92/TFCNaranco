import { useState, useEffect, useRef} from 'react';
import { TextField, Button, Select, MenuItem, InputLabel } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import "./../../css/tipografia.css";

const EstudioForm = () => {

  const [nombre, setNombre] = useState('');

  
  const [severity, setSeverity] = useState('error');
  const [alerta, setAlerta] = useState('');
  

  const handleSubmit =async (e) => {
    e.preventDefault();
  
      const formData = new FormData();
      formData.append('nombre', nombre);
     
      
      try {
        const response = await fetch('http://127.0.0.1:8000/api/estudios', {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          setSeverity('success');
          setAlerta('Grupo creado corectamente');
          document.getElementById('alerta').style.display = 'block';

          setTimeout(() => {
            document.getElementById('alerta').style.display = 'none';
            setNombre('');
          }, 3000);

          

        } else {
          setSeverity('error');
          setAlerta('No se ha podido crear el Grupo');
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
<form onSubmit={handleSubmit}>
  
    <TextField
      label="Nombre"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      fullWidth
      margin="normal"
      required
      style={{ marginRight: '20px' }}
    />
  <Alert id="alerta" severity={severity} style={{display:'none', marginTop:'10px'}}>{alerta}</Alert>
  <Button
    variant="contained"
    color="primary"
    type="submit"
    style={{ marginTop: '20px' }}
  >
    Crear Estudio
  </Button>
</form>
  );
};

export default EstudioForm;
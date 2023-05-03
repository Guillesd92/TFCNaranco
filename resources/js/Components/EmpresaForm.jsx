import { useState, useEffect, useRef} from 'react';
import { TextField, Button, Select, MenuItem, InputLabel } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const EmpresaForm = () => {

  const [cif, setCIF] = useState('');
  const [convenio, setConvenio] = useState('');
  const [nombre, setNombre] = useState(''); 
  const [direccion, setDireccion] = useState(''); 
  const [telefono, setTelefono] = useState(''); 
  const [tutor, setTutor] = useState(''); 
  
  const [severity, setSeverity] = useState('error');
  const [alerta, setAlerta] = useState('');

  

  const handleSubmit =async (e) => {
    e.preventDefault();
  
      const formData = new FormData();
      formData.append('cif', cif);
      formData.append('convenio', convenio);
      formData.append('nombre', nombre);
      formData.append('direccion', direccion);
      formData.append('telefono', telefono);
      formData.append('tutor', tutor);
     
      
      try {
        const response = await fetch('http://127.0.0.1:8000/api/empresas', {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          setSeverity('success');
          setAlerta('Empresa creado corectamente');
          document.getElementById('alerta').style.display = 'block';

          setTimeout(() => {
            document.getElementById('alerta').style.display = 'none';
            setCIF('');
            setConvenio('');
            setNombre('');
            setDireccion('');
            setTelefono('');
            setTutor('');
          }, 3000);

          

        } else {
          setSeverity('error');
          setAlerta('No se ha podido crear la empresa');
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
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <TextField
      label="CIF"
      value={cif}
      type="number"
      onChange={(e) => setCIF(e.target.value)}
      fullWidth
      margin="normal"
      required
      style={{ marginRight: '20px' }}
    />
    <TextField
      label="Convenio"
      value={convenio}
      onChange={(e) => setConvenio(e.target.value)}
      fullWidth
      margin="normal"
      required
      style={{ marginRight: '20px' }}
    />
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
  <TextField
      label="Nombre"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      fullWidth
      margin="normal"
      required
      style={{ marginRight: '20px' }}
    />
    <TextField
      label="Telefono"
      value={telefono}
      onChange={(e) => setTelefono(e.target.value)}
      fullWidth
      margin="normal"
      required
      style={{ marginRight: '20px' }}
    />
    <TextField
      label="Tutor"
      value={tutor}
      onChange={(e) => setTutor(e.target.value)}
      fullWidth
      margin="normal"
      required
      style={{ marginRight: '20px' }}
    />
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
  <TextField
      label="Direccion"
      value={direccion}
      onChange={(e) => setDireccion(e.target.value)}
      fullWidth
      margin="normal"
      required
      style={{ marginRight: '20px' }}
    />
    </div>
  <Alert id="alerta" severity={severity} style={{display:'none', marginTop:'10px'}}>{alerta}</Alert>
  <Button
    variant="contained"
    color="primary"
    type="submit"
    style={{ marginTop: '20px' }}
  >
    Crear empresa
  </Button>
</form>
  );
};

export default EmpresaForm;
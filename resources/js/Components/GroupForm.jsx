import { useState, useEffect, useRef} from 'react';
import { TextField, Button, Select, MenuItem, InputLabel } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const GroupForm = () => {

  const [aula, setAula] = useState('');
  const [curso, setCurso] = useState('');

  const [estudio, setEstudio] = useState(''); 
  const [estudios, setEstudios] = useState([]);
  
  const [severity, setSeverity] = useState('error');
  const [alerta, setAlerta] = useState('');



  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/estudios')
      .then(response => response.json())
      .then(data => {
        setEstudios(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  

  const handleSubmit =async (e) => {
    e.preventDefault();
  
      const formData = new FormData();
      formData.append('aula', aula);
      formData.append('curso', curso);
      formData.append('id_Estudio', estudio);
     
      
      try {
        const response = await fetch('http://127.0.0.1:8000/api/grupos', {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          setSeverity('success');
          setAlerta('Grupo creado corectamente');
          document.getElementById('alerta').style.display = 'block';

          setTimeout(() => {
            document.getElementById('alerta').style.display = 'none';
            setAula('');
            setCurso('');
          }, 3000);

          

        } else {
          setSeverity('error');
          setAlerta('No se ha podido crear al Grupo');
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
      label="Aula"
      value={aula}
      type="number"
      onChange={(e) => setAula(e.target.value)}
      fullWidth
      margin="normal"
      required
      style={{ marginRight: '20px' }}
    />
    <InputLabel htmlFor="curso">Curso: </InputLabel>
    <Select
      id="curso"
      value={curso}
      onChange={(e) => setCurso(e.target.value)}
      fullWidth
      margin="normal"
      required
      style={{ height: '56px' }}
    >
      <MenuItem value={1}>Primero</MenuItem>
      <MenuItem value={2}>Segundo</MenuItem>
    </Select>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
  <InputLabel htmlFor="estudio">Estudio: </InputLabel>
  <Select
    id="estudio"
    value={estudio}
    onChange={(e) => setEstudio(e.target.value)}
    fullWidth
    margin="normal"
    required
    style={{ height: '56px', marginLeft: '10px' }}
  >
    {estudios.map((estudio) => (
      <MenuItem key={estudio.Id_Estudio} value={estudio.Id_Estudio}>
        {estudio.Nombre}
      </MenuItem>
    ))}
  </Select>
</div>
  <Alert id="alerta" severity={severity} style={{display:'none', marginTop:'10px'}}>{alerta}</Alert>
  <Button
    variant="contained"
    color="primary"
    type="submit"
    style={{ marginTop: '20px' }}
  >
    Crear usuario
  </Button>
</form>
  );
};

export default GroupForm;
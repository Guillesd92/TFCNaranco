import { useState, useEffect, useRef} from 'react';
import { TextField, Button, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const AlumnoForm = () => {

  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [alerta, setAlerta] = useState('');
  const [severiti, setSeveriti] = useState('error');
  const [grupo, setGrupo] = useState(''); 
  const [grupos, setGrupos] = useState([]);
  const [estudios, setEstudios] = useState([]);


  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/grupos')
      .then(response => response.json())
      .then(data => {
        setGrupos(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

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

  function getNombreEstudio(idEstudio) {
    for (let i = 0; i < estudios.length; i++) {
      if (estudios[i].Id_Estudio === idEstudio) {
        return estudios[i].Nombre;
      }
    }
    return '';
    
  }
  

  const handleSubmit =async (e) => {
    e.preventDefault();
    
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('apellidos', apellidos);
      formData.append('email', email);
      formData.append('telefono', telefono);
      formData.append('localidad', localidad);
      formData.append('direccion', direccion);
      formData.append('id_grupo', grupo);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/alumnos', {
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
            setEmail('');
            setTelefono('');
            setLocalidad('');
            setDireccion('');
            setGrupo('');
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
      <div style={{ display: 'flex', alignItems: 'center' }}>
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
        label="Apellidos"
        value={apellidos}
        onChange={(e) => setApellidos(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      </div>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        required
       
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
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
        label="Localidad"
        value={localidad}
        onChange={(e) => setLocalidad(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      </div>
      <TextField
        label="Direccion"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
      <InputLabel htmlFor="estudio">Estudio: </InputLabel>
      <Select
        id="grupo"
        value={grupo}
        onChange={(e) => setGrupo(e.target.value)}
        fullWidth
        margin="normal"
        required
        style={{ height: '56px', marginLeft: '10px' }}
      >
        {grupos.map((grupo) => (
          <MenuItem key={grupo.Id_Grupo} value={grupo.Id_Grupo}>
            {grupo.Curso+" "+getNombreEstudio(grupo.Id_Estudio)}
          </MenuItem>
        ))}
      </Select>
      </div>
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
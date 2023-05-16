import { useState, useEffect, useRef} from 'react';
import { TextField, Button, Select, MenuItem, InputLabel } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const UserForm = () => {

  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [grupo, setGrupo] = useState(''); 
  const [grupos, setGrupos] = useState([]);
  const [estudio, setEstudio] = useState(''); 
  const [estudios, setEstudios] = useState([]);
  const [severiti, setSeveriti] = useState('');
  const [alerta, setAlerta] = useState('');


  useEffect(() => {
    fetchGrupos();
    fetchEstudios();
  }, []);

  const fetchGrupos = async() => {
    fetch('http://127.0.0.1:8000/api/grupos')
      .then(response => response.json())
      .then(data => {
        setGrupos(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
   
  }

  const fetchEstudios = async() =>{
    fetch('http://127.0.0.1:8000/api/estudios')
    .then(response => response.json())
    .then(data => {
      setEstudios(data);
    })
    .catch(error => {
      console.error('Error:', error);
  });
   
  }

  

  const devolverEstudio = (id_estudio) => {
    const estudio = estudios.find((estudio) => estudio.Id_Estudio === id_estudio);
    return estudio ? estudio.Nombre : '';
  };
  

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (password === confirmarPassword) {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('apellidos', apellidos);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('grupo', grupo);
      
      try {
        const response = await fetch('http://127.0.0.1:8000/api/profesores', {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          setSeveriti('success');
          setAlerta('Usuario creado corectamente');
          document.getElementById('alerta').style.display = 'block';

          setTimeout(() => {
            document.getElementById('alerta').style.display = 'none';
            setNombre('');
            setApellidos('');
            setEmail('');
            setPassword('');
            setConfirmarPassword('');
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

    } else {
      setSeveriti('error');
      setAlerta('Las contraseñas no coinciden');
      document.getElementById('alerta').style.display = 'block';

      setTimeout(() => {
        document.getElementById('alerta').style.display = 'none';
      }, 3000);

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
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
        style={{ marginRight: '20px' }}
      />
      <TextField
        label="Confirmar contraseña"
        type="password"
        value={confirmarPassword}
        onChange={(e) => setConfirmarPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <InputLabel htmlFor="grupo">Grupo: </InputLabel>
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
              {grupo.Curso} {devolverEstudio(grupo.Id_Estudio)}
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
        Crear usuario
      </Button>
    </form>
  );
};

export default UserForm;
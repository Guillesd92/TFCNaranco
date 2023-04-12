import { useState, useEffect, useRef} from 'react';
import { TextField, Button } from '@material-ui/core';

const UserForm = () => {

  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (password === confirmarPassword) {
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
          alert('Usuario creado correctamente');
        } else {
          alert('Error al crear usuario');
        }
      } catch (error) {
        console.error('Error:', error);
      }

    } else {
      alert('Las contraseñas no coinciden');
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
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
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
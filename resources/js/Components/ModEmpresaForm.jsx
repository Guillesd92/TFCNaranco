import { useState, useEffect, useRef} from 'react';
import { TextField, Button, Select, MenuItem, InputLabel } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const ModEmpresaForm = ({ CIF, setShowMod}) => {

  const [cifActual, setCifActual] = useState(CIF);
  const [empresa, setEmpresa] = useState([]);
  const [cif, setCIF] = useState('');
  const [convenio, setConvenio] = useState('');
  const [nombre, setNombre] = useState(''); 
  const [direccion, setDireccion] = useState(''); 
  const [telefono, setTelefono] = useState(''); 
  const [tutor, setTutor] = useState(''); 
  
  const [severity, setSeverity] = useState('error');
  const [alerta, setAlerta] = useState('');

  const handleVolver = () => {
    setShowMod(false);
  };

  const fetchEmpresasActual = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/empresa/${CIF}`);
    const data = await response.json();
    setEmpresa(data);
    setCIF(empresa.CIF);
    setConvenio(empresa.Convenio)
  };

  useEffect(() => {
    fetchEmpresasActual();
  }, []);

  useEffect(() => {
    if (empresa) {
      setCIF(empresa.CIF);
      setConvenio(empresa.Convenio);
      setNombre(empresa.Nombre);
      setDireccion(empresa.Direccion);
      setTelefono(empresa.Telefono);
      setTutor(empresa.Tutor);
    }
  }, [empresa]);

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
        const response = await fetch(`http://127.0.0.1:8000/api/empresa/${CIF}`, {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          setSeverity('success');
          setAlerta('Se ha modificado la empresa correctamente');
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
          setAlerta('No se ha podido modificar la empresa');
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
      type="number"
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
  <div style={{ display: 'flex', alignItems: 'center',justifyContent:'space-evenly', marginTop: '20px' }}>
  <Button
    variant="contained"
    color="primary"
    type="submit"
    style={{ marginTop: '20px' }}
  >
    Guardar cambios
  </Button>
  <Button
    variant="contained"
    color="primary"
    style={{ marginTop: '20px' }}
    onClick={() => handleVolver()}
  >
    Volver
  </Button>
  </div>
</form>
  );
};

export default ModEmpresaForm;
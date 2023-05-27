import React from 'react';
import NavBarUser from '../Components/NavBarUser';
import { Grid, TextField, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import theme from './../Components/theme';
import { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import AlumnoForm from './../Components/AlumnoForm';
import { Alert } from '@material-ui/lab';

const Tabla = () => {

  const [empresas, setEmpresas] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [alumnosSinCIF, setAlumnosSinCIF] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showFormDelete, setShowFormDelete] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [cifEmpresaSeleccionada, setCifEmpresaSeleccionada] = useState(null);
  const [empresaDetalles, setEmpresaDetalles] = useState(null);
  const [alumnoSeleccionadoId, setAlumnoSeleccionadoId] = useState('');
  const [alumnosSeleccionados, setAlumnosSeleccionados] = useState([]);
  const [filtroCIF, setFiltroCIF] = useState('');
  const [filtroConvenio, setFiltroConvenio] = useState('');
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroDireccion, setFiltroDireccion] = useState('');


  const fetchEmpresas = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/empresas');
    const data = await response.json();
    setEmpresas(data);
  };

  const fetchEmpresasFiltro = async () => {
    const formData = new FormData();
    formData.append('filtroCIF', filtroCIF);
    formData.append('filtroConvenio', filtroConvenio);
    formData.append('filtroNombre', filtroNombre);
    formData.append('filtroDireccion', filtroDireccion);

    const response = await fetch('http://127.0.0.1:8000/api/empresasFiltro', {
      method: 'POST',
      body: formData
      
    });
    const data = await response.json();
    setEmpresas(data);
  };

  const fetchAlumnos = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/alumnos');
    const data = await response.json();
    setAlumnos(data);

    const alumnosSinCIF = data.filter(alumno => !alumno.CIF);
    setAlumnosSinCIF(alumnosSinCIF);
  };



  useEffect(() => {
    fetchEmpresas();
    fetchAlumnos();
  }, []);

  const handleOpen = async (empresa, accion) => { 
    setCifEmpresaSeleccionada(empresa.CIF);
    if (accion == 'asignar') {
      setShowForm(true);
    } else if (accion == 'borrar') {
      setShowFormDelete(true);
    } else {
      setEmpresaDetalles(empresa);
      setShowDetails(true);
    }
  };

  const eliminarCIF =  async () => { 
    console.log(alumnosSeleccionados);
    try{
    fetch(`http://127.0.0.1:8000/api/alumnosBorrarCIF/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids: alumnosSeleccionados })
    });
   
    await fetchAlumnos();
    setShowFormDelete(false);
    
    
    
    }catch(error)  {
      console.error('Error:', error);
    };
    
    await fetchAlumnos();
    setShowFormDelete(false);
  }
  
  const handleAsignarAlumno = async () => { 
    const formData = new FormData();

    formData.append('id', alumnoSeleccionadoId);
    formData.append('cif', cifEmpresaSeleccionada);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/alumno/`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setShowForm(false);
      fetchAlumnos();
      

    } catch (error) {
      console.error('Error:', error);
    }

  

  };

  const devolverAlumnos = (CIF) => {
    const alumnosConMismoCIF = alumnos.filter(alumno => alumno.CIF == CIF);
    
    return alumnosConMismoCIF.map(alumno => (
      <p key={alumno.id}>
        {alumno.Nombre} {alumno.Apellidos}
        <br />
      </p>
    ));
  }

  const devolverAlumnosConCheckbox = (CIF) => {
    const alumnosConMismoCIF = alumnos.filter(alumno => alumno.CIF === CIF);
    
    return alumnosConMismoCIF.map(alumno => (
      <div key={alumno.Id_Alumno}>
        <label>
          <input
            type="checkbox"
            value={alumno.id}
            onChange={() => handleAlumnoCheckbox(alumno.Id_Alumno)}
          />
          {alumno.Nombre} {alumno.Apellidos}
        </label>
      </div>
    ));

  }

  const handleAlumnoCheckbox = (idAlumno) => {

    const newAlumnosSeleccionados = [...alumnosSeleccionados];
    const index = newAlumnosSeleccionados.indexOf(idAlumno);
    
    if (index > -1) {
      newAlumnosSeleccionados.splice(index, 1);
    } else {
      newAlumnosSeleccionados.push(idAlumno);
    }
    
    setAlumnosSeleccionados(newAlumnosSeleccionados);
  };



  
  const handleInputBlur = () => {
    fetchEmpresasFiltro();
  };

  const Restablecer = () => {
    setFiltroCIF("");
    setFiltroConvenio("");
    setFiltroNombre("");
    setFiltroDireccion("");

   
    fetchEmpresas();
    
  };



    return (
        <div>
        <Grid style={{ minHeight: '100vh', backgroundColor: theme.palette.azulOscuro.color }}>
          <NavBarUser/>
            <Grid style={{display:'flex', justifyContent:'center', paddingTop:'3em', paddingBottom:'3em'}}>
              <Grid item xs={11} style={{backgroundColor: theme.palette.azul.color, padding:'2em', border:'2px solid', borderRadius: '10px', borderColor:theme.palette.celeste.color}}>
               
                <Grid container  style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: theme.palette.celeste.color, padding:'2em', border:'1px solid', borderRadius: '10px', borderColor:theme.palette.blanco.color, marginBottom:'2em'}}>
                  <Grid item xs={12} sm={6} md={2} style={{display:'flex', justifyContent:'center'}}>
                    <TextField
                      label="CIF"
                      value={filtroCIF}
                      onChange={(e) => setFiltroCIF(e.target.value)}
                      variant="outlined"
                      style={{ width: '90%' , marginBottom: '10px'}}
                    />
                  </Grid>  
                  <Grid item xs={12} sm={6} md={2} style={{display:'flex', justifyContent:'center'}}>
                    <TextField
                      label="Convenio"
                      value={filtroConvenio}
                      onChange={(e) => setFiltroConvenio(e.target.value)}               
                      variant="outlined"
                      style={{ width: '90%',  marginBottom: '10px'}}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} style={{display:'flex', justifyContent:'center'}}>
                    <TextField
                      label="Nombre"
                      value={filtroNombre}
                      onChange={(e) => setFiltroNombre(e.target.value)}       
                      variant="outlined"
                      style={{ width: '90%',  marginBottom: '10px' }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={3} style={{display:'flex', justifyContent:'center'}}>
                    <TextField
                      label="Direccion"
                      value={filtroDireccion}
                      onChange={(e) => setFiltroDireccion(e.target.value)}             
                      variant="outlined"
                      style={{ width: '90%',  marginBottom: '20px' }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={2} style={{display:'flex', alignItems:'center',  justifyContent:'center'}}>
                  <Button variant="contained" color="primary" onClick={fetchEmpresasFiltro}>
                  <FontAwesomeIcon icon={faSearch} />
                    </Button>
                    <Button variant="contained" color="primary" onClick={Restablecer}>
                    <FontAwesomeIcon icon={faSync} />
                    </Button>
                  </Grid>
                </Grid>
                
                <Grid>
                  <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            
                            <TableCell>Alumnos</TableCell>
                            <TableCell>Asignar</TableCell>
                            <TableCell>Detalles</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {empresas.map((empresa) => (
                            <TableRow key={empresa.CIF}>
                              <TableCell>{empresa.Nombre}</TableCell>
    
                              <TableCell>{devolverAlumnos(empresa.CIF)}</TableCell>
                              <TableCell>
                                <Button  variant="contained" color="primary"   onClick={() => handleOpen(empresa, 'asignar')}><FontAwesomeIcon icon={faPlus} /></Button>
                                <Button variant="contained" style={{backgroundColor: '#ff4d4d', color: 'white', marginRight: '15px'}} onClick={() => handleOpen(empresa, 'borrar')}><FontAwesomeIcon icon={faTrash} /></Button>
                              </TableCell>
                              <TableCell>
                                <Button  variant="contained" color="primary"   onClick={() => handleOpen(empresa, 'detalles')}>Ver más</Button>
                                
                              </TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </Grid>
            {showForm && (
              <Grid container item xs={6} className="overlay" style={{backgroundColor: theme.palette.azulClaro.color, padding:'2em', border:'2px solid', borderRadius: '10px', borderColor:theme.palette.celeste.color,  position: "fixed",top: "50%",left: "50%",transform: "translate(-50%, -50%)"}}>
                            
                <Grid item xs={12}>
                <Autocomplete
                  options={alumnosSinCIF} 
                  getOptionLabel={(opcion) => `${opcion.Nombre} ${opcion.Apellidos}`}
                  onChange={(event, opcion) => setAlumnoSeleccionadoId(opcion.Id_Alumno)}
                  renderInput={(params) => <TextField {...params} label="Buscar" variant="outlined" />} 
                />
                </Grid>
                <Grid item xs={12} style={{display:'flex', justifyContent:'space-evenly', marginTop: '3em'}}>
                  <Button variant="contained" color="primary" onClick={() => handleAsignarAlumno()}>Aceptar</Button>
                  <Button variant="contained" color="primary"  onClick={() => setShowForm(false)}>Volver</Button>
                </Grid>
              </Grid>
            )}
            {showFormDelete && (
              <Grid container item xs={6} className="overlay" style={{backgroundColor: theme.palette.azulClaro.color, padding:'2em', border:'2px solid', borderRadius: '10px', borderColor:theme.palette.celeste.color,  position: "fixed",top: "50%",left: "50%",transform: "translate(-50%, -50%)" }}>
                            
                <Grid item xs={12}>
                  {devolverAlumnosConCheckbox(cifEmpresaSeleccionada)}
                
                </Grid>
                
                <Grid item xs={12} style={{display:'flex', justifyContent:'space-evenly', marginTop: '3em'}}>
                  <Button variant="contained" color="primary" onClick={() => eliminarCIF()}>Aceptar</Button>
                  <Button variant="contained" color="primary"  onClick={() =>  setShowFormDelete(false)}>Volver</Button>
                </Grid>
              </Grid>
            )}
            {showDetails && (
              <Grid container item xs={10} sm={8} className="overlay" style={{backgroundColor: theme.palette.azulClaro.color, padding:'2em', border:'2px solid', borderRadius: '10px', borderColor:theme.palette.celeste.color,  position: "fixed",top: "50%",left: "50%",transform: "translate(-50%, -50%)",zIndex: 9999 }}>
                            
                <Grid item xs={12}>

                  <Grid container direction="row" style={{ backgroundColor: theme.palette.azul.color, border: '2px solid', borderRadius: '10px', borderColor: theme.palette.celeste.color }}>
                      
                      <Grid item xs={12} style={{ marginTop:'15px', marginBottom:'15px' }}>
                        <Typography variant="h5" align="center" style={{ textDecoration: 'underline' }}>Datos de la empresa</Typography>
                      </Grid>
                   
                      <Grid item xs={12} md={6} style={{ marginBottom:'15px' }}>
                        <Typography variant="h6" align="center" style={{ color:  theme.palette.blanco.color}}>Nombre</Typography>
                        <Typography variant="h6" align="center" >{empresaDetalles.Nombre}</Typography>
                      </Grid>
                    
                      <Grid item xs={12} md={6} style={{ marginBottom:'15px' }}>
                          <Typography variant="h6" align="center" style={{ color:  theme.palette.blanco.color}}>CIF</Typography>
                          <Typography variant="h6" align="center">{empresaDetalles.CIF}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6} style={{ marginBottom:'15px' }}>
                          <Typography variant="h6" align="center" style={{ color:  theme.palette.blanco.color}}>Convenio</Typography>
                          <Typography variant="h6" align="center">{empresaDetalles.Convenio}</Typography>
                      </Grid>

                      
                      <Grid item xs={12} md={6} style={{ marginBottom:'15px' }}>
                          <Typography variant="h6" align="center" style={{ color:  theme.palette.blanco.color}}>Teléfono</Typography>
                          <Typography variant="h6" align="center" >{empresaDetalles.Telefono}</Typography>
                      </Grid>
                    
                      <Grid item xs={12} md={6} style={{ marginBottom:'15px' }}>
                          <Typography variant="h6" align="center" style={{ color:  theme.palette.blanco.color}}>Tutor</Typography>
                          <Typography variant="h6" align="center" >{empresaDetalles.Tutor}</Typography>
                      </Grid>

                      <Grid item xs={12} md={6} style={{ marginBottom:'15px' }}>
                          <Typography variant="h6" align="center" style={{ color:  theme.palette.blanco.color}}>Direccion</Typography>
                          <Typography variant="h6" align="center" >{empresaDetalles.Direccion}</Typography>
                      </Grid>

                      <Grid item xs={12} style={{ marginBottom:'15px' }}>
                          <Typography variant="h6" align="center" style={{ color:  theme.palette.blanco.color}}>Notas</Typography>
                          {empresaDetalles.Notas ? <Typography variant="h6" align="center">{empresaDetalles.Notas}</Typography> : <Typography variant="h6" align="center" style={{ fontStyle: 'italic' }}>No hay notas</Typography>}
                      </Grid>
        
                
                    
                    </Grid>
              
                </Grid>


                <Grid item xs={12} style={{display:'flex', justifyContent:'space-evenly', marginTop: '3em'}}>
                  
                  <Button variant="contained" color="primary"  onClick={() =>  setShowDetails(false)}>Volver</Button>
                </Grid>
              </Grid>
            )}
        </Grid>
      </div>
    );
}

export default Tabla;
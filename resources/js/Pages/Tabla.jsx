import React from 'react';
import NavBarUser from '../Components/NavBarUser';
import { Grid, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import theme from './../Components/theme';
import { useState, useEffect, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AlumnoForm from './../Components/AlumnoForm';
import { Alert } from '@material-ui/lab';

const Tabla = () => {

  const [empresas, setEmpresas] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [alumnosSinCIF, setAlumnosSinCIF] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showFormDelete, setShowFormDelete] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [cifEmpresaSeleccionada, setCifEmpresaSeleccionada] = useState(null);
  const [alumnoSeleccionadoId, setAlumnoSeleccionadoId] = useState('');



  const fetchEmpresas = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/empresas');
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

  const handleOpen = async (CIF, accion) => { 
    setCifEmpresaSeleccionada(CIF);
    if (accion == 'asignar') {
      setShowForm(true);
    } else if (accion == 'borrar') {
      setShowFormDelete(true);
    }
  };

  

  

  const handleAsignarAlumno = async () => { 
    const formData = new FormData();
    console.log(alumnoSeleccionadoId);
    console.log(cifEmpresaSeleccionada);
    formData.append('id', alumnoSeleccionadoId);
    formData.append('cif', cifEmpresaSeleccionada);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/alumno/`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      fetchAlumnos();
      setShowForm(false);

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



    return (
        <div>
        <Grid style={{ minHeight: '100vh', backgroundColor: theme.palette.azulOscuro.color }}>
          <NavBarUser/>
            <Grid style={{display:'flex', justifyContent:'center', paddingTop:'3em', paddingBottom:'3em'}}>
              <Grid item xs={11} style={{backgroundColor: theme.palette.azul.color, padding:'2em', border:'2px solid', borderRadius: '10px', borderColor:theme.palette.celeste.color}}>
                <Table>
                  <TableHead>
                      <TableRow>
                          <TableCell>Nombre</TableCell>
                          <TableCell>Direccion</TableCell>
                          <TableCell>Telefono</TableCell>
                          <TableCell>Tutor</TableCell>
                          <TableCell>Alumnos</TableCell>
                          <TableCell>Asignar</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                  {empresas.map((empresa) => (
                          <TableRow key={empresa.CIF}>
                            <TableCell>{empresa.Nombre}</TableCell>
                            <TableCell>{empresa.Direccion} </TableCell>
                            <TableCell>{empresa.Telefono} </TableCell>
                            <TableCell>{empresa.Tutor} </TableCell>
                            <TableCell>{devolverAlumnos(empresa.CIF)}</TableCell>
                            <TableCell>
                              <Button  variant="contained" color="primary"   onClick={() => handleOpen(empresa.CIF, 'asignar')}><FontAwesomeIcon icon={faPlus} /></Button>
                              <Button variant="contained" style={{backgroundColor: '#ff4d4d', color: 'white', marginRight: '15px'}} onClick={() => handleOpen(empresa.CIF, 'borrar')}><FontAwesomeIcon icon={faTrash} /></Button>
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
            {showForm && (
              <Grid container item xs={6} className="overlay" style={{backgroundColor: theme.palette.azulClaro.color, padding:'2em', border:'2px solid', borderRadius: '10px', borderColor:theme.palette.celeste.color,  position: "fixed",top: "50%",left: "50%",transform: "translate(-50%, -50%)",}}>
                            
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
              <Grid container item xs={6} className="overlay" style={{backgroundColor: theme.palette.azulClaro.color, padding:'2em', border:'2px solid', borderRadius: '10px', borderColor:theme.palette.celeste.color,  position: "fixed",top: "50%",left: "50%",transform: "translate(-50%, -50%)",}}>
                            
                <Grid item xs={12}>

                </Grid>
                
                <Grid item xs={12} style={{display:'flex', justifyContent:'space-evenly', marginTop: '3em'}}>
                  <Button variant="contained" color="primary" onClick={() => handleAsignarAlumno()}>Aceptar</Button>
                  <Button variant="contained" color="primary"  onClick={() => setShowFormDelete(false)}>Volver</Button>
                </Grid>
              </Grid>
            )}
        </Grid>
      </div>
    );
}

export default Tabla;
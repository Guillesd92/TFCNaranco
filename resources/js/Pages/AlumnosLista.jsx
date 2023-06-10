import React from 'react';
import NavBarUser from '../Components/NavBarUser';
import { Grid, TextField, Button, Typography,TableContainer, Table, TableHead, TableRow, TableCell, TableBody,  Select, MenuItem} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import theme from './../Components/theme';
import { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import AlumnoForm from './../Components/AlumnoForm';
import { Alert } from '@material-ui/lab';

const AlumnosLista = () => {

  const [empresas, setEmpresas] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [estudios, setEstudios] = useState([]);

  const [alumnosSinCIF, setAlumnosSinCIF] = useState([]);

  const [showDetails, setShowDetails] = useState(false);
  const [alumnoDetalles , setAlumnoDetalles] = useState('');
  
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroEmail, setFiltroEmail] = useState('');
  const [filtroLocalidad, setFiltroLocalidad] = useState('');
  const [filtroAnio, setFiltroAnio] = useState('');
  const [filtroGrupo, setFiltroGrupo] = useState('');


  const fetchEmpresas = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/empresas');
    const data = await response.json();
    setEmpresas(data);
  };

  const fetchGrupos = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/grupos');
    const data = await response.json();
    setGrupos(data);
  };

  const fetchEstudios = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/estudios');
    const data = await response.json();
    setEstudios(data);
  };

  const fetchAlumnosFiltro = async () => {
    
    const formData = new FormData();
    formData.append('filtroNombre', filtroNombre);
    formData.append('filtroEmail', filtroEmail);
    formData.append('filtroLocalidad', filtroLocalidad);
    formData.append('filtroAnio', filtroAnio);
    formData.append('filtroGrupo', filtroGrupo !== "" ? parseInt(filtroGrupo) : 0);
   console.log(filtroGrupo);

    const response = await fetch('http://127.0.0.1:8000/api/alumnosFiltro', {
      method: 'POST',
      body: formData
      
    });
    const data = await response.json();
    setAlumnos(data);
  };

  const fetchAlumnos = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/alumnos');
    const data = await response.json();
    setAlumnos(data);

    const alumnosSinCIF = data.filter(alumno => !alumno.CIF);
    setAlumnosSinCIF(alumnosSinCIF);
  };

  const devolverEmpresa = (CIF) => {

    if(CIF!=null){
      const empresa = empresas.find(empresa => empresa.CIF == CIF);
  
      return empresa.Nombre;
    }else{
      return 'Vacío';
    }
   
  }

  const devolverCursoEstudio = (id_Grupo) => {

    if(id_Grupo!=null){
      const grupo = grupos.find(grupo => grupo.Id_Grupo == id_Grupo);
  
      const nombreEmpresa = devolverEstudios(grupo.Id_Estudio);

      return grupo.Curso+" "+nombreEmpresa;
    }else{
      return 'Vacío';
    }
   
  }



  useEffect(() => {
    fetchEmpresas();
    fetchAlumnos();
    fetchGrupos();
    fetchEstudios();
  }, []);

  const handleOpen = async (alumno) => { 
      setAlumnoDetalles(alumno);
      setShowDetails(true);
    }
  
  
  

  const Restablecer = () => {
    setFiltroNombre("");
    setFiltroEmail("");
    setFiltroLocalidad("");
    setFiltroAnio("");
    setFiltroGrupo("");

   
    fetchAlumnos();
    
  };

  const devolverEstudios = (Id_Est) => {

    const estudioNombre = estudios.find(estudio => estudio.Id_Estudio == Id_Est);

    if(estudioNombre){
      return estudioNombre.Nombre;
    }else{
      return "";
    }
  
  }



    return (
        <div>
        <Grid style={{ minHeight: '100vh', backgroundColor: theme.palette.azulOscuro.color }}>
          <NavBarUser/>
            <Grid style={{display:'flex', justifyContent:'center', paddingTop:'3em', paddingBottom:'3em'}}>
              <Grid item xs={11} style={{backgroundColor: theme.palette.azul.color, padding:'2em', border:'2px solid', borderRadius: '10px', borderColor:theme.palette.celeste.color}}>
               
                <Grid style={{marginBottom: '2em'}}>
                  <Typography variant="h4" align="center" >Listado de Alumnos</Typography>
                </Grid>

                <Grid container  style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: theme.palette.celeste.color, padding:'2em', border:'1px solid', borderRadius: '10px', borderColor:theme.palette.blanco.color, marginBottom:'2em'}}>
                  <Grid item xs={12} sm={6} md={2} style={{display:'flex', justifyContent:'center'}}>
                    <TextField
                      label="Nombre"
                      value={filtroNombre}
                      onChange={(e) => {
                        setFiltroNombre(e.target.value);
               
                      }}
                      variant="outlined"
                      style={{ width: '90%' , marginBottom: '10px'}}
                    />
                  </Grid>  
                  <Grid item xs={12} sm={6} md={2} style={{display:'flex', justifyContent:'center'}}>
                    <TextField
                      label="Email"
                      value={filtroEmail}
                      onChange={(e) => {
                        setFiltroEmail(e.target.value);
             
                      }}
                      variant="outlined"
                      style={{ width: '90%',  marginBottom: '10px'}}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} style={{display:'flex', justifyContent:'center'}}>
                    <TextField
                      label="Localidad"
                      value={filtroLocalidad}
                      onChange={(e) => {
                        setFiltroLocalidad(e.target.value);
                 
                      }}
                      variant="outlined"
                      style={{ width: '90%',  marginBottom: '10px' }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={2} style={{display:'flex', justifyContent:'center'}}>
                    <TextField
                      label="Año"
                      type="number"
                      value={filtroAnio}
                      onChange={(e) => {
                        setFiltroAnio(e.target.value);
                    
                      }}
                      variant="outlined"
                      style={{ width: '90%',  marginBottom: '20px' }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={2} style={{display:'flex', justifyContent:'center'}}>
                  <Select
                    label="Grupo"
                    value={filtroGrupo}
                    onChange={(e) => {
                      setFiltroGrupo(e.target.value);
                     
                    }}
                    variant="outlined"
                    style={{ width: '90%', marginBottom: '20px' }}
                  >
                    <MenuItem value="">
                        Vacio
                      </MenuItem>
                    {grupos.map((grupo) => (
                      <MenuItem key={grupo.Id_Grupo} value={grupo.Id_Grupo}>
                        {grupo.Curso} {devolverEstudios(grupo.Id_Estudio)}
                      </MenuItem>
                    ))}
                  </Select>
                  </Grid>

                  <Grid item xs={12} sm={12} md={2} style={{display:'flex', alignItems:'center',  justifyContent:'center'}}>
                  <Button variant="contained" color="primary" onClick={fetchAlumnosFiltro}>
                  <FontAwesomeIcon icon={faSearch} />
                    </Button>
                    <Button variant="contained" color="primary" onClick={Restablecer}>
                    <FontAwesomeIcon icon={faSync} />
                    </Button>

                  </Grid>
                </Grid>
                
                <Grid>
                  <TableContainer style={{ maxHeight: '400px' }}>
                    <Table>
                      <TableHead>
                          <TableRow>
                              <TableCell>Nombre</TableCell>
                              <TableCell>Empresa</TableCell>
                              <TableCell>Curso</TableCell>
                              <TableCell>Detalles</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                      {alumnos.map((alumno) => (
                              <TableRow key={alumno.Id_Alumno}>
                                <TableCell>{alumno.Nombre}</TableCell>
                                <TableCell>{devolverEmpresa(alumno.CIF)}</TableCell>
                                <TableCell>{alumno.Año}</TableCell>
                              
                                <TableCell>
                                  <Button  variant="contained" color="primary"  onClick={() => handleOpen(alumno)}>Ver más</Button>
                                </TableCell>
                              </TableRow>
                            ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Grid>
            {showDetails && (
              <Grid container item xs={9} sm={8} md={6} className="overlay" style={{backgroundColor: theme.palette.azulClaro.color, padding:'2em', border:'2px solid', borderRadius: '10px', borderColor:theme.palette.celeste.color,  position: "fixed",top: "50%",left: "50%",transform: "translate(-50%, -50%)",zIndex: 9999 }}>
                            
                <Grid item xs={12}>

                  <Grid container direction="row" style={{ backgroundColor: theme.palette.azul.color, border: '2px solid', borderRadius: '10px', borderColor: theme.palette.celeste.color }}>
                      
                      <Grid item xs={12} style={{ marginTop:'15px', marginBottom:'15px' }}>
                        <Typography variant="h5" align="center" style={{ textDecoration: 'underline' }}>Datos del alumno</Typography>
                      </Grid>
                   
                      <Grid item xs={12} md={6} style={{ marginBottom:'15px' }}>
                        <Typography variant="h6" align="center" style={{ color:  theme.palette.blanco.color}}>Nombre</Typography>
                        <Typography variant="h6" align="center" >{alumnoDetalles.Nombre}</Typography>
                      </Grid>
                    
                      <Grid item xs={12} md={6} style={{ marginBottom:'15px' }}>
                          <Typography variant="h6" align="center" style={{ color:  theme.palette.blanco.color}}>Apellidos</Typography>
                          <Typography variant="h6" align="center">{alumnoDetalles.Apellidos}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6} style={{ marginBottom:'15px' }}>
                          <Typography variant="h6" align="center" style={{ color:  theme.palette.blanco.color}}>Email</Typography>
                          <Typography variant="subtitle1" align="center">{alumnoDetalles.Email}</Typography>
                      </Grid>

                      
                      <Grid item xs={12} md={6} style={{ marginBottom:'15px' }}>
                          <Typography variant="h6" align="center" style={{ color:  theme.palette.blanco.color}}>Teléfono</Typography>
                          <Typography variant="h6" align="center" >{alumnoDetalles.Telefono}</Typography>
                      </Grid>
                    
                      <Grid item xs={12} md={6} style={{ marginBottom:'15px' }}>
                          <Typography variant="h6" align="center" style={{ color:  theme.palette.blanco.color}}>Localidad</Typography>
                          <Typography variant="h6" align="center" >{alumnoDetalles.Localidad}</Typography>
                      </Grid>

                      <Grid item xs={12} md={6} style={{ marginBottom:'15px' }}>
                          <Typography variant="h6" align="center" style={{ color:  theme.palette.blanco.color}}>Direccion</Typography>
                          <Typography variant="subtitle1" align="center" >{alumnoDetalles.Direccion}</Typography>
                      </Grid>

                      <Grid item xs={12} md={6} style={{ marginBottom:'15px' }}>
                          <Typography variant="h6" align="center" style={{ color:  theme.palette.blanco.color}}>Año</Typography>
                          <Typography variant="h6" align="center" >{alumnoDetalles.Año}</Typography>
                      </Grid>

                      <Grid item xs={12}  md={6} style={{ marginBottom:'15px' }}>
                          <Typography variant="h6" align="center" style={{ color:  theme.palette.blanco.color}}>Empresa</Typography>
                          {alumnoDetalles.CIF ? <Typography variant="h6" align="center">{devolverEmpresa(alumnoDetalles.CIF)}</Typography> : <Typography variant="h6" align="center" style={{ fontStyle: 'italic' }}>No tiene</Typography>}
                      </Grid>

                      <Grid item xs={12} style={{ marginBottom:'15px' }}>
                          <Typography variant="h6" align="center" style={{ color:  theme.palette.blanco.color}}>Curso</Typography>
                          <Typography variant="h6" align="center" >{devolverCursoEstudio(alumnoDetalles.Id_Grupo)}</Typography>
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

export default AlumnosLista;
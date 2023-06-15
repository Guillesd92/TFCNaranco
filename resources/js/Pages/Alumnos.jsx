import React from 'react';
import NavBarra from '../Components/NavBarra';
import { Grid, TextField, Button, Typography,TableContainer, Table, TableHead, TableRow, TableCell, TableBody,  Select, MenuItem} from '@material-ui/core';
import theme from './../Components/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef} from 'react';
import AlumnoForm from './../Components/AlumnoForm';
import { Alert } from '@material-ui/lab';

const Alumnos = () => {

    const [showList, setShowList] = useState(true);
    const [showFilter, setShowFilter] = useState(true);
    const [listButton, setListButton] = useState('contained');
    const [formButton, setFormButton] = useState('outlined');
    const [alumnos, setAlumnos] = useState([]);
    const [alerta, setAlerta] = useState('');
    const [grupos, setGrupos] = useState([]);
    const [estudios, setEstudios] = useState([]);
    const [filtroNombre, setFiltroNombre] = useState('');
    const [filtroEmail, setFiltroEmail] = useState('');
    const [filtroLocalidad, setFiltroLocalidad] = useState('');
    const [filtroAnio, setFiltroAnio] = useState('');
    const [filtroGrupo, setFiltroGrupo] = useState('');

    const fileInputRef = useRef(null);

    const fetchAlumnos = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/alumnos');
        const data = await response.json();
        setAlumnos(data);
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

    useEffect(() => {
        fetchAlumnos();
        fetchGrupos();
        fetchEstudios();
      }, []);
    

    const handleShowList = () => {
      setShowList(true);
      setShowFilter(true);
      setListButton('contained');
      setFormButton('outlined');
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
  
    const handleCreateAlumno = () => {
      setShowList(false);
      setShowFilter(false);
      setListButton('outlined');
      setFormButton('contained');
    };

    const Restablecer = () => {
      setFiltroNombre("");
      setFiltroEmail("");
      setFiltroLocalidad("");
      setFiltroAnio("");
      setFiltroGrupo("");
  
     
      fetchAlumnos();
      
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

    const handleDeleteAlumno = async (Id_Alumno, Email) => {
        const response = await fetch(`http://127.0.0.1:8000/api/alumnos/${Id_Alumno}`, {
          method: 'DELETE',
        });
    
        const result = await response.json();
        
       setAlerta('Se ha borado el alumno '+Email);
        document.getElementById('alerta').style.display = 'block';
      
        setTimeout(() => {
            document.getElementById('alerta').style.display = 'none';
          }, 5000);
          
          
        fetchAlumnos();
        
      };

      const handleFileSelect = () => {
        fileInputRef.current.click();
      };

      const handleImport = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
  
      
        try {
          const response = await fetch('http://127.0.0.1:8000/api/alumnosImportarCsv', {
            method: 'POST',
            body: formData,
          });
      
          if (response.ok) {
           
            fetchAlumnos();
          } else {
 
            console.error('Error al importar el archivo');
          }
        } catch (error) {
          console.error('Error al enviar la solicitud', error);
        }
      };
    

    
    return (
        <div>
        <Grid style={{ minHeight: '100vh', backgroundColor: theme.palette.azulOscuro.color }}>
          <NavBarra />
          <Grid style={{display:'flex', justifyContent:'center', paddingTop:'3em', paddingBottom:'3em'}}>
            <Grid item xs={11}  style={{backgroundColor: theme.palette.azul.color, padding:'2em', border:'2px solid', borderRadius: '10px', borderColor:theme.palette.celeste.color}}>
              <Grid style={{display:'flex', justifyContent:'space-evenly'}}>
                <Button variant={listButton} color="primary" onClick={handleShowList}>
                  Listar alumnos
                </Button>
                <Button variant={formButton} color="primary" onClick={handleCreateAlumno}>
                  Crear alumnos
                </Button>
              </Grid>
              {showFilter && (
              <Grid container  style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: theme.palette.celeste.color, padding:'2em', border:'1px solid', borderRadius: '10px', borderColor:theme.palette.blanco.color, marginTop:'2em'}}>
                  <Grid item xs={12} sm={6} md={2} style={{display:'flex', justifyContent:'center', alignItems: 'center' }}>
                    <TextField
                      label="Nombre"
                      value={filtroNombre}
                      onChange={(e) => {
                        setFiltroNombre(e.target.value);
               
                      }}
                      variant="outlined"
                      style={{ width: '90%', marginBottom: window.innerWidth >= 600 ? '10px' : '0px' }}
                    />
                  </Grid>  
                  <Grid item xs={12} sm={6} md={2} style={{display:'flex', justifyContent:'center', alignItems: 'center' }}>
                    <TextField
                      label="Email"
                      value={filtroEmail}
                      onChange={(e) => {
                        setFiltroEmail(e.target.value);
             
                      }}
                      variant="outlined"
                      style={{ width: '90%', marginBottom: window.innerWidth >= 600 ? '10px' : '0px' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={2} style={{display:'flex', justifyContent:'center', alignItems: 'center' }}>
                    <TextField
                      label="Localidad"
                      value={filtroLocalidad}
                      onChange={(e) => {
                        setFiltroLocalidad(e.target.value);
                 
                      }}
                      variant="outlined"
                      style={{ width: '90%', marginBottom: window.innerWidth >= 600 ? '10px' : '0px' }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={2} style={{display:'flex', justifyContent:'center', alignItems: 'center' }}>
                    <TextField
                      label="Año"
                      type="number"
                      value={filtroAnio}
                      onChange={(e) => {
                        setFiltroAnio(e.target.value);
                    
                      }}
                      variant="outlined"
                      style={{ width: '90%', marginBottom: window.innerWidth >= 600 ? '10px' : '0px' }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={2} style={{display:'flex', justifyContent:'center', alignItems: 'center' }}>
                    <Select
                      label="Grupo"
                      value={filtroGrupo}
                      onChange={(e) => {
                        setFiltroGrupo(e.target.value);
                      
                      }}
                      variant="outlined"
                      style={{ width: '90%', marginBottom: window.innerWidth >= 600 ? '10px' : '0px'  }}
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

                  <Grid item xs={12} sm={12} md={2} style={{display:'flex', alignItems:'center',  justifyContent:'space-evenly'}}>
                  <Button variant="contained" color="primary" onClick={fetchAlumnosFiltro} style={{padding:'1em'}}>
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                    <Button variant="contained" color="primary" onClick={Restablecer} style={{padding:'1em'}}>
                    <FontAwesomeIcon icon={faSync} />
                    </Button>

                  </Grid>
                </Grid>
                )}
              {showList ? (
                <Grid style={{paddingTop:'3em', paddingBottom:'3em'}}>
                  <Alert id="alerta" severity="success" style={{display:'none', marginTop:'10px', marginBottom:'10px'}}>{alerta}</Alert>
                  <TableContainer style={{ maxHeight: '400px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontFamily: 'Lexend Deca'}}>Nombre</TableCell>
                                <TableCell style={{fontFamily: 'Lexend Deca'}}>Apellido</TableCell>
                                <TableCell style={{fontFamily: 'Lexend Deca'}}>Email</TableCell>
                                <TableCell style={{fontFamily: 'Lexend Deca'}}>Accion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {alumnos.map((alumno) => (
                            <TableRow key={alumno.Id_Alumno}>
                            <TableCell style={{fontFamily: 'Lexend Deca'}}>{alumno.Nombre}</TableCell>
                            <TableCell style={{fontFamily: 'Lexend Deca'}}>{alumno.Apellidos}</TableCell>
                            <TableCell style={{fontFamily: 'Lexend Deca'}}>{alumno.Email}</TableCell>
                            <TableCell style={{fontFamily: 'Lexend Deca'}}> 
                                <Button variant="contained" style={{backgroundColor: '#ff4d4d', color: 'white', padding:"10px"}}  onClick={() => handleDeleteAlumno(alumno.Id_Alumno, alumno.Email)}> <FontAwesomeIcon icon={faTrash} /></Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Grid>
              ) : (
                <AlumnoForm/>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
}

export default Alumnos;
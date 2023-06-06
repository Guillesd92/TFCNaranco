import React from 'react';
import NavBarra from '../Components/NavBarra';
import { Grid, TextField, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody,  Select, MenuItem, Checkbox} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import theme from './../Components/theme';
import { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Alert } from '@material-ui/lab';

const MoverAlumnos = () => {

  const [empresas, setEmpresas] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [estudios, setEstudios] = useState([]);
  const [alumnosSeleccionados, setAlumnosSeleccionados] = useState([]);

  const [severity, setSeverity] = useState('error');
  const [alerta, setAlerta] = useState('');
  
  const [checked, setChecked] = useState(false);
  const [filtroGrupo, setFiltroGrupo] = useState('');
  const [nuevoGrupo, setNuevoGrupo] = useState('');


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

    
  };

  

  const devolverCursoEstudio = (id_Grupo) => {

    if(id_Grupo!=null){
      const grupo = grupos.find(grupo => grupo.Id_Grupo == id_Grupo);

      if (grupo && grupo.Id_Estudio) {
  
        const nombreEmpresa = devolverEstudios(grupo.Id_Estudio);

        return grupo.Curso+" "+nombreEmpresa;
      }
    
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
  
  
  const handleInputBlur = () => {
    fetchAlumnosFiltro();
  };

 
  const devolverEstudios = (Id_Est) => {

    const estudioNombre = estudios.find(estudio => estudio.Id_Estudio == Id_Est);

    if(estudioNombre){
      return estudioNombre.Nombre;
    }else{
      return "";
    }
  
  }

  const handleAlumnoSeleccionado = (idAlumno) => {

    const isSelected = alumnosSeleccionados.includes(idAlumno);
    let nuevosSeleccionados = [...alumnosSeleccionados];

    if (isSelected) {
      nuevosSeleccionados = nuevosSeleccionados.filter((alumnoId) => alumnoId !== idAlumno);
    } else {
      nuevosSeleccionados.push(idAlumno);
    }
    
    setAlumnosSeleccionados(nuevosSeleccionados);
  };

  const handleMoverAlumnos = async () => {

    if (nuevoGrupo !== '') {
   
      if(alumnosSeleccionados.length>0){
        const formData = new FormData();
        formData.append('alumnosSeleccionados', alumnosSeleccionados.join(','));
        formData.append('nuevoGrupo', parseInt(nuevoGrupo));
        console.log(nuevoGrupo);
        console.log(alumnosSeleccionados.join(','));

        try {
          const response = await fetch(`http://127.0.0.1:8000/api/alumnosMover/`, {
            method: 'POST',
            body: formData
          });
          const data = await response.json();

          
          setSeverity("success");
          setAlerta("Se han cambiado de grupo corectamente");
          document.getElementById('alerta').style.display = 'block';
          setAlumnosSeleccionados([]);
          setChecked(false);
          
          fetchAlumnos();
          setTimeout(() => {
            document.getElementById('alerta').style.display = 'none';
          }, 3000);
          
    
        } catch (error) {
          console.error('Error:', error);
        }
      }else{
        setSeverity("error");
        setAlerta("No has seleccionado ningun alumno");
        document.getElementById('alerta').style.display = 'block';

        setTimeout(() => {
          document.getElementById('alerta').style.display = 'none';
        }, 3000);
      }
      
     
    }else{
      setSeverity("error");
      setAlerta("No has seleccionado ningun grupo");
      document.getElementById('alerta').style.display = 'block';

      setTimeout(() => {
        document.getElementById('alerta').style.display = 'none';
      }, 3000);
    }
  };


    return (
        <div>
        <Grid style={{ minHeight: '100vh', backgroundColor: theme.palette.azulOscuro.color }}>
          <NavBarra/>
            <Grid style={{display:'flex', justifyContent:'center', paddingTop:'3em', paddingBottom:'3em'}}>
              <Grid item xs={11} style={{backgroundColor: theme.palette.azul.color, padding:'2em', border:'2px solid', borderRadius: '10px', borderColor:theme.palette.celeste.color}}>
               
                <Grid container  style={{ display: 'flex', justifyContent: 'space-evenly', backgroundColor: theme.palette.celeste.color, padding:'2em', border:'1px solid', borderRadius: '10px', borderColor:theme.palette.blanco.color, marginBottom:'2em'}}>
                  
                <Grid item xs={12} md={5}  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <Typography variant="subtitle1" align="center" style={{ marginRight: '1em' }}>Alumnos</Typography>
                  
                  <Select
                    label="Grupo"
                    value={filtroGrupo}
                    onChange={(e) => {
                      setFiltroGrupo(e.target.value);
                    }}
                    variant="outlined"
                    style={{ width: '90%'}}
                  >
                    <MenuItem value="">Todos</MenuItem>
                    {grupos.map((grupo) => (
                      <MenuItem key={grupo.Id_Grupo} value={grupo.Id_Grupo}>
                        {grupo.Curso} {devolverEstudios(grupo.Id_Estudio)}
                      </MenuItem>
                    ))}
                  </Select>
                
                  <Button variant="contained" color="primary" onClick={fetchAlumnosFiltro} style={{ marginLeft: '1em',  padding:'1.5em'}}>
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                </Grid>

                  <Grid item xs={12} md={5}  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography variant="subtitle1" align="center" style={{ marginRight: '1em' }}>Promocion</Typography>
                    <Select
                      label="Nuevo grupo"
                      value={nuevoGrupo}
                      onChange={(e) => {
                        setNuevoGrupo(e.target.value);
                      }}
                      variant="outlined"
                      style={{ width: '100%'}}
                    >
                      <MenuItem value="">Vacio</MenuItem>
                      {grupos.map((grupo) => (
                        <MenuItem key={grupo.Id_Grupo} value={grupo.Id_Grupo}>
                          {grupo.Curso} {devolverEstudios(grupo.Id_Estudio)}
                        </MenuItem>
                      ))}
                    </Select>
                    <Button variant="contained" color="primary" onClick={handleMoverAlumnos} style={{ marginLeft: '1em', padding:'1.5em' }}>
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </Button>
                  </Grid>

                </Grid>
                <Alert id="alerta" severity={severity} style={{display:'none', marginBottom:'30px'}}>{alerta}</Alert>
                <Grid>
                  <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellidos</TableCell>
                            <TableCell>Grupo</TableCell>
                            <TableCell>Accion</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {alumnos.map((alumno) => (
                            <TableRow key={alumno.Id_Alumno}>
                              <TableCell>{alumno.Nombre}</TableCell>
                              <TableCell>{alumno.Apellidos}</TableCell>
                              <TableCell>{devolverCursoEstudio(alumno.Id_Grupo)}</TableCell>
                             
                              <TableCell>
                                <Checkbox
                                  
                                  onChange={() => handleAlumnoSeleccionado(alumno.Id_Alumno)}
                                />
                                </TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </Grid>
        </Grid>
      </div>
    );
}

export default MoverAlumnos;
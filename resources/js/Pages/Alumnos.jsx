import React from 'react';
import NavBarra from '../Components/NavBarra';
import { Grid, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import theme from './../Components/theme';
import { useState, useEffect, useRef} from 'react';
import AlumnoForm from './../Components/AlumnoForm';
import { Alert } from '@material-ui/lab';

const Alumnos = () => {

    const [showList, setShowList] = useState(true);
    const [listButton, setListButton] = useState('contained');
    const [formButton, setFormButton] = useState('outlined');
    const [alumnos, setAlumnos] = useState([]);
    const [alerta, setAlerta] = useState('');

    const fetchAlumnos = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/alumnos');
        const data = await response.json();
        setAlumnos(data);
    };

    useEffect(() => {
        fetchAlumnos();
      }, []);
    

    const handleShowList = () => {
      setShowList(true);
      setListButton('contained');
      setFormButton('outlined');
      fetchAlumnos();
    };
  
    const handleCreateAlumno = () => {
      setShowList(false);
      setListButton('outlined');
      setFormButton('contained');
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
    

    
    return (
        <div>
        <Grid style={{ minHeight: '100vh', backgroundColor: theme.palette.azulOscuro.color }}>
          <NavBarra />
          <Grid style={{display:'flex', justifyContent:'center', paddingTop:'3em', paddingBottom:'3em'}}>
            <Grid item xs={11} sm={9} md={6} style={{backgroundColor: theme.palette.azul.color, padding:'2em', border:'2px solid', borderRadius: '10px', borderColor:theme.palette.celeste.color}}>
              <Grid style={{display:'flex', justifyContent:'space-evenly'}}>
                <Button variant={listButton} color="primary" onClick={handleShowList}>
                  Listar alumnos
                </Button>
                <Button variant={formButton} color="primary" onClick={handleCreateUser}>
                  Crear alumnos
                </Button>
              </Grid>
              {showList ? (
                <Grid style={{paddingTop:'3em', paddingBottom:'3em'}}>
                  <Alert id="alerta" severity="success" style={{display:'none', marginTop:'10px', marginBottom:'10px'}}>{alerta}</Alert>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Apellido</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Accion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {alumnos.map((alumno) => (
                            <TableRow key={alumno.Id_Alumno}>
                            <TableCell>{alumno.Nombre}</TableCell>
                            <TableCell>{alumno.Apellidos}</TableCell>
                            <TableCell>{alumno.Email}</TableCell>
                            <TableCell> 
                                <Button variant="contained" onClick={() => handleDeleteAlumno(alumno.Id_Alumno, alumno.Email)}>Borrar</Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
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

export default Usuarios;
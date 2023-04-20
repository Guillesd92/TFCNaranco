import React from 'react';
import NavBarra from '../Components/NavBarra';
import { Grid, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import theme from './../Components/theme';
import { useState, useEffect, useRef} from 'react';
import UserForm from './../Components/UserForm';
import { Alert } from '@material-ui/lab';

const Usuarios = () => {

    const [showList, setShowList] = useState(true);
    const [listButton, setListButton] = useState('contained');
    const [formButton, setFormButton] = useState('outlined');
    const [usuarios, setUsuarios] = useState([]);
    const [alerta, setAlerta] = useState('');

    const fetchUsers = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/profesores');
        const data = await response.json();
        setUsuarios(data);
    };

    useEffect(() => {
        fetchUsers();
      }, []);
    

    const handleShowList = () => {
      setShowList(true);
      setListButton('contained');
      setFormButton('outlined');
      fetchUsers();
    };
  
    const handleCreateUser = () => {
      setShowList(false);
      setListButton('outlined');
      setFormButton('contained');
    };

    const handleDeleteUser = async (Id_Profesor, Email) => {
        const response = await fetch(`http://127.0.0.1:8000/api/profesores/${Id_Profesor}`, {
          method: 'DELETE',
        });
    
        const result = await response.json();
        
       setAlerta('Se ha borado el usuario '+Email);
        document.getElementById('alerta').style.display = 'block';
      
        setTimeout(() => {
            document.getElementById('alerta').style.display = 'none';
          }, 5000);
          
          
        fetchUsers();
        
      };
    

    
    return (
        <div>
        <Grid style={{ minHeight: '100vh', backgroundColor: theme.palette.azulOscuro.color }}>
          <NavBarra />
          <Grid style={{display:'flex', justifyContent:'center', paddingTop:'3em', paddingBottom:'3em'}}>
            <Grid item xs={11} sm={9} md={6} style={{backgroundColor: theme.palette.azul.color, padding:'2em', border:'2px solid', borderRadius: '10px', borderColor:theme.palette.celeste.color}}>
              <Grid style={{display:'flex', justifyContent:'space-evenly'}}>
                <Button variant={listButton} color="primary" onClick={handleShowList}>
                  Listar usuarios
                </Button>
                <Button variant={formButton} color="primary" onClick={handleCreateUser}>
                  Crear usuario
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
                        {usuarios.map((usuario) => (
                            <TableRow key={usuario.Id_Profesor}>
                            <TableCell>{usuario.Nombre}</TableCell>
                            <TableCell>{usuario.Apellidos}</TableCell>
                            <TableCell>{usuario.Email}</TableCell>
                            <TableCell> 
                                {usuario.Id_Profesor !== 1 &&
                                    <Button variant="contained" onClick={() => handleDeleteUser(usuario.Id_Profesor, usuario.Email)}>Borrar</Button>
                                }
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Grid>
              ) : (
                <UserForm/>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
}

export default Usuarios;
import React from 'react';
import NavBarra from '../Components/NavBarra';
import { Grid, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import theme from './../Components/theme';
import { useState, useEffect, useRef} from 'react';
import GroupForm from './../Components/GroupForm';
import { Alert } from '@material-ui/lab';

const Grupos = () => {

    const [showList, setShowList] = useState(true);
    const [listButton, setListButton] = useState('contained');
    const [formButton, setFormButton] = useState('outlined');
    const [grupos, setGrupos] = useState([]);
    const [estudios, setEstudios] = useState([]);
    const [alerta, setAlerta] = useState('');

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
        fetchGrupos();
        fetchEstudios();
      }, []);

      useEffect(() => {
        fetch('http://127.0.0.1:8000/api/estudios')
          .then(response => response.json())
          .then(data => {
            setEstudios(data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, []);
    

    const handleShowList = () => {
      setShowList(true);
      setListButton('contained');
      setFormButton('outlined');
      fetchGrupos();
    };
  
    const handleCreateGrupo = () => {
      setShowList(false);
      setListButton('outlined');
      setFormButton('contained');
    };

    const handleDeleteGrupo = async (Id_Grupo) => {
        const response = await fetch(`http://127.0.0.1:8000/api/grupos/${Id_Grupo}`, {
          method: 'DELETE',
        });
    
        const result = await response.json();
        
       setAlerta('Se ha borado el grupo');
        document.getElementById('alerta').style.display = 'block';
      
        setTimeout(() => {
            document.getElementById('alerta').style.display = 'none';
          }, 5000);
          
          
        fetchGrupos();
        
      };
    

      function getNombreEstudio(idEstudio) {
        for (let i = 0; i < estudios.length; i++) {
          if (estudios[i].Id_Estudio === idEstudio) {
            return estudios[i].Nombre;
          }
        }
        return '';
        
      }

    
    return (
        <div>
        <Grid style={{ minHeight: '100vh', backgroundColor: theme.palette.azulOscuro.color }}>
          <NavBarra />
          <Grid style={{display:'flex', justifyContent:'center', paddingTop:'3em', paddingBottom:'3em'}}>
            <Grid item xs={11} sm={9} md={6} style={{backgroundColor: theme.palette.azul.color, padding:'2em', border:'2px solid', borderRadius: '10px', borderColor:theme.palette.celeste.color}}>
              <Grid style={{display:'flex', justifyContent:'space-evenly'}}>
                <Button variant={listButton} color="primary" onClick={handleShowList}>
                  Listar Grupos
                </Button>
                <Button variant={formButton} color="primary" onClick={handleCreateGrupo}>
                  Crear Grupo
                </Button>
              </Grid>
              {showList ? (
                <Grid style={{paddingTop:'3em', paddingBottom:'3em'}}>
                  <Alert id="alerta" severity="success" style={{display:'none', marginTop:'10px', marginBottom:'10px'}}>{alerta}</Alert>
                    <Table>
                        <TableHead>
                            <TableRow>
                              
                                <TableCell>Aula</TableCell>
                                <TableCell>Curso</TableCell>
                                <TableCell>Estudio</TableCell>
                                <TableCell>Accion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {grupos.map((grupo) => (
                            <TableRow key={grupo.Id_Grupo}>
                                <TableCell>{grupo.Aula}</TableCell>
                                <TableCell>{grupo.Curso}</TableCell>
                                <TableCell>{getNombreEstudio(grupo.Id_Estudio)}</TableCell>
                                <TableCell> 
                                    <Button variant="contained" style={{backgroundColor: '#ff4d4d', color: 'white'}} onClick={() => handleDeleteGrupo(grupo.Id_Grupo)}>Borrar</Button> 
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Grid>
              ) : (
                <GroupForm/>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
}

export default Grupos;
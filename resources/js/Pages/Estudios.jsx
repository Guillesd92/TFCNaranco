import React from 'react';
import NavBarra from '../Components/NavBarra';
import { Grid, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import theme from './../Components/theme';
import { useState, useEffect, useRef} from 'react';
import EstudioForm from './../Components/EstudioForm';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Alert } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./../../css/tipografia.css";

const Estudios = () => {

    const [showList, setShowList] = useState(true);
    const [listButton, setListButton] = useState('contained');
    const [formButton, setFormButton] = useState('outlined');
    const [estudios, setEstudios] = useState([]);
    const [alerta, setAlerta] = useState('');

    const fetchEstudios = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/estudios');
        const data = await response.json();
        setEstudios(data);
    };

    useEffect(() => {
        fetchEstudios();
      }, []);
    

    const handleShowList = () => {
      setShowList(true);
      setListButton('contained');
      setFormButton('outlined');
      fetchEstudios();
    };
  
    const handleCreateEstudio = () => {
      setShowList(false);
      setListButton('outlined');
      setFormButton('contained');
    };

    const handleDeleteEstudio = async (Id_Estudio) => {
        const response = await fetch(`http://127.0.0.1:8000/api/estudios/${Id_Estudio}`, {
          method: 'DELETE',
        });
    
        const result = await response.json();
        
       setAlerta('Se ha borado el estudio');
        document.getElementById('alerta').style.display = 'block';
      
        setTimeout(() => {
            document.getElementById('alerta').style.display = 'none';
          }, 5000);
          
          
        fetchEstudios();
        
      };
    

    
    return (
        <div>
        <Grid style={{ minHeight: '100vh', backgroundColor: theme.palette.azulOscuro.color }}>
          <NavBarra />
          <Grid style={{display:'flex', justifyContent:'center', paddingTop:'3em', paddingBottom:'3em'}}>
            <Grid item xs={11} sm={9} md={6} style={{backgroundColor: theme.palette.azul.color, padding:'2em', border:'2px solid', borderRadius: '10px', borderColor:theme.palette.celeste.color}}>
              <Grid style={{display:'flex', justifyContent:'space-evenly'}}>
                <Button variant={listButton} color="primary" onClick={handleShowList}>
                  Listar Estudios
                </Button>
                <Button variant={formButton} color="primary" onClick={handleCreateEstudio}>
                  Crear Estudios
                </Button>
              </Grid>
              {showList ? (
                <Grid style={{paddingTop:'3em', paddingBottom:'3em'}}>
                  <Alert id="alerta" severity="success" style={{display:'none', marginTop:'10px', marginBottom:'10px'}}>{alerta}</Alert>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontFamily: 'Lexend Deca'}}>Nombre</TableCell> 
                                <TableCell style={{fontFamily: 'Lexend Deca'}}>Accion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {estudios.map((estudio) => (
                            <TableRow key={estudio.Id_Estudio}>
                                <TableCell style={{fontFamily: 'Lexend Deca'}}>{estudio.Nombre}</TableCell>
                                <TableCell style={{fontFamily: 'Lexend Deca'}}> 
                                  {estudio.Nombre !== "Curso acabado" &&
                                      <Button variant="contained" style={{backgroundColor: '#ff4d4d', color: 'white', padding:"10px"}} onClick={() => handleDeleteEstudio(estudio.Id_Estudio)}><FontAwesomeIcon icon={faTrash} /></Button> 
                                  }
                                    
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Grid>
              ) : (
                <EstudioForm/>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
}

export default Estudios;
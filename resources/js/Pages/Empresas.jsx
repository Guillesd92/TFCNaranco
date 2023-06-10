import React from 'react';
import NavBarUser from '../Components/NavBarUser';
import { Grid, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import theme from './../Components/theme';
import { useState, useEffect, useRef} from 'react';
import EmpresaForm from './../Components/EmpresaForm';
import ModEmpresaForm from './../Components/ModEmpresaForm';
import { Alert } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const Empresas = () => {

    const [showList, setShowList] = useState(true);
    const [showMod, setShowMod] = useState(false);
    const [selectedCIF, setSelectedCIF] = useState(null);
    const [listButton, setListButton] = useState('contained');
    const [formButton, setFormButton] = useState('outlined');
    const [empresas, setEmpresas] = useState([]);
    const [alerta, setAlerta] = useState('');

    const fetchEmpresas = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/empresas');
        const data = await response.json();
        setEmpresas(data);
    };

    useEffect(() => {
        fetchEmpresas();
      }, []);
    

    const handleShowList = () => {
      setShowList(true);
      setListButton('contained');
      setFormButton('outlined');
      fetchEmpresas();
    };

    const handleShowMod = (CIF) => {
      
      setSelectedCIF(CIF);
      setShowMod(true);
      
  
    }
  
    const handleCreateEmpresa = () => {
      setShowList(false);
      setListButton('outlined');
      setFormButton('contained');
      setShowMod(false);
    };

    const handleDeleteUser = async (CIF, Nombre) => {
        const response = await fetch(`http://127.0.0.1:8000/api/empresas/${CIF}`, {
          method: 'DELETE',
        });
    
        const result = await response.json();
        
       setAlerta('Se ha borado la empresa '+Nombre);
        document.getElementById('alerta').style.display = 'block';
      
        setTimeout(() => {
            document.getElementById('alerta').style.display = 'none';
          }, 5000);
          
          
        fetchEmpresas();
        
      };
    

    
    return (
        <div>
        <Grid style={{ minHeight: '100vh', backgroundColor: theme.palette.azulOscuro.color }}>
          <NavBarUser />
          <Grid style={{display:'flex', justifyContent:'center', paddingTop:'3em', paddingBottom:'3em'}}>
            <Grid item xs={11} sm={9} md={7} style={{backgroundColor: theme.palette.azul.color, padding:'2em', border:'2px solid', borderRadius: '10px', borderColor:theme.palette.celeste.color}}>
              <Grid style={{display:'flex', justifyContent:'space-evenly'}}>
                <Button variant={listButton} color="primary" onClick={handleShowList}>
                  Listar empresas
                </Button>
                <Button variant={formButton} color="primary" onClick={handleCreateEmpresa}>
                  Crear empresas
                </Button>
              </Grid>
              {showList ? (
                showMod ? (
                  <ModEmpresaForm CIF={selectedCIF} setShowMod={setShowMod} />
                ) : (
                  <Grid style={{paddingTop:'3em', paddingBottom:'3em'}}>
                    <Alert id="alerta" severity="success" style={{display:'none', marginTop:'10px', marginBottom:'10px'}}>{alerta}</Alert>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>CIF</TableCell>
                          <TableCell>Convenio</TableCell>
                          <TableCell>Nombre</TableCell>
                          <TableCell>Accion</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {empresas.map((empresa) => (
                          <TableRow key={empresa.CIF}>
                            <TableCell>{empresa.CIF}</TableCell>
                            <TableCell>{empresa.Convenio}</TableCell>
                            <TableCell>{empresa.Nombre}</TableCell>
                            <TableCell> 
                              <Button variant="contained" onClick={() => handleDeleteUser(empresa.CIF, empresa.Nombre)} style={{backgroundColor: '#ff4d4d', color: 'white', marginRight: '15px', padding:"10px"}}><FontAwesomeIcon icon={faTrash}/></Button>
                              <Button variant="contained" color="primary" style={{padding:"10px"}} onClick={() => handleShowMod(empresa.CIF)}><FontAwesomeIcon icon={faEdit} /></Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Grid>
                )
              ) : (
                <EmpresaForm/>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
}

export default Empresas;
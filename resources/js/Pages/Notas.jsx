import React from 'react';
import NavBarUser from '../Components/NavBarUser';
import { Grid, Button, Table, TableHead, TableRow, TableCell, TableBody, Typography, TextField } from '@material-ui/core';
import theme from './../Components/theme';
import { useState, useEffect, useRef} from 'react';
import EmpresaForm from './../Components/EmpresaForm';
import ModEmpresaForm from './../Components/ModEmpresaForm';
import { Alert } from '@material-ui/lab';

const Notas = () => {


    const [empresas, setEmpresas] = useState([]);
    const [alerta, setAlerta] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [empresaDetalles, setEmpresaDetalles] = useState(null);
    const [notas, setNotas] = useState('');
   

    const fetchEmpresas = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/empresas');
        const data = await response.json();
        setEmpresas(data);
    };

    useEffect(() => {
        fetchEmpresas();
      }, []);

    const editarNotas = (empresa) =>{
        setEmpresaDetalles(empresa);
        setNotas(empresa.Notas);
        setShowForm(true);
    }

    const handleGuardarNotas =async () =>{

      const formData = new FormData();

      formData.append('notas', notas);
      formData.append('cif', empresaDetalles.CIF);

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/empresaNotas/`, {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        

      } catch (error) {
        console.error('Error:', error);
      }
      fetchEmpresas();
      setShowForm(false);
    }
    
    
    return (
        <div>
        <Grid style={{ minHeight: '100vh', backgroundColor: theme.palette.azulOscuro.color }}>
          <NavBarUser />
          <Grid style={{display:'flex', justifyContent:'center', paddingTop:'3em', paddingBottom:'3em'}}>
            <Grid item xs={11} md={8} style={{backgroundColor: theme.palette.azul.color, padding:'2em', border:'2px solid', borderRadius: '10px', borderColor:theme.palette.celeste.color}}>
                <Grid>
                <Typography variant="h4" align="center">Listado de Notas</Typography>
                </Grid>
                <Grid style={{paddingTop:'3em', paddingBottom:'3em'}}>
                  <Alert id="alerta" severity="success" style={{display:'none', marginTop:'10px', marginBottom:'10px'}}>{alerta}</Alert>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>CIF</TableCell>
                        <TableCell>Convenio</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Accion</TableCell>
                        <TableCell>Tutor</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {empresas.map((empresa) => (
                        <TableRow key={empresa.CIF}>
                          <TableCell>{empresa.CIF}</TableCell>
                          <TableCell>{empresa.Convenio}</TableCell>
                          <TableCell>{empresa.Nombre}</TableCell>
                          <TableCell>{empresa.Tutor}</TableCell>
                          <TableCell> 
                            <Button variant="contained" color="primary" onClick={() => editarNotas(empresa)}>Editar Notas</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Grid>
            </Grid>
          </Grid>
          {showForm && (
              <Grid container item xs={6} className="overlay" style={{backgroundColor: theme.palette.azulClaro.color, padding:'2em', border:'2px solid', borderRadius: '10px', borderColor:theme.palette.celeste.color,  position: "fixed",top: "50%",left: "50%",transform: "translate(-50%, -50%)",}}>
                            
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" style={{ marginBottom:'1em'}}>Notas de {empresaDetalles.Nombre}</Typography>
                    <TextField
                        label="Notas"
                        multiline
                        rows={12}
                        value={notas}
                        onChange={(e) => setNotas(e.target.value)}
                        variant="outlined"
                        fullWidth
                        required
                        style={{backgroundColor: theme.palette.azul.color}}
                    />
                </Grid>
                <Grid item xs={12} style={{display:'flex', justifyContent:'space-evenly', marginTop: '3em'}}>
                  <Button variant="contained" color="primary" onClick={() => handleGuardarNotas()}>Guardar</Button>
                  <Button variant="contained" color="primary"  onClick={() => setShowForm(false)}>Volver</Button>
                </Grid>
              </Grid>
            )}
        </Grid>
      </div>
    );
}

export default Notas;
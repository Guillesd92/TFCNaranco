import React from 'react';
import NavBarUser from '../Components/NavBarUser';
import { Grid, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import theme from './../Components/theme';
import { useState, useEffect, useRef} from 'react';
import AlumnoForm from './../Components/AlumnoForm';
import { Alert } from '@material-ui/lab';

const Tabla = () => {

    
    
    return (
        <div>
        <Grid style={{ minHeight: '100vh', backgroundColor: theme.palette.azulOscuro.color }}>
          <NavBarUser/>
            <Grid style={{display:'flex', justifyContent:'center', paddingTop:'3em', paddingBottom:'3em'}}>
              <Grid item xs={11} style={{backgroundColor: theme.palette.azul.color, padding:'2em', border:'2px solid', borderRadius: '10px', borderColor:theme.palette.celeste.color}}>
                <Table>
                  <TableHead>
                      <TableRow>
                          <TableCell>CIF</TableCell>
                          <TableCell>Convenio</TableCell>
                          <TableCell>Nombre</TableCell>
                          <TableCell>Direccion</TableCell>
                          <TableCell>Telefono</TableCell>
                          <TableCell>Tutor</TableCell>
                          <TableCell>Alumnos</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                    
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
        </Grid>
      </div>
    );
}

export default Tabla;
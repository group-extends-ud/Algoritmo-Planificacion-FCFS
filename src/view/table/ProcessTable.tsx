import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './table.css';

import { PropsTable } from 'util/props';
import { ProcessModel } from 'models/ProcessModel';

const ProcessTable = ({ process }: PropsTable) => (
    <div className='table-container scrollable'>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Tiempo de llegada</th>
                    <th>Rafaga</th>
                    <th>Tiempo de comienzo</th>
                    <th>Tiempo de finalización</th>
                    <th>Tiempo de retorno</th>
                    <th>Tiempo de espera</th>
                    <th>Bloquear Proceso</th>
                </tr>
            </thead>
            <tbody>
                {process.map((p:ProcessModel) => (
                    <tr key={p.Id}>
                        <td>{p.Id}</td>
                        <td>{p.Name}</td>
                        <td>{p.CommingTime}</td>
                        <td>{p.BurstTime}</td>
                        <td>{p.StartTime === -1 ? '-' : p.StartTime}</td>
                        <td>{p.EndTime === -1 ? '-' : p.EndTime}</td>
                        <td>{p.TurnAroundTime === -1 ? '-' : p.TurnAroundTime}</td>
                        <td>{p.WaitingTime === -1 ? '-' : p.WaitingTime}</td>
                        <td><Button>Bloquear Proceso</Button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
);

export default ProcessTable;
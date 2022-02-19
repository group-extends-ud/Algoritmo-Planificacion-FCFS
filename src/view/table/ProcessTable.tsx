import React from 'react';
import Table from 'react-bootstrap/Table';
import './table.css';

import { ProcessModel } from 'models/ProcessModel';
import { useAppSelector } from 'hooks/redux';


const ProcessTable = () => {

    const processList = useAppSelector(({ computedProcess:{ value } }) => value );

    return (
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
                    </tr>
                </thead>
                <tbody>
                    {processList.map((process: ProcessModel) => (
                        <tr key={process.Id}>
                            <td>{process.Id}</td>
                            <td>{process.Name}</td>
                            <td>{process.CommingTime}</td>
                            <td>{process.BurstTime}</td>
                            <td>{process.StartTime === -1 ? '-' : process.StartTime}</td>
                            <td>{process.EndTime === -1 ? '-' : process.EndTime}</td>
                            <td>{process.TurnAroundTime === -1 ? '-' : process.TurnAroundTime}</td>
                            <td>{process.WaitingTime === -1 ? '-' : process.WaitingTime}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ProcessTable;
import React from 'react';
import Table from 'react-bootstrap/Table';
import './table.css';

import { ProcessModel } from 'models/ProcessModel';
import { useAppSelector } from 'hooks/redux';
import { useParams } from 'react-router-dom';


const ProcessTable = () => {

    const params = useParams();

    const processList = useAppSelector(({ computedProcess:{ value } }) => value );
    const lockedProcess = useAppSelector(({ queueBlockedProcess:{value} }) => value);

    const isPriorityEnabled = params.name === 'usePrioritySolver';

    return (
        <div className='table-container scrollable'>
            <h4>
                Procesos
            </h4>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Tiempo de llegada</th>
                        {isPriorityEnabled && <th>Prioridad</th>}
                        <th>Rafaga</th>
                        <th>Ejecutado</th>
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
                            {isPriorityEnabled && <td>{process.Priority}</td>}
                            <td>{process.BurstTime}</td>
                            <td>{process.Executed === -1 ? '-' : process.Executed}</td>
                            <td>{process.StartTime === -1 ? '-' : process.StartTime}</td>
                            <td>{process.EndTime === -1 ? '-' : process.EndTime}</td>
                            <td>{process.TurnAroundTime === -1 ? '-' : process.TurnAroundTime}</td>
                            <td>{process.WaitingTime === -1 ? '-' : process.WaitingTime}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <br />
            <h4>
                Procesos Bloqueados
            </h4>
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
                    {lockedProcess.map(({ processBlocked }) => (
                        <tr key={processBlocked.Id}>
                            <td>{processBlocked.Id}</td>
                            <td>{processBlocked.Name}</td>
                            <td>{processBlocked.CommingTime}</td>
                            <td>{processBlocked.BurstTime}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
        </div>
    );
}

export default ProcessTable;
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Swal from 'sweetalert2';

import { ProcessModel, ProcessInputModel } from 'models/ProcessModel';
import { getLastIncomming } from "util/processUtil";

import { addProcess } from 'util/store/computedProcess';
import { setCurrentProcess } from 'util/store/currentProcess';
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { setAlgorithmStatus } from "util/store/algorithmStatus";
import { updateTimer } from "util/store/timer";
import { addProcessBlocked } from "util/store/queueBlockedProcess";
import { useNavigate, useParams } from "react-router-dom";


const ProcessSettings = () => {

    const params = useParams();
    const navigator = useNavigate();

    const processList = useAppSelector(({ computedProcess: { value } }) => value);
    const currentProcess = useAppSelector(({ currentProcess: { value } }) => value);
    const algorithmStatus = useAppSelector(({ algorithmStatus: { value } }) => value);
    const timer = useAppSelector(({ timer: { value } }) => value);


    const dispatch = useAppDispatch();

    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);

    const blockProcess = () => {
        if (currentProcess.currentProcess) {
            const blockedProcess = currentProcess.currentProcess.copy(processList.length);

            currentProcess.currentProcess.BurstTime = currentProcess.executed;
            blockedProcess.BurstTime -= currentProcess.executed;
            blockedProcess.LockedTime = 4;
            blockedProcess.CommingTime = getLastIncomming(processList).CommingTime;

            dispatch(
                setCurrentProcess(currentProcess.currentProcess)
            );
            dispatch(
                addProcessBlocked(blockedProcess)
            );
        }
    }

    const [form, setForm] = useState<{ [x: string]: string }>({ name: '', burst: '', incomming: '', priority: '' });
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmitProcess = (): void => {
        try {
            if (form.name !== '' && form.name !== undefined && form.name !== null) {
                if (form.incomming !== '' && form.incomming !== undefined && form.incomming !== null && parseInt(form.incomming) >= 0) {
                    const latestIncommingProcess = getLastIncomming(processList);
                    if (latestIncommingProcess) {
                        if (parseInt(form.incomming) < latestIncommingProcess.CommingTime) {
                            throw new Error('Incomming must be greater than the latest incomming process');
                        }
                    }
                    if (form.burst !== '' && form.burst !== undefined && form.burst !== null && parseInt(form.burst) >= 0) {
                        dispatch(
                            addProcess(
                                new ProcessModel(
                                    processList.length,
                                    new ProcessInputModel(
                                        form.name,
                                        parseInt(form.incomming),
                                        parseInt(form.burst),
                                        form.priority? parseInt(form.priority) : 0
                                    )
                                )
                            )
                        );
                    } else {
                        throw new Error('Burst time must be a positive number');
                    }
                } else {
                    throw new Error('Incomming time must be a positive number');
                }
            } else {
                throw new Error('Name must be a string');
            }
        } catch (error: any) {
            Swal.fire({ text: error.message, icon: 'error', });

        }

        setForm({ name: '', burst: '', incomming: '' });
        handleClose();
    }

    const initProcess = (): void => {
        if (!currentProcess.currentProcess) {
            dispatch(
                setCurrentProcess(
                    processList.at(0)
                )
            );
        }
        dispatch(
            setAlgorithmStatus(
                !algorithmStatus
            )
        )
    }

    return (
        <div className='buttons'>

            <Form.Control
                id="floatingInput"
                type="number" min="1"
                value={timer}
                onChange={({ target: { value } }) => dispatch(updateTimer(parseInt(value)))}
            />
            <br />
            <Button
                onClick={() => setShow(true)}
                variant="success"
            >
                Agregar Proceso
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ingrese datos del proceso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="form-process">

                        <Form.Control
                            className="form-process-input"
                            name="name" type="text"
                            placeholder="Nombre Proceso"
                            value={form.name}
                            onChange={handleChange}
                        />

                        <Form.Control
                            className="form-process-input"
                            name="burst" type="number"
                            placeholder="Rafaga"
                            value={form.burst}
                            onChange={handleChange}
                        />

                        <Form.Control
                            className="form-process-input"
                            name="incomming"
                            type="number"
                            placeholder="Tiempo llegada" min="0"
                            value={form.incomming}
                            onChange={handleChange}
                        />
                        {params.name === 'usePrioritySolver' && <Form.Control
                            className="form-process-input"
                            name="priority"
                            type="number"
                            placeholder="Prioridad" min="0"
                            value={form.priority}
                            onChange={handleChange}
                        />}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button
                        variant="success"
                        onClick={handleSubmitProcess}
                    >
                        Agregar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Button
                onClick={initProcess}
                variant={algorithmStatus ? 'secondary' : 'primary'}
            >
                {!algorithmStatus ? 'Iniciar' : 'Detener'}
            </Button>
            <br />
            <Button
                onClick={blockProcess}
                variant="danger"
            >
                Bloquear Proceso
            </Button>

            <br />
            <Form.Select value={params.name} onChange={({target: {value}}) => navigator(`/${value}`, {replace: true})} aria-label="Seleccione el algoritmo a utilizar">
                <option value="useFCFSSolver">FCFS</option>
                <option value="useSJFSolver">SJF</option>
                <option value="usePrioritySolver">Priority</option>
            </Form.Select>
        </div>
    );
}

export default ProcessSettings;
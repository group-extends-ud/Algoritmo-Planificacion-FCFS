import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Swal from 'sweetalert2';

import { ProcessModel, ProcessInputModel } from 'models/ProcessModel';
import { PropsHandler } from "util/props";
import { getLastIncomming } from "util/processUtil";

import { TimingContext } from "context/TimingContext";
import { StartedProcessContext } from "context/StartedProcess";
import { CurrentProcessContext } from "context/CurrentProcessContext";
import { ComputedProcessContext } from "context/ComputedContext";
import { LockProcessContext } from "context/LockContext";

const ProcessSettings = (
    { handleProcessUpdate,
        handleTimerUpdate,
        handleStartedProcessUpdate,
        handleCurrentProcessUpdate,
        handleLockedProcessUpdate
    }: PropsHandler) => {

    const currentTimer = useContext(TimingContext);
    const isStarted = useContext(StartedProcessContext);
    const processList = useContext(ComputedProcessContext);
    const lockedProcessList = useContext(LockProcessContext);
    const currentProcess = useContext(CurrentProcessContext);

    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);

    const isLocked = (process: ProcessModel | undefined) => (process)?lockedProcessList.includes(process):false;

    const blockProcess = () => {

        const activeProcess = processList.at(currentProcess);
        const nextProcess = processList.at(currentProcess+1);
        if(activeProcess && nextProcess){
            if(isLocked(activeProcess)){
                handleLockedProcessUpdate(activeProcess!);
            }
            else{
                handleLockedProcessUpdate(nextProcess!);
            }
            handleCurrentProcessUpdate(0);
        }
    }

    const [form, setForm] = useState<{ [x: string]: string }>({ name: '', burst: '', incomming: '' });
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
                        handleProcessUpdate(new ProcessModel(
                            new ProcessInputModel(form.name, parseInt(form.incomming), parseInt(form.burst))
                        ));
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
        handleStartedProcessUpdate(!isStarted);
        handleCurrentProcessUpdate(0);
    }

    return (
        <div className='buttons'>

            <Form.Control
                id="floatingInput"
                type="number" min="1"
                value={currentTimer}
                onChange={({ target: { value } }) => handleTimerUpdate(parseInt(value))}
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
                variant={isStarted ? 'secondary' : 'primary'}
            >
                {!isStarted ? 'Iniciar' : 'Detener'}
            </Button>

            <Button
                onClick={() => blockProcess()}
                variant={isLocked(processList.at(currentProcess)) ? 'warning' : 'danger'}
            >
                {isLocked(processList.at(currentProcess)) ? 'Desbloquear Bloqueado' : 'Bloquear Proceso'}
            </Button>
        </div>
    );
}

export default ProcessSettings;
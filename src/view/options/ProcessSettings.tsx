import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Modal from "react-bootstrap/Modal";

import { ProcessModel, ProcessInputModel } from 'models/ProcessModel';
import { PropsHandler } from "util/props";
import { TimingContext } from "context/TimingContext";
import { StartedProcessContext } from "context/StartedProcess";

const ProcessSettings = ({ handleProcessUpdate, handleTimerUpdate, handleStartedProcessUpdate }: PropsHandler) => {

    const currentTimer = useContext(TimingContext);
    const isStarted = useContext(StartedProcessContext);

    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);

    const [form, setForm] = useState<{ [x: string]: string }>({ name: '', burst: '', incomming: '' });
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmitProcess = (): void => {

        handleProcessUpdate(new ProcessModel(
            new ProcessInputModel(form.name, parseInt(form.incomming), parseInt(form.burst))
        ));

        setForm({ name: '', burst: '', incomming: '' });
        handleClose();
    }

    return (
        <div className='buttons'>
            <FloatingLabel controlId="floatingInput" label="Segundos">
                <Form.Control id="floatingInput" type="number" min="1" value={currentTimer} onChange={({target: {value}}) => handleTimerUpdate(parseInt(value))} />
            </FloatingLabel>
            <br />
            <Button variant="success" onClick={() => setShow(true)}>Agregar Proceso</Button>

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

            <Button onClick={() => handleStartedProcessUpdate(!isStarted)} variant={isStarted? 'danger' : 'primary'}>{!isStarted? 'Iniciar' : 'Detener'}</Button>
        </div>
    );
}

export default ProcessSettings;
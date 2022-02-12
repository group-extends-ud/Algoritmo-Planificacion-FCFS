import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Modal from "react-bootstrap/Modal";

import { ProcessModel, ProcessInputModel } from 'models/ProcessModel';
import { PropsHandler } from "util/props";

const ProcessSettings = ({ handleProcessUpdate }: PropsHandler) => {

    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);

    const [form, setForm] = useState<any>({});
    const handleChange = (e: any) => setForm({ [e.target.name]: e.target.value, ...form });
    const handleSubmitProcess = (): void => {

        const process: ProcessInputModel = new ProcessInputModel(
            form.name,
            form.burst,
            form.incomingTime
        );

        console.log(form);

        handleProcessUpdate(new ProcessModel(process));

        handleClose();
    }

    return (
        <div className='buttons'>
            <FloatingLabel controlId="floatingInput" label="Segundos">
                <Form.Control id="floatingInput" type="number" min="1" />
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
                            onChange={handleChange}
                        />

                        <Form.Control
                            className="form-process-input"
                            name="burst" type="number"
                            placeholder="Rafaga"
                            onChange={handleChange}
                        />

                        <Form.Control
                            className="form-process-input"
                            name="incomingTime"
                            type="number"
                            placeholder="Tiempo llegada" min="0"
                            onChange={handleChange}
                        />
                        <hr />
                        <div className="form-process-buttons">

                        </div>
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

            <Button>Iniciar</Button>
        </div>
    );
}

export default ProcessSettings;
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Modal from "react-bootstrap/Modal";

const ProcessSettings = () => {
    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
    return (
        <div className='buttons'>
            <FloatingLabel controlId="floatingInput" label="Segundos">
                <Form.Control type="number" min="30" />
            </FloatingLabel>
            <Button onClick={() => setShow(true)}>Agregar Proceso</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ProcessSettings;
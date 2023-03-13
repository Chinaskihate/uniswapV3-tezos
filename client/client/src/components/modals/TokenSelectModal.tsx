import React, {useState} from 'react';
import {Button, Container, Modal, Row} from "react-bootstrap";
import './TokenSelectModal.css';

const TokenSelectModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary rounded-button" onClick={handleShow}>
                Select token
            </Button>

            <Modal className="my-modal" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select token</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>1</Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <Button className="col-12 rounded-default" onClick={handleClose}>Cancel</Button>
                    </div>
                    <div>
                        <Button className="col-12 rounded-default" onClick={handleClose}>Select</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TokenSelectModal;
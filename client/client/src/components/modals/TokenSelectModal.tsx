import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select token</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Token 1</div>
                    <div>Token 2</div>
                    <div>Token 3</div>
                    <div>Token 4</div>
                    <div>Token 5</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TokenSelectModal;
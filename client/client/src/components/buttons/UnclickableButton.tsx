import React, {useState, FC} from 'react';
import {Button, Container, Modal, Row} from "react-bootstrap";
import './UnclickableButton.css';
import { BaseToken } from '../../entities/baseToken';
import { TokenProvider } from '../../provider/tokenProvider';
import { TokenWithBaseStatistics } from '../../entities/tokenWithBaseStatistics';
import TokenList from '../lists/token/TokenList';
import { StringifyOptions } from 'querystring';

interface Props {
    buttonText: string;
    errorText: string;
}

const ErrorButton: FC<Props> = ({buttonText, errorText}) => {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = async () =>  {
        setShow(true);
    }
    return (
        <>
            <Button variant="primary rounded-button" onClick={handleShow}>
                {buttonText}
            </Button>

            <Modal className="my-modal" show={show} onHide={handleClose}>
                <Modal.Header className='custom-modal-header' closeButton>
                    <Modal.Title>Incorrect Min and Max values</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <div>
                        <Button className="col-12 rounded-default" onClick={handleClose}>Close</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ErrorButton;
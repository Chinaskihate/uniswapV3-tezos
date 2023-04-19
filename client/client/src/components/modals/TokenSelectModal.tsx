import React, {useState, FC} from 'react';
import {Button, Container, Modal, Row} from "react-bootstrap";
import './TokenSelectModal.css';
import { BaseToken } from '../../entities/baseToken';
import { TokenProvider } from '../../provider/tokenProvider';
import { TokenWithBaseStatistics } from '../../entities/tokenWithBaseStatistics';
import TokenList from '../lists/token/TokenList';
import {useDispatch, useSelector} from "react-redux";
import {actionCreators, RootState} from "../../store";
import {bindActionCreators} from "redux";

interface Props {
    setAddress: (address: string) => void;
}

const TokenSelectModal: FC<Props> = ({setAddress}) => {

    const api_provider = new TokenProvider();

    const [show, setShow] = useState(false);
    const [token, setToken] = useState<TokenWithBaseStatistics>();
    const [tokens, setTokens] = useState<TokenWithBaseStatistics[]>([]);

    const handleClose = () => setShow(false);
    const handleShow = async () =>  {
        setShow(true);
        const new_token = await api_provider.findAllByNames();
        setTokens(new_token);
    }

    const handleSelect = (token: TokenWithBaseStatistics) => {
        console.log("token selected: " + token.fullName)
        setToken(token);
        setAddress(token.address);
        handleClose();
    }

    return (
        <>
            <Button variant="primary rounded-button" onClick={handleShow}>
                {token ? (token?.fullName) : ("Select Token")}
            </Button>

            <Modal className="my-modal" show={show} onHide={handleClose}>
                <Modal.Header className='custom-modal-header' closeButton>
                    <Modal.Title>Select token</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <TokenList tokens = {tokens} onClick={handleSelect}></TokenList>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <Button className="col-12 rounded-default" onClick={handleClose}>Cancel</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TokenSelectModal;
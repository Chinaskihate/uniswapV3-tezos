import classes from './SwapPage.module.css'
import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row} from "react-bootstrap";
import DefaultInput from "../../components/inputs/DefaultInput";
import ConnectButton from "../../components/buttons/ConnectButton";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import SwapButton from "../../components/buttons/SwapButton";

const SwapPage = () => {
    const [sellValue, setSell] = useState('');
    const [buyValue, setBuy] = useState('');
    const storeUserAddress = useSelector((state: RootState) => state.userAddress);

    const handleSell = (value: string) => {
        if (value.match(/^\d{1,}(\.\d{0,4})?$/)) {
            setSell(value);
        }
    };

    const handleBuy = (value: string) => {
        if (value.match(/^\d{1,}(\.\d{0,5})?$/)) {
            setBuy(value);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center m-5">
            <Container className="col-xl-4 col-lg-6 col-md-10 col-xs-12">
                <div className={classes.change_container}>
                    <Col>
                        <Row className="text-center">
                            <label className="flex-fill fs-1">
                                Swap
                            </label>
                        </Row>
                        <Row className="text-center">
                            <div className="flex-fill m-3">
                                <DefaultInput placeholder="Sell..." setValue={handleSell} value={sellValue}/>
                            </div>
                        </Row>
                        <Row className="text-center">
                            <div className="flex-fill m-3">
                                <DefaultInput placeholder="Buy..." setValue={handleBuy} value={buyValue}/>
                            </div>
                        </Row>
                        <Row className="text-center">
                            <div className="flex-fill fs-1">
                                {storeUserAddress
                                    ? <SwapButton/>
                                    : <ConnectButton/>}
                            </div>
                        </Row>
                    </Col>
                </div>
            </Container>
        </div>
    )
}

export default SwapPage;
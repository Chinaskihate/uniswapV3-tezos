import classes from './PoolPreviewPage.module.css'
import {Col, Container, Row} from "react-bootstrap";
import ConnectButton from "../../components/buttons/ConnectButton";
import {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import SwapButton from "../../components/buttons/SwapButton";
import TwoInputs from "../../components/inputs/TwoInputs";
import EmptyInput from "../../components/inputs/EmptyInput";

const PoolPreviewPage = () => {
    const [sellFirstValue, setFirstSell] = useState('');
    const [buyFirstValue, setFirstBuy] = useState('');
    const [sellSecondValue, setSecondSell] = useState('');
    const [buySecondValue, setSecondBuy] = useState('');
    const storeUserAddress = useSelector((state: RootState) => state.userAddress);

    const handleFirstSell = (value: string) => {
        if (value.match(/^\d{1,}(\.\d{0,4})?$/)) {
            setFirstSell(value);
        }
    };

    const handleSecondSell = (value: string) => {
        if (value.match(/^\d{1,}(\.\d{0,4})?$/)) {
            setSecondSell(value);
        }
    };

    const handleFirstBuy = (value: string) => {
        if (value.match(/^\d{1,}(\.\d{0,5})?$/)) {
            setFirstBuy(value);
        }
    };

    const handleSecondBuy = (value: string) => {
        if (value.match(/^\d{1,}(\.\d{0,5})?$/)) {
            setSecondBuy(value);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center pt-5" style={{height: "100vh"}}>
            <Container className="col-xl-6 col-lg-6 col-md-10 col-xs-12 mt-5">
                <div className={classes.change_container}>
                    <Col>
                        <Row className="text-center">
                            <label className="flex-fill fs-1">
                                Pools
                            </label>
                        </Row>
                        <Row>
                            <Col>
                                <div className="flex-fill m-3">
                                    <EmptyInput placeholder="First amount..." setValue={() => {
                                    }} value=""/>
                                </div>
                            </Col>
                        </Row>
                        <Row className="text-center">
                            <Col>
                                <div className="flex-fill m-3">
                                    <TwoInputs firstPlaceholder="First sell..." setFirstValue={setFirstSell}
                                               firstValue={sellFirstValue} secondPlaceholder="Second sell..."
                                               setSecondValue={setSecondSell}
                                               secondValue={sellSecondValue}/>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="flex-fill m-3">
                                    <EmptyInput placeholder="First amount..." setValue={() => {
                                    }} value=""/>
                                </div>
                            </Col>
                        </Row>
                        <Row className="text-center">
                            <Col>
                                <div className="flex-fill m-3">
                                    <TwoInputs firstPlaceholder="First buy..." setFirstValue={setFirstSell}
                                               firstValue={sellFirstValue} secondPlaceholder="Second buy..."
                                               setSecondValue={setSecondSell}
                                               secondValue={sellSecondValue}/>
                                </div>
                            </Col>
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

export default PoolPreviewPage;
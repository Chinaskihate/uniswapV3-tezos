import classes from './PoolPreviewPage.module.css'
import {Col, Container, Row} from "react-bootstrap";
import ConnectButton from "../../components/buttons/ConnectButton";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import SwapButton from "../../components/buttons/SwapButton";
import TwoInputs from "../../components/inputs/TwoInputs";
import EmptyInput from "../../components/inputs/EmptyInput";
import CreatePoolButton from "../../components/buttons/CreatePoolButton";

const PoolPreviewPage = () => {
    const [sellFirstValue, setFirstSell] = useState('');
    const [buyFirstValue, setFirstBuy] = useState('');
    const [sellSecondValue, setSecondSell] = useState('');
    const [buySecondValue, setSecondBuy] = useState('');
    const storeUserAddress = useSelector((state: RootState) => state.userAddress);
    const data: string[] = [];

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
            <Container className="col-xl-12 col-lg-12 col-md-10 col-xs-12 mt-5">
                <div className={classes.change_container}>
                    <Row>
                        <Col>
                            <div className="col-xl-3">
                                <Row>
                                    <div className="fs-1">Pools:</div>
                                </Row>
                                <Row className="g-0">
                                    <div className="d-flex"
                                         style={{height: "100%"}}>
                                        <div className="flex-fill"
                                             style={{fontSize: "2rem"}}>
                                            <Container>
                                                <div className="mt-1 data px-3">
                                                    <Row className="table-row">Loading...</Row>
                                                </div>
                                            </Container>
                                        </div>
                                    </div>
                                </Row>
                            </div>
                        </Col>
                        <div className="col-xl-9">
                            <Col>
                                <Row className="text-center">
                                    <label className="flex-fill fs-1">
                                        Create
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
                                            <TwoInputs firstPlaceholder="First min..." setFirstValue={setFirstSell}
                                                       firstValue={sellFirstValue}
                                                       secondPlaceholder="First max..."
                                                       setSecondValue={setSecondSell}
                                                       secondValue={sellSecondValue}/>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="flex-fill m-3">
                                            <EmptyInput placeholder="Second amount..." setValue={() => {
                                            }} value=""/>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="text-center">
                                    <Col>
                                        <div className="flex-fill m-3">
                                            <TwoInputs firstPlaceholder="Second min..." setFirstValue={setFirstSell}
                                                       firstValue={sellFirstValue} secondPlaceholder="Second max..."
                                                       setSecondValue={setSecondSell}
                                                       secondValue={sellSecondValue}/>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="text-center">
                                    <div className="flex-fill fs-1">
                                        {storeUserAddress
                                            ? <CreatePoolButton/>
                                            : <ConnectButton/>}
                                    </div>
                                </Row>
                            </Col>
                        </div>
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export default PoolPreviewPage;
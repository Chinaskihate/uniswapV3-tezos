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
import PoolList from "../../components/lists/pool/PoolList";
import Pool from "../../components/lists/pool/IPool";

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

    const handlePoolClick = (id: number) => {
        //TODO Add modal for pool stats
        console.log(id);
    }


    // TODO Replace mock-data with data fetching
    const fetchedPools: Pool[] = [
        {
          id: 1,
          tokenPair: 'ETH/BTC',
          minValue: 0.1,
          maxValue: 0.14,
          percentage: 1,
        },
        {
          id: 2,
          tokenPair: 'Token 2 / Token 3',
          minValue: 0.96,
          maxValue: 1.1,
          percentage: 1,
        },
        {
          id: 3,
          tokenPair: 'Token 1 / Token 3',
          minValue: 0.45,
          maxValue: 0.654,
          percentage: 1,
        },
        {
          id: 3,
          tokenPair: 'Token 1 / Token 3',
          minValue: 0.45,
          maxValue: 0.654,
          percentage: 1,
        },
        {
          id: 3,
          tokenPair: 'Token 1 / Token 3',
          minValue: 0.45,
          maxValue: 0.654,
          percentage: 1,
        },
        {
          id: 3,
          tokenPair: 'Token 1 / Token 3',
          minValue: 0.45,
          maxValue: 0.654,
          percentage: 1,
        }
      ];
    // TODO Make the text in input smaller
    return (
        <div className="d-flex justify-content-center align-items-center pt-5 mt-4" style={{ height: '100vh', zIndex: 1 }}>
        <Container className="col-xl-12 col-lg-12 col-md-10 col-xs-12 mt-5">
          <div className={classes.change_container}>
            <Row>
              <Col>
                <div className="col-xl-12">
                  <Row className = "text-center">
                    <div className="fs-1">Pools:</div>
                  </Row>
                  <Row className="g-0">
                    <div className="d-flex" style={{ height: '500px' }}>
                      <div className="flex-fill" style={{ fontSize: '2rem', overflowY: 'auto' }}>
                        <Container>
                          <PoolList pools={fetchedPools} onClick={handlePoolClick}></PoolList>
                        </Container>
                      </div>
                    </div>
                  </Row>
                </div>
              </Col>
                        <div className="col-xl-4">
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
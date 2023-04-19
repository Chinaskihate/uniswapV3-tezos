import classes from './PoolPreviewPage.module.css'
import {Col, Container, Row} from "react-bootstrap";
import ConnectButton from "../../components/buttons/ConnectButton";
import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import SwapButton from "../../components/buttons/SwapButton";
import TwoInputs from "../../components/inputs/TwoInputs";
import EmptyInput from "../../components/inputs/EmptyInput";
import CreatePoolButton from "../../components/buttons/CreatePoolButton";
import PoolList from "../../components/lists/pool/PoolList";
import Position from "../../components/lists/pool/IPool";
import { Modal } from "react-bootstrap";
import {Button} from 'react-bootstrap';
import TokenSelectModal from '../../components/modals/TokenSelectModal';
import DefaultInput from '../../components/inputs/DefaultInput';
import { PoolProvider } from '../../provider/poolProvider';
import { Alert } from '@mui/material';
import { AlertTitle } from '@mui/material';
import { PoolService } from '../../services/PoolService';
import {useDispatch} from "react-redux";
import {actionCreators} from "../../store";
import {bindActionCreators} from "redux";

const PoolPreviewPage = () => {

    const [minPrice, setMinPrice] = useState('');
    const [firstVal, setFirstVal] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [secondVal, setSecondVal] = useState('');
  
    const [showModal, setShowModal] = useState(false);
    
    const handleCloseModal = () =>  {
      setShowModal(false);
      setWithdrawing(false)
      setWithdrawn(false)
    }

    
    const [selectedPosition, setSelectedPosition] = useState<Position>();

    const [pools, setPools] = useState<Position[]>([]);

    const [withdrawing, setWithdrawing] = useState<boolean>();

    const [withdrawn, setWithdrawn] = useState<boolean>();

    const [fetching, setFetching] = useState<boolean>();
    const storeUserAddress = useSelector((state: RootState) => state.userAddress);
    const data: string[] = [];
    const poolProvider = new PoolProvider();

    const handleFirstSell = (value: string) => {
        if (value.match(/^\d{1,}(\.\d{0,4})?$/)) {
            setMinPrice(value);
        }
    };

    const tokenAddresses = useSelector((state: RootState) => state.swapToken);
    const dispatch = useDispatch();
    const {
        setFirstAddress: setFirstPoolAddress,
        setSecondAddress: setSecondPoolAddress
    } = bindActionCreators(actionCreators, dispatch);

    const handleSecondSell = (value: string) => {
        if (value.match(/^\d{1,}(\.\d{0,4})?$/)) {
            setMaxPrice(value);
        }
    };

    const handleFirstBuy = (value: string) => {
        if (value.match(/^\d{1,}(\.\d{0,5})?$/)) {
            setFirstVal(value);
        }
    };

    const handleSecondBuy = (value: string) => {
        if (value.match(/^\d{1,}(\.\d{0,5})?$/)) {
            setSecondVal(value);
        }
    };

    const handlePoolClick = async (pool: Position) => {
      setShowModal(true);
      console.log("Getting pool stats: " + pool.secondToken); 
      
      try {
        // Fetching to be added
        /*
        const extendedTokenStats = await apiProvider.findByAddress(token.address);
        console.log("Fetched token: " + extendedTokenStats.fullName)
        console.log("Price stamp" + extendedTokenStats.statistics)
        */
        setSelectedPosition(pool);
      } catch (error) {
        console.error(error);
      }
  };
  
  const poolService = new PoolService()

  const handleWithdraw = async () => {
    setWithdrawing(true)
    await poolService.withdrawDeposit(selectedPosition?.firstTokenAddress!, 
        selectedPosition?.secondTokenAddress!, selectedPosition?.id!)
    setShowModal(false);
    setWithdrawing(false)
    setFetching(true)
    setPools([])
    const contractData = await poolProvider.getPositions();
    setPools(contractData);
    setFetching(false)
  }
  const handleCollectFees = async () => {
    setWithdrawing(true)
    await poolService.collectFees(selectedPosition?.firstTokenAddress!, 
        selectedPosition?.secondTokenAddress!, selectedPosition?.id!)
    setWithdrawing(false)
    setWithdrawn(true)
    setFetching(true)
    const position = selectedPosition
    setSelectedPosition(undefined)
    const contractData = await poolProvider.getPositions();
    setPools(contractData);
    setSelectedPosition(position)
    setFetching(false)

  }


  const handleCreatePool = async () => {
    const first_address = tokenAddresses.first_address
    const second_address = tokenAddresses.second_address
    console.log("Adding deposit: " + first_address + " " + second_address); 
    
    try {
      poolService.deposit(first_address, second_address, parseInt(firstVal), 
          parseInt(secondVal), parseInt(minPrice), parseInt(maxPrice))
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleSelectFirstToken = async (address: string) => {
    console.log("Setting first token: " + address); 
    setFirstPoolAddress(address)
  };
  
  const handleSelectSecondToken = async (address: string) => {
    console.log("Setting second token: " + address); 
    setSecondPoolAddress(address)
  };

    useEffect(() => {
      (async () => {
          setFetching(true)
          const contractData = await poolProvider.getPositions();
          setPools(contractData);
          setFetching(false)
      })();
  }, []);


    return (
        <div className="d-flex justify-content-center align-items-center pt-5 mt-4" style={{ height: '100vh', zIndex: 1 }}>
        <Container className="flex-fill mt-5">
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
                        <Container className = "pool-list">
                          {pools.length == 0 ? (
                            <>
                            {fetching ? (
                             <>Loading...</>
                            ) : (
                              <>No pools</>
                            )}
                            </>
                          ) :  (
                          <PoolList pools={pools} onClick={handlePoolClick}></PoolList>
                          )}
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
                                        <div className="row flex-fill m-3">
                                        <DefaultInput placeholder="First value" setValue={setFirstVal} value={firstVal}/>
                                          <div className="row col-12">
                                              <TokenSelectModal setAddress={handleSelectFirstToken}/>
                                          </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="row flex-fill m-3">
                                        <DefaultInput placeholder="Second value" setValue={setSecondVal} value={secondVal}/>
                                          <div className="row col-12">
                                              <TokenSelectModal setAddress={handleSelectSecondToken}/>
                                          </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="text-center">
                                    <Col>
                                        <div className="row flex-fill m-3">
                                            <TwoInputs firstPlaceholder="Min..." setFirstValue={setMinPrice}
                                                       firstValue={minPrice}
                                                       secondPlaceholder="Max..."
                                                       setSecondValue={setMaxPrice}
                                                       secondValue={maxPrice}/>
                                        </div>
                                          
                                          <div className="row col-12" style={{marginLeft: "-10px"}}>            
                                        {storeUserAddress
                                            ? <CreatePoolButton onClick={handleCreatePool}/>
                                            : <ConnectButton/>}
                                            </div>
                                    </Col>
                                </Row>
                                <Row className="text-center">
                                  <Col>
                                    <div className="row flex-fill m-3">
                                    </div>
                                  </Col>
                                </Row>
                            </Col>
                        </div>
                    </Row>
                </div>
            </Container>
            <Modal show={showModal} onHide={handleCloseModal} className="custom">
                <Modal.Header closeButton className="custom-modal-header">
                    <Modal.Title>{selectedPosition?.firstToken} / {selectedPosition?.secondToken} Pool Statistics</Modal.Title>
                </Modal.Header>
                <Modal.Body className='custom-modal-body'>
                    {selectedPosition ? (
                    <Row>
                        <Col className="col-6">
                            <div className="modal-label">Token pair:</div>
                            <div className="modal-value">{selectedPosition.firstToken}/{selectedPosition.secondToken}</div>
                            <div className="modal-label">Min price:</div>
                            <div className="modal-value">{selectedPosition.minValue}</div>
                            <div className="modal-label">{selectedPosition.firstToken} value:</div>
                            <div className="modal-value">{Math.round(selectedPosition.firstTokenVal * 100) / 100}</div>
                            <div className="modal-label">{selectedPosition.firstToken} fees collected:</div>
                            <div className="modal-value">{Math.round(selectedPosition.firstFeeEarned * 100) / 100}</div>
                        </Col>
                        <Col className="col-6"> 
                            <div className="modal-label">Fee:</div>
                            <div className="modal-value">1%</div>
                            <div className="modal-label">Max price:</div>
                            <div className="modal-value">{selectedPosition.maxValue}</div>
                            <div className="modal-label">{selectedPosition.secondToken} value:</div>
                            <div className="modal-value">{Math.round(selectedPosition.secondTokenVal * 100) / 100}</div>
                            <div className="modal-label">{selectedPosition.secondToken} fees collected:</div>
                            <div className="modal-value">{Math.round(selectedPosition.secondFeeEarned * 100) / 100}</div>
                        </Col>
                    </Row>
                    ) : (

                    <div>Loading...</div>
                    )}
                    <div>
                    {withdrawing ? (
                      <Alert severity="info" onClose={() => {setWithdrawing(false)}}>
                        <AlertTitle>Collecting...</AlertTitle>
                        Fees collection in progress<strong> please wait!</strong>
                      </Alert>
                      ) : (
                        <></>
                      )}
                    </div>
                  <div>
                  {withdrawn ? (
                    <Alert severity="success" onClose={() => {setWithdrawn(false)}}>
                      <AlertTitle>Collected!</AlertTitle>
                      Fees collected successfully!
                    </Alert>
                    ) : (
                      <></>
                    )}
                  </div>
                </Modal.Body>
                <Modal.Footer className="custom-modal-header">
                    <Button variant="secondary" onClick={handleCollectFees} className="modal-button">
                    Collect fees
                    </Button>
                    <Button variant="secondary" onClick={handleWithdraw} className="modal-button">
                    Withdraw and collect fees
                    </Button>
                    <Button variant="secondary" onClick={handleCloseModal} className="modal-button">
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </div>
    )
}

export default PoolPreviewPage;
import {Col, Container, Row} from "react-bootstrap";
import "./Statistics.css";
import {useState, useEffect} from 'react'
import {TokenWithBaseStatistics} from "../../entities/tokenWithBaseStatistics";
import { TokenWithExtendedStatistics } from "../../entities/tokenWithExtendedStatistics";
import {BaseStatistics} from "../../entities/baseStatistics";
import {TokenProvider} from "../../provider/tokenProvider";
import { PriceStamp } from "../../entities/priceStamp";
import TokenStatsList from '../../components/lists/token-stats/TokenStatsList';
import { Modal } from "react-bootstrap";
import {Button} from "react-bootstrap";
import PriceChart from "../../components/charts/priceChart";
import DefaultInput from "../../components/inputs/DefaultInput";
import EmptyInput from "../../components/inputs/EmptyInput";
import PeriodDropDown from "../../components/lists/drop-down-menu/PeriodDropDown";


export default function AllTokenStats() {


    const [showModal, setShowModal] = useState(false);
    const [selectedToken, setSelectedToken] = useState<TokenWithExtendedStatistics>();
    const [selectedPriceStamps, setSelectedPriceStamps] = useState<PriceStamp[]>();

    const apiProvider = new TokenProvider();
    const [data, setData] = useState<TokenWithBaseStatistics[]>([]);
    const [filter, setFilter] = useState('');
    const [period, setPeriod] = useState('');

    const handleFilterChange = async (value: string) => {
        setFilter(value)
        const serverData = await apiProvider.findAllByNamesFilter(value);
        setData(serverData);
    }

    useEffect(() => {
        (async () => {
            const serverData = await apiProvider.findAllByNames();
            setData(serverData);
        })();
    }, []);

    const handleTokenStatsClick = async (token: TokenWithBaseStatistics) => {
        setShowModal(true);
        console.log("Getting token stats: " + token.address);
        try {
          const extendedTokenStats = await apiProvider.findByAddress(token.address);
          console.log("Fetched token: " + extendedTokenStats.fullName);
          setSelectedToken(extendedTokenStats);
          const priceStamps = await apiProvider.findPriceStampsByAddress(token.address, "all");
          setSelectedPriceStamps(priceStamps);
        } catch (error) {
          console.error(error);
        }
    };

    const handleSetPeriod = async (option: string) => {
        setPeriod(option)
        if (selectedToken != undefined) {
            const add = selectedToken.address
            console.log('Fetching: ' + selectedToken?.address + option);
            const priceStamps = await apiProvider.findPriceStampsByAddress(add, option);
            setSelectedPriceStamps(priceStamps);
        } else {
            console.error("No token selected")
        }
    }

    const handleCloseModal = () => setShowModal(false);
    
    return (
        <div>
                
            <div className="d-flex justify-content-center mt-5 pt-5 px-5" style={{height: "100vh"}}>
                <div className="all_container flex-fill mt-5 ml-5 mr-5" style={{fontSize: "2rem"}}>
                <div className="flex-fill m-3">
                    <EmptyInput placeholder="" setValue={handleFilterChange} value={filter}></EmptyInput>
                </div>
                    <Container>
                        <Row>
                            <Col xs={3} className="center">Name</Col>
                            <Col xs={3} className="center"></Col>
                            <Col xs={3} className="center"></Col>
                            <Col xs={3} className="center">Price</Col>
                        </Row>
                        <div className="mt-1 data px-3">
                            {data.length === 0
                                ?
                                <Row className="table-row">Loading...</Row>
                                :
                                <TokenStatsList tokens={data} onClick={handleTokenStatsClick}></TokenStatsList>
                            }
                        </div>
                    </Container>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal} className="custom-modal">
                <Modal.Header closeButton className="custom-modal-header">
                    <Modal.Title>{selectedToken?.fullName} Statistics</Modal.Title>
                </Modal.Header>
                <Modal.Body className='custom-modal-body'>
                    {selectedToken ? (
                    <Row>
                        <Col className="col-6">
                            <div className="modal-label">Full Name:</div>
                            <div className="modal-value">{selectedToken?.fullName}</div>
                            <div className="modal-label">Address:</div>
                            <div className="modal-value">{selectedToken?.address}</div>
                            <div className="modal-label">Total Volume:</div>
                            <div className="modal-value">{selectedToken?.statistics.totalVolume}</div> 
                            <PriceChart data={selectedPriceStamps as PriceStamp[]}></PriceChart>
                            <PeriodDropDown onSelect={handleSetPeriod}></PeriodDropDown>
                        </Col>
                        <Col className="col-6">
                            <div className="modal-label">Total Value Locked:</div>
                            <div className="modal-value">{selectedToken?.statistics.totalValueLocked}</div>
                            <div className="modal-label">Volume For Day:</div>
                            <div className="modal-value">{selectedToken?.statistics.volumeForDay}</div>
                        </Col>
                    </Row>
                    ) : (
                    <div>Loading...</div>
                    )}
                </Modal.Body>
                <Modal.Footer className="custom-modal-header">
                    <Button variant="secondary" onClick={handleCloseModal} className="modal-button">
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

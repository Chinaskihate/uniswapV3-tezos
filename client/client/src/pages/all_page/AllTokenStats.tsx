import {Col, Container, Row} from "react-bootstrap";
import "./Statistics.css";
import {useState, useEffect} from 'react'
import {TokenWithBaseStatistics} from "../../entities/tokenWithBaseStatistics";
import { TokenWithExtendedStatistics } from "../../entities/tokenWithExtendedStatistics";
import {BaseStatistics} from "../../entities/baseStatistics";
import {TokenProvider} from "../../provider/tokenProvider";
import TokenStatsList from '../../components/lists/token-stats/TokenStatsList';
import { Modal } from "react-bootstrap";
import {Button} from "react-bootstrap";


export default function AllTokenStats() {


    const [showModal, setShowModal] = useState(false);
    const [selectedToken, setSelectedToken] = useState<TokenWithExtendedStatistics>();

    

    const apiProvider = new TokenProvider();
    const [data, setData] = useState<TokenWithBaseStatistics[]>([]);

    useEffect(() => {
        (async () => {
            const serverData = await apiProvider.findAllByNames();
            //TODO Fix tokenProvider return type
            setData(serverData);
        })();
    }, []);

    const handleTokenStatsClick = async (token: TokenWithBaseStatistics) => {
        setShowModal(true);
        console.log("Getting token stats: " + token.address);
        
        try {
          const extendedTokenStats = await apiProvider.findByAddress(token.address);
          console.log("Fetched token: " + extendedTokenStats.fullName)
          console.log("Price stamp" + extendedTokenStats.statistics)
          setSelectedToken(extendedTokenStats);
        } catch (error) {
          console.error(error);
        }
    };
    const handleCloseModal = () => setShowModal(false);
    
    //TODO add pricestamps to modal
    return (
        <div className="d-flex justify-content-center mt-5 pt-5 px-5" style={{height: "100vh"}}>
            <div className="all_container flex-fill mt-5 ml-5 mr-5" style={{fontSize: "2rem"}}>
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
            
            <Modal show={showModal} onHide={handleCloseModal} className="custom">
                <Modal.Header closeButton className="custom-modal-header">
                    <Modal.Title>{selectedToken?.fullName} Statistics</Modal.Title>
                </Modal.Header>
                <Modal.Body className='custom-modal-body'>
                    {selectedToken ? (
                    <Row>
                        <Col className="col-6">
                            <div className="modal-label">Full Name:</div>
                            <div className="modal-value">{selectedToken.fullName}</div>
                            <div className="modal-label">Address:</div>
                            <div className="modal-value">{selectedToken.address}</div>
                            <div className="modal-label">Total Volume:</div>
                            <div className="modal-value">{selectedToken.statistics.totalVolume}</div>
                        </Col>
                        <Col className="col-6">
                            <div className="modal-label">Total Value Locked:</div>
                            <div className="modal-value">{selectedToken.statistics.totalValueLocked}</div>
                            <div className="modal-label">Volume For Day:</div>
                            <div className="modal-value">{selectedToken.statistics.volumeForDay}</div>
                            <div className="modal-label">Volume For Day:</div>
                            <div className="modal-value">{selectedToken.statistics.volumeForDay}</div>
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

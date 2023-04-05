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
            console.log("server data type: " + typeof serverData);
            setData(serverData);
        })();
    }, []);

    const handleTokenStatsClick = async (token: TokenWithBaseStatistics) => {
        setShowModal(true);
        console.log("Opening token stats for: " + token.address);
        
        try {
          const extendedTokenStats = await apiProvider.findByAddress(token.address);
          setSelectedToken((prev) => prev ? new TokenWithExtendedStatistics(prev.fullName, prev.shortName, prev.address, extendedTokenStats.statistics) : undefined);
        } catch (error) {
          console.error(error);
        }
    };
    const handleCloseModal = () => setShowModal(false);
    

    return (
        <div className="d-flex justify-content-center mt-5 pt-5 px-5" style={{height: "100vh"}}>
            <div className="all_container flex-fill mt-5 ml-5 mr-5" style={{fontSize: "2rem"}}>
                <Container>
                    <Row>
                        <Col xs={3} className="center">Name</Col>
                        <Col xs={3} className="center">Address</Col>
                        <Col xs={3} className="center">Price</Col>
                        <Col xs={3} className="center">Change</Col>
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
            
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedToken?.fullName} Stats</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedToken? ( 
                                <div>
                                <div>Full Name: {selectedToken.fullName}</div>
                                    <div>Address: {selectedToken.address}</div>
                                    <div>Total Volume: {selectedToken.statistics.totalVolume}</div>
                                    <div>Total Value Locked: {selectedToken.statistics.totalValueLocked}</div>
                                    <div>Volume For Day: {selectedToken.statistics.volumeForDay}</div>
                                    <div>Volume For Day: {selectedToken.statistics.volumeForDay}</div>
                                </div>
                            ) :
                            <div>Loading...</div>}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
        </div>
    )
}

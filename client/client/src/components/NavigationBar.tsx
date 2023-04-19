import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import LoginButton from "./buttons/LoginButton";
import {Col, Container, Row} from "react-bootstrap";


// TODO Add button re-coloring when pressed
const NavigationBar = () => {
    return (
        <Container fluid style={{padding: 0, position: "fixed", border: '10px solid #274852', zIndex: 10}}>
            <Row className="g-0">
                <Col>
                    <div className="buttons">
                        <Link to='/exchange' className="link">
                            <button className="button">Exchange</button>
                        </Link>
                    </div>
                </Col>
                <Col>
                    <div className="buttons">
                        <Link to='alltokenstats' className="link">
                            <button className="button">Statistics</button>
                        </Link>
                    </div>
                </Col>
                <Col>
                    <div className="buttons">
                        <Link to='pools' className="link">
                            <button className="button">Pools</button>
                        </Link>
                    </div>
                </Col>
                <Col>
                    <LoginButton/>
                </Col>
            </Row>
        </Container>
    );
};

export default NavigationBar;
import React, {Component, useEffect, useState} from 'react'
import TokenStats from '../TokenStats'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Outlet
} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import "./Statistics.css";
import {TokenWithBaseStatistics} from "../../entities/tokenWithBaseStatistics";
import {TokenProvider} from "../../provider/tokenProvider";

export default function AllTokenStats() {
    const apiProvider = new TokenProvider();
    const [data, setData] = useState<TokenWithBaseStatistics[]>([]);

    useEffect(() => {
        (async () => {
            const serverData = await apiProvider.findAllByNames();
            setData(serverData);
        })();
    }, []);


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
                            data.map(t =>
                                <Row className="table-row">
                                    <Col xs={3} className="center">
                                        {t.fullName}
                                    </Col>
                                    <Col xs={3} className="center">
                                        {t.address}
                                    </Col>
                                    <Col xs={3} className="center">
                                        {t.statistics.price}
                                    </Col>
                                    <Col xs={3} className="center">
                                        {t.statistics.change}
                                    </Col>
                                </Row>)}
                    </div>
                </Container>
            </div>
            {/*<Tab.Container id="list-group-tabs-example col-xl-12" defaultActiveKey="#link1">*/}
            {/*    <Row>*/}
            {/*        <Col sm={4}>*/}
            {/*            <ListGroup>*/}
            {/*                <ListGroup.Item action href="#link1">*/}
            {/*                    Link 1*/}
            {/*                </ListGroup.Item>*/}
            {/*                <ListGroup.Item action href="#link2">*/}
            {/*                    Link 2*/}
            {/*                </ListGroup.Item>*/}
            {/*            </ListGroup>*/}
            {/*        </Col>*/}
            {/*        <Col sm={8}>*/}
            {/*            <Tab.Content>*/}
            {/*                <Tab.Pane eventKey="#link1">*/}
            {/*                    Text1*/}
            {/*                </Tab.Pane>*/}
            {/*                <Tab.Pane eventKey="#link2">*/}
            {/*                    Text2*/}
            {/*                </Tab.Pane>*/}
            {/*            </Tab.Content>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*</Tab.Container>*/}
        </div>
        // <div>
        //   <div className="tokenlist">
        //     <h1>
        //       AllTokenStats
        //     </h1>
        //     <li>
        //       <Link to="tokenstats">TokenStats</Link>
        //     </li>
        //     <hr />
        //   </div>
        //   <Outlet />
        // </div>
    )
}

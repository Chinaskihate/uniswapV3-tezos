import React, {Component} from 'react'
import TokenStats from '../TokenStats'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Outlet
} from "react-router-dom";
import {Col, Container, ListGroup, Row, Tab} from "react-bootstrap";
import "./Statistics.css";
import {TokenWithBaseStatistics} from "../../entities/tokenWithBaseStatistics";
import {BaseStatistics} from "../../entities/baseStatistics";
import {DataGrid, GridColDef} from "@mui/x-data-grid";

export default function AllTokenStats() {
    const data: Array<TokenWithBaseStatistics> = [
        new TokenWithBaseStatistics(
            "test 11111111111111",
            "test short",
            "tawjietjaiwjie",
            new BaseStatistics(1, 1)
        ),
        new TokenWithBaseStatistics(
            "test 2222222222222222222",
            "test short",
            "tawjietjaiwjie",
            new BaseStatistics(1, 1)
        ),
        new TokenWithBaseStatistics(
            "test 333333333333333333",
            "test short",
            "tawjietjaiwjie",
            new BaseStatistics(1, 1)
        )].flatMap(i => [i, i]);


    return (
        <div className="d-flex justify-content-center mt-5 pt-5 px-5" style={{height: "100vh"}}>
            <div className="all_container flex-fill mt-5 ml-5 mr-5">
                <Container>
                    <Row>
                        <Col xs={3}>Name</Col>
                        <Col xs={3}>Address</Col>
                        <Col xs={3}>Price</Col>
                        <Col xs={3}>Change</Col>
                    </Row>
                    {data.map(t =>
                        <Row>
                            <Col xs={3}>
                                {t.fullName}
                            </Col>
                            <Col xs={3}>
                                {t.address}
                            </Col>
                            <Col xs={3}>
                                {t.statistics.price}
                            </Col>
                            <Col xs={3}>
                                {t.statistics.change}
                            </Col>
                        </Row>)}
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

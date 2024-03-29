import React, { FC } from 'react';
import './Pool.css';
import { Col, Form, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Position from './IPool';

const PoolElement: FC<Position> = ({
  minValue,
  maxValue,
  firstToken: firstToken,
  secondToken: secondToken,
}) => {
  return (
    <div className="flex-fill m-0">
      <Form className="row">
        <Row className="g-0">
          <Col className="fs-1 rounded-left position-relative">
            <p style={{ fontSize: '30px', marginTop: '10px' }}>
              min: {minValue}
            </p>
            <div className="arrow-right"></div>
          </Col>
          <Col className="fs-1 rounded-right">
            <p style={{ fontSize: '30px', textAlign: 'right', marginTop: '10px' }}>
              max: {maxValue}
            </p>
          </Col>
        </Row>
        <Button variant="primary rounded-button">
          {firstToken}  /  {secondToken}
        </Button>
      </Form>
    </div>
  );
};

export default PoolElement;

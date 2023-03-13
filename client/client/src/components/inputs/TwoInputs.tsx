import React, {FC} from 'react';
import './DefaultInput.css';
import {Col, Form, Row} from "react-bootstrap";
import TokenSelectModal from "../modals/TokenSelectModal";


interface TwoInputProps {
    firstPlaceholder: string,
    setFirstValue: (value: string) => void;
    firstValue: string;
    secondPlaceholder: string,
    setSecondValue: (value: string) => void;
    secondValue: string;
}

const DefaultInput: FC<TwoInputProps> = ({
                                             firstPlaceholder,
                                             setFirstValue,
                                             firstValue,
                                             secondPlaceholder,
                                             setSecondValue,
                                             secondValue
                                         }) => {
    return (
        <Form className="row">
            <Row className="g-0">
                <Col xs={6} xl={6} lg={6}>
                    <Form.Control className="fs-1 rounded-input-left" placeholder={firstPlaceholder}
                                  value={firstValue}
                                  onChange={(e) => setFirstValue(e.target.value)}>
                    </Form.Control>
                </Col>
                <Col xs={6} xl={6} lg={6}>
                    <Form.Control className="fs-1 rounded-input-right" placeholder={secondPlaceholder}
                                  value={secondValue}
                                  onChange={(e) => setSecondValue(e.target.value)}>
                    </Form.Control>
                </Col>
            </Row>
            <TokenSelectModal/>
        </Form>
    );
};

export default DefaultInput;
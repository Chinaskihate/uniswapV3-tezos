import { TokenWithBaseStatistics } from '../../../entities/tokenWithBaseStatistics';
import { Row, Col } from 'react-bootstrap';
import React, { FC } from 'react';

interface Props {
  tokens: TokenWithBaseStatistics[];
  onClick: (token: TokenWithBaseStatistics) => void;
}

const TokenStatsList: FC<Props> = ({ tokens, onClick }) => {
  return (
    <div>
      {tokens.length === 0 ? (
        <Row className="table-row">Loading...</Row>
      ) : (
        tokens.map((t) => (
          <Row className="table-row" onClick={() => onClick(t)}>
            <Col sm={3} md={3} className="center">
              <div>{t.fullName}</div>
              <div
                style={{
                  color: 'grey',
                  fontSize: '1rem',
                }}
              >
                {t.shortName}
              </div>
            </Col>
            <Col md={3} sm={3} xs={0}></Col>
            <Col md={3} sm={3} xs={0}></Col>
            <Col sm={3} md={3} className="center">
              <div>${t.statistics.price}</div>
              <div
                style={{
                  color: t.statistics.change > 0 ? 'green' : 'red',
                  fontSize: '1rem',
                }}
              >
                {(t.statistics.change > 0 ? '+' : '') + t.statistics.change}%
              </div>
            </Col>
          </Row>
        ))
      )}
    </div>
  );
};

export default TokenStatsList;

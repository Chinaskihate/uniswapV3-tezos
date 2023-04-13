import { TokenWithBaseStatistics } from '../../../entities/tokenWithBaseStatistics';
import { Row, Col } from 'react-bootstrap';
import React, { FC } from 'react';

interface Props {
  tokens: TokenWithBaseStatistics[];
  onClick: (token: TokenWithBaseStatistics) => void;
}

const TokenList: FC<Props> = ({ tokens, onClick }) => {
  return (
    <div>
      {tokens.length === 0 ? (
        <Row className="table-row">Loading...</Row>
      ) : (
        tokens.map((t) => (
          <Row className="table-row" onClick={() => onClick(t)}>
            <Col sm={3} md={3} className="center">
              <div 
                style={{
                  color: 'white',
                  fontSize: '2rem',
                }}>{t.fullName}</div>
              <div
                style={{
                  color: 'grey',
                  fontSize: '0.8rem',
                }}
              >
                {t.shortName}
              </div>
            </Col>
          </Row>
        ))
        
      )}
    </div>
  );
};

export default TokenList;

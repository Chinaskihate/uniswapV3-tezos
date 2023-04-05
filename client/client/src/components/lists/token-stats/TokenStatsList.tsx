import { TokenWithBaseStatistics } from '../../../entities/tokenWithBaseStatistics'
import { Row, Col } from 'react-bootstrap'
import React, {FC} from 'react';

interface Props {
    tokens: TokenWithBaseStatistics[];
    onClick: (token: TokenWithBaseStatistics) => void;
}


const TokenStatsList: FC<Props> = ({tokens, onClick}) => {
    return (
        <div>
            {tokens.length === 0
                            ?
                            <Row className="table-row">Loading...</Row>
                            :
                            tokens.map(t =>
                                <Row className="table-row" onClick={() => onClick(t)}>
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
  )
}

export default TokenStatsList;
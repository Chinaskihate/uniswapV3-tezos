import React, {FC} from 'react';
import {Button} from "react-bootstrap";
import './buttons.css';
import { SwapService } from '../../services/SwapService';

interface Props {
    onClick: () => void;
}

const SwapButton: FC<Props> = ({onClick}) => {

    return (
        <div>
            <Button className="col-12 rounded-default" onClick={onClick}>Swap</Button>
        </div>
    );
};

export default SwapButton;
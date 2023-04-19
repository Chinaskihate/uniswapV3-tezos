import React from 'react';
import {Button} from "react-bootstrap";
import './buttons.css';
import Position from '../lists/pool/IPool';

interface CreatePoolButtonProps {
    onClick: () => void;
  }

const CreatePoolButton: React.FC<CreatePoolButtonProps> = ({ onClick: onSelect }) => {
    return (
        <div>
            <Button onClick={onSelect} className="col-12 rounded-default">Create pool</Button>
        </div>
    );
};



export default CreatePoolButton;
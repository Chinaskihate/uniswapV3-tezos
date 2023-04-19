import React, {FC} from 'react';
import './DefaultInput.css';
import {Form} from "react-bootstrap";
import TokenSelectModal from "../modals/TokenSelectModal";


interface DefaultInputProps {
    placeholder: string,
    setValue: (value: string) => void;
    value: string;
}

const DefaultInput: FC<DefaultInputProps> = ({placeholder, setValue, value}) => {
    return (
        <Form>
            <Form.Control className="row flex-fill fs-1 rounded-input" placeholder={placeholder}
                          value={value}
                          onChange={(e) => setValue(e.target.value)}>
            </Form.Control>
        </Form>
    );
};

export default DefaultInput;
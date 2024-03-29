import React, {FC} from 'react';
import './DefaultInput.css';
import {Form} from "react-bootstrap";


interface EmptyInputProps {
    placeholder: string,
    setValue: (value: string) => void;
    value: string;
}

const EmptyInput: FC<EmptyInputProps> = ({placeholder, setValue, value}) => {
    return (
        <Form>
            <Form.Control className="fs-1 rounded-input-empty" placeholder={placeholder}
                          value={value}
                          onChange={(e) => setValue(e.target.value)}>
            </Form.Control>
        </Form>
    );
};

export default EmptyInput;
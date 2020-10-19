import React from 'react';
import { InputData } from "../App";
import './Input.css';

interface InputProps {
    data: InputData;
    onInputChange: (i: number, value: string) => void;
    onNameChange: (i: number, name: string) => void;
}

const Input: React.FC<InputProps> = props => {
    return (
        <div className="input-wrapper">
            <input
                className="name-input"
                onChange={(event => props.onNameChange(props.data.index, event.target.value))}
                value={props.data.name}
            />
            <input
                className="value-input"
                onChange={(event => props.onInputChange(props.data.index, event.target.value))}
                value={props.data.value}
                type="search"
            />
        </div>
    );
};

export default Input;
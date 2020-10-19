import React, { useState} from 'react';
import './App.css';
import Input from './Input/Input';

export interface InputData {
    index: number;
    name: string;
    value: string;
}

function getInitValues() {
    const arr: InputData[] = [];
    for (let i=0;i<30;i++) {
        arr.push({index: i, name: "Input"+(i + 1), value: ""})
    }
    return arr;
}

function getObject(arr: InputData[]) {
    const obj: {[k: string]: any} = {};
    return arr.reduce((accumulator, item) => {
        accumulator[item.name] = item.value;
        return obj;
    }, obj);
}

const App: React.FC = () => {
    const [inputsArray, setInputsArray]  = useState<InputData[]>(getInitValues());

    const handleSubmit = (event: React.FormEvent) => {
        fetch('/rest', {
            method: 'POST',
            body: JSON.stringify(getObject(inputsArray))
        })
            .then((response: Response) => {
            return response.json();
        })
            .then((data) => {
                console.log(data);
            });
        event.preventDefault();
    };

    const onInputChange = (i: number, value: string) => {
        const tmp = [...inputsArray];
        tmp[i].value = value;
        setInputsArray(tmp);
    };
    const onNameChange = (i: number, name: string) => {
        const tmp = [...inputsArray];
        tmp[i].name = name;
        setInputsArray(tmp);
    };

    const clearForm = () => {
        setInputsArray(getInitValues());
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {inputsArray.map(inputData => (
                    <Input
                        data={inputData}
                        onInputChange={onInputChange}
                        onNameChange={onNameChange}
                    />))}
                <div className="action-buttons">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={clearForm}>Clear</button>
                </div>
            </form>
        </>
    );

}

export default App;

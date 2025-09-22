import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import React from 'react';
import './OptionSelector.css';

function OptionSelector(props: {setOptionType: React.Dispatch<React.SetStateAction<string>>, option: string, optionName: string, allOptions: string[]}) {
    return (
        <div className = 'grid-container'>
            <div className = 'grid-item'>
                <Button variant="secondary" className = 'topselector' disabled> {props.optionName + ':'} </Button>
            </div>
            <div className = 'grid-item'>
                <Dropdown className = 'bottomselector' onSelect={(e) => { 
                    if (e) props.setOptionType(e);
                }}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {props.option}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {props.allOptions.map(option => <Dropdown.Item eventKey = {option}>{option}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
            </div>
        </div>
    )
}


export default OptionSelector
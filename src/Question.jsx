import React from 'react'
import RadioButtonComponent from './Radio';
import MultiSelectComponent from "./MultiSelect";
import CheckBoxComponent from './CheckBox';
import DropDown from './DropDown';

const Question = (props) => {
    return (
        <>
            <div>{props.displayOrder}</div>
            <div>{props.propertyQuestion}</div>
            {props.displayType === "multiselect" && <MultiSelectComponent propertyName={props.propertyName} displayOrder={props.displayOrder} question={props.propertyQuestion} allowedValues={props.allowedValues} update={(updatedQuestion) => props.update(updatedQuestion)} />}
            {props.displayType === "checkbox" && <CheckBoxComponent propertyName={props.propertyName} displayOrder={props.displayOrder} question={props.propertyQuestion} allowedValues={props.allowedValues} update={(updatedQuestion) => props.update(updatedQuestion)} />}
            {props.displayType === "radio" && <RadioButtonComponent propertyName={props.propertyName} displayOrder={props.displayOrder} question={props.propertyQuestion} allowedValues={props.allowedValues} update={(updatedQuestion) => props.update(updatedQuestion)} />}
            {props.displayType === "select" && <DropDown propertyName={props.propertyName} displayOrder={props.displayOrder} question={props.propertyQuestion} allowedValues={props.allowedValues} update={(updatedQuestion) => props.update(updatedQuestion)} />}
        </>
    )
}


export default Question
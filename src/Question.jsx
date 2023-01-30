import React from 'react'
import RadioButtonComponent from './Radio';
import MultiSelectComponent from "./MultiSelect";
import CheckBoxComponent from './CheckBox';
import DropDown from './DropDown';
import "./Question.css"
const Question = (props) => {
    return (
        <div className="block">
            <div>{props.displayOrder + ". " + props.propertyQuestion}</div>
            {props.displayType === "multiselect" && <MultiSelectComponent rest={props.reset} bookmark={props.bookmark} bookmarkClicked={props.bookmarkClicked} afterSet={props.afterSet} propertyName={props.propertyName} displayOrder={props.displayOrder} question={props.propertyQuestion} allowedValues={props.allowedValues} update={(updatedQuestion) => props.update(updatedQuestion)} />}
            {props.displayType === "checkbox" && <CheckBoxComponent rest={props.reset} bookmark={props.bookmark} bookmarkClicked={props.bookmarkClicked} afterSet={props.afterSet} propertyName={props.propertyName} displayOrder={props.displayOrder} question={props.propertyQuestion} allowedValues={props.allowedValues} update={(updatedQuestion) => props.update(updatedQuestion)} />}
            {props.displayType === "radio" && <RadioButtonComponent rest={props.reset} bookmark={props.bookmark} bookmarkClicked={props.bookmarkClicked} afterSet={props.afterSet} propertyName={props.propertyName} displayOrder={props.displayOrder} question={props.propertyQuestion} allowedValues={props.allowedValues} update={(updatedQuestion) => props.update(updatedQuestion)} />}
            {props.displayType === "select" && <DropDown rest={props.reset} bookmark={props.bookmark} bookmarkClicked={false} afterSet={props.afterSet} propertyName={props.propertyName} displayOrder={props.displayOrder} question={props.propertyQuestion} allowedValues={props.allowedValues} update={(updatedQuestion) => props.update(updatedQuestion)} />}
        </div>
    )
}


export default Question

import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { JSJP } from "./asserts";

const DropDown = (props) => {

    const categories = JSJP(props.allowedValues.map(e => {
        return {
            key: e.allowedValueCode,
            name: e.allowedValue,
            code: e.allowedValueCode
        }
    }));

    const [selectedCategory, setSelectedCategory] = useState([]);
    const nameToVal = (selectedOpts) => {
        selectedOpts.forEach(ele => {
            ele['val'] = ele['code'];
            delete ele['code'];
        })
        return selectedOpts;
    }
    let qno = props.displayOrder;
    let question = props.question;
    let property = props.propertyName;

    const updateL = (e) => {
        setSelectedCategory(e.value)
        props.update({
            question: question,
            qno: qno,
            property: property,
            values: nameToVal(JSJP(e.value))
        })
    }


    return (
        <div className="card flex justify-content-center dropdown-demo">
            <Dropdown value={selectedCategory} options={categories} onChange={updateL} optionLabel="name" placeholder="Select a City" />
        </div>
    )
}

export default DropDown;
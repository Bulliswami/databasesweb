
import React, { useState } from "react";
import { JSJP } from "./asserts";
import { RadioButton } from "primereact/radiobutton";

const RadioButtonComponent = (props) => {
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
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-3">
                {categories.map((category) => {
                    return (
                        <div key={category.key} className="flex align-items-center">
                            <RadioButton inputId={category.key} name="category" value={category} onChange={(e) => updateL(e)} checked={selectedCategory.key === category.key} />
                            <label htmlFor={category.key} className="ml-2">{category.name}</label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default RadioButtonComponent;

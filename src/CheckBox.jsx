import React, { useState } from "react";
import { JSJP } from "./asserts";
import { Checkbox } from "primereact/checkbox";

const DynamicDemo = (props) => {

    const categories = JSJP(props.allowedValues.map(e => {
        return {
            key: e.allowedValueCode,
            name: e.allowedValue,
            code: e.allowedValueCode
        }
    }));

    const [selectedCategories, setSelectedCategories] = useState([]);

    let qno = props.displayOrder;
    let question = props.question;
    let property = props.propertyName;

    const nameToVal = (selectedOpts) => {
        selectedOpts.forEach(ele => {
            ele['val'] = ele['code'];
            delete ele['code'];
        })
        return selectedOpts;
    }

    const updateL = (e) => {
        let _selectedCategories = [...selectedCategories];

        if (e.checked)
            _selectedCategories.push(e.value);
        else
            _selectedCategories = _selectedCategories.filter(category => category.key !== e.value.key);

        setSelectedCategories(_selectedCategories);
        props.update({
            question: question,
            qno: qno,
            property: property,
            values: nameToVal(JSJP(_selectedCategories))
        })
    }

    return (
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-3">
                {categories.map((category) => {
                    return (
                        <div key={category.key} className="flex align-items-center">
                            <Checkbox inputId={category.key} name="category" value={category} onChange={(e) => updateL(e)} checked={selectedCategories.some((item) => item.key === category.key)} />
                            <label htmlFor={category.key} className="ml-2">
                                {category.name}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}



export default DynamicDemo;
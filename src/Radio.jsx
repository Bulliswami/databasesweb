
import React, { useState, useEffect } from "react";
import { JSJP } from "./asserts";
import { RadioButton } from "primereact/radiobutton";

const RadioButtonComponent = (props) => {
    const [selectedCategory, setSelectedCategory] = useState([]);
    let qno = props.displayOrder;
    let question = props.question;
    let property = props.propertyName;

    useEffect(() => {
        if (props.rest) {
            resetAll();
            props.afterSet();
        }
    }, [props.rest]);

    const resetAll = () => {
        setSelectedCategory([]);
    }


    const categories = JSJP(props.allowedValues.map(e => {
        return {
            key: e.allowedValueCode,
            name: e.allowedValue,
            code: e.allowedValueCode
        }
    }));


    useEffect(() => {
        let index = Object.keys(props.bookmark).findIndex((el) => el === props.propertyName);
        if (index !== -1 && props.bookmarkClicked) {
            setSelectedCategory(categories.filter(e => e.code === props.bookmark[props.propertyName][0])[0]);
        }
        else {
            setSelectedCategory([]);
        }
    }, [props.bookmark])



    const nameToVal = (selectedOpts) => {
        selectedOpts.forEach(ele => {
            ele['val'] = ele['code'];
            delete ele['code'];
        })
        return selectedOpts;
    }


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

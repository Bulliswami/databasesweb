
import React, { useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import { JSJP } from "./asserts";

const DropDown = (props) => {
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
        else{
            setSelectedCategory([]);
        }
        
    }, [props.bookmark, props.bookmarkClicked])

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
        <div className="card flex justify-content-center dropdown-demo">
            <Dropdown value={selectedCategory} options={categories} onChange={updateL} optionLabel="name" placeholder="Select a City" />
        </div>
    )
}

export default DropDown;
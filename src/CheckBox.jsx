import React, { useState, useEffect } from "react";
import { JSJP } from "./asserts";
import { Checkbox } from "primereact/checkbox";

const DynamicDemo = (props) => {
    let qno = props.displayOrder;
    let question = props.question;
    let property = props.propertyName;
    const [selectedCategories, setSelectedCategories] = useState([]);
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
            setSelectedCategories(categories.filter(e => {
                for (let i in props.bookmark[props.propertyName]) {
                    let j = props.bookmark[props.propertyName][i]
                    if (j === e.code) {
                        return true
                    }
                }
                return false

            }))
        }
        else {
            setSelectedCategories([]);
        }
    }, [props.bookmark])


    useEffect(() => {
        if (props.rest) {
            resetAll();
            props.afterSet();
        }
    }, [props.rest]);


    const nameToVal = (selectedOpts) => {
        selectedOpts.forEach(ele => {
            ele['val'] = ele['code'];
            delete ele['code'];
        })
        return selectedOpts;
    }

    const resetAll = () => {
        setSelectedCategories([]);
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
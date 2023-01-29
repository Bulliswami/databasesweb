import React, { useState, useEffect } from "react";
import { MultiSelect } from 'primereact/multiselect';
import { JSJP } from "./asserts";

const MultiSelectComponent = (props) => {
    useEffect(() => {
        if (props.rest) {
            resetAll();
            props.afterSet();
        }
    }, [props.rest]);

    const resetAll = () => {
        setselectedQuestion([]);
    }

    let choices = JSJP(props.allowedValues.map(e => {
        return {
            name: e.allowedValue,
            code: e.allowedValueCode
        }
    }));

    let qno = props.displayOrder;
    let question = props.question;
    let property = props.propertyName;
    const [selectedQuestion, setselectedQuestion] = useState([]);

    const nameToVal = (selectedOpts) => {
        selectedOpts.forEach(ele => {
            ele['val'] = ele['code'];
            delete ele['code'];
        })
        return selectedOpts;
    }

    const updateL = (val) => {
        setselectedQuestion(val);
        props.update({
            question: question,
            qno: qno,
            property: property,
            values: nameToVal(JSJP(val))
        })
    }

    return (
        <div className="card flex justify-content-center multiselect-demo">
            <MultiSelect value={selectedQuestion} options={choices} onChange={(e) => updateL(e.value)} optionLabel="name" placeholder="Select a City" maxSelectedLabels={3} display="chip" />
        </div>
    );
}

export default MultiSelectComponent;
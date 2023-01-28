import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';


export default function BasicDoc(props) {
    const [selectedCity, setSelectedCity] = useState(null);

    const options = [...JSON.parse(JSON.stringify(props.allowedValues.map(e => ({ name: e.allowedValue }))))];
    const onCityChange = (e) => {
        setSelectedCity(e.value);
    }

    return (
        <div className="card flex justify-content-center dropdown-demo">
            <Dropdown value={selectedCity} options={options} onChange={onCityChange} optionLabel="name" placeholder="Select a City" />
        </div>
    )
}

import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Table = ({ dataItems, field1, field2 }) => {
    console.log(field1);
    console.log(dataItems);
    console.log(field2);
    return (
        <div>
            <div className="card">
                <DataTable value={dataItems} responsiveLayout="scroll">
                    <Column field={field1} header={field1.charAt(0).toUpperCase() + field1.slice(1)}></Column>
                    <Column field={field2} header={field2.charAt(0).toUpperCase() + field2.slice(1)}></Column>
                </DataTable>
            </div>
        </div>
    );
}

export default Table;




import React, { useState, useEffect } from 'react';
import DataGrid from './DataGrid';

const Myapp = () => {
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        // Fetch data from API or define static data
        setRowData([
            { id: 1, name: "John Doe", age: 25, email: "john.doe@example.com", actions:"Response" },
            { id: 2, name: "Jane Smith", age: 30, email: "jane.smith@example.com", actions:"Response" },
            { id: 3, name: "Steve Brown", age: 40, email: "steve.brown@example.com", actions:"Response" },
            { id: 4, name: "Lisa White", age: 35, email: "lisa.white@example.com", actions:"Response" },
            // Add more rows as needed
        ]);
    }, []);

    return (
        <div className="Myapp">
            <DataGrid rowData={rowData} />
        </div>
    );
};

export default Myapp;



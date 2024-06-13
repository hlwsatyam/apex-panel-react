

import React, { useState, useEffect } from 'react';
import './DataGrid.css'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Input } from 'antd';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import './DataGrid.css';

const { Search } = Input;

const DataGrid = ({ rowData }) => {
    const [gridApi, setGridApi] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);

    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    const onExportClick = () => {
        const params = {
            fileName: 'export',
            sheetName: 'Sheet1',
        };

        const gridData = gridApi.getDataAsCsv();

        const excelData = new Blob([gridData], { type: 'text/csv;charset=utf-8' });

        saveAs(excelData, 'grid_data.csv');
    };

    const onFilterTextChange = (value) => {
        setSearchText(value);
        gridApi.setQuickFilter(value);
    };

    const defaultColDef = {
        sortable: true,
        filter: true,
        resizable: true,
    };

    const renderButton = (params) => {
        const { data } = params;
        return (
            <Button type="primary" size="small" onClick={() => handleButtonClick(data)}>
                Active
            </Button>
        );
    };

    const handleButtonClick = (rowData) => {
        setSelectedRow(rowData);
        setPopupVisible(true);
    };

    return (
        <div>
            <div className="search-container">
                <Search
                    className="DivOfSeack"
                    placeholder="Search"
                    enterButton="Search"
                    size="small"
                    value={searchText}
                    onChange={(e) => onFilterTextChange(e.target.value)}
                />
                <Button onClick={onExportClick} type="primary">
                    Export to Excel
                </Button>
            </div>
            <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={[
                        { headerName: 'ID', field: 'id' },
                        { headerName: 'Name', field: 'name' },
                        { headerName: 'Age', field: 'age' },
                        { headerName: 'Email', field: 'email' },
                        { headerName: 'Actions', field: 'actions', cellRendererFramework: renderButton },
                    ]}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={10}
                    onGridReady={onGridReady}
                />
                    {popupVisible && (
                <div className="custom-popup">
                    <h2>Select Response</h2>
                    <div className="popup-buttons">
                        <Button type="primary" onClick={() => console.log('Decline clicked')}>
                            Decline
                        </Button>
                        <Button type="primary" onClick={() => console.log('Approve clicked')}>
                            Approve
                        </Button>
                        <Button type="primary" onClick={() => console.log('Ring clicked')}>
                            Ring
                        </Button>
                        <Button type="primary" onClick={() => console.log('Not reachable clicked')}>
                            Not reachable
                        </Button>
                        <Button type="primary" onClick={() => console.log('v-kyc Done clicked')}>
                            v-kyc Done
                        </Button>
                        <Button type="primary" onClick={() => console.log('v-kyc Pending clicked')}>
                            v-kyc Pending
                        </Button>
                        <Button type="primary" onClick={() => console.log('In Process clicked')}>
                            In Process
                        </Button>
                    </div>
                </div>
            )}
            </div>
        
        </div>
    );
};

export default DataGrid;




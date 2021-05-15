import React, { useEffect, useState } from 'react';
import {  AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import { useParams } from 'react-router';
import Snackbar from '@material-ui/core/Snackbar';

function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const openSnackBar = () => {
        setOpen(true);
    }

    const closeSnackBar = () => {
        setOpen(false);
    }

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.err(err))
    }

    const deleteCustomer = (url) => {
        if (window.confirm('Are you sure?')) {
            fetch(url, { method: 'DELETE' })
            .then(response => {
                if(response.ok) {
                fetchCustomers();
                openSnackBar();
        }
            else {
                alert('Something went wrong in deletion');
            }
             
        })
        .catch(err => console.err(err))
        }
    }
    
    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
        {
            method: 'POST',
            body: JSON.stringify(newCustomer),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(_ => fetchCustomers())
        .catch(err => console.err(err))
    }
    
    const updateCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(updatedCustomer),
            headers: { 'Content-Type' : 'application/json' }
        })
        .then (_ => fetchCustomers())
        .catch(err => console.error(err))
    }    

    const columns = [
        { headerName: 'First Name', field: 'firstname', sortable: true, filter: true, width: 140 },
        { headerName: 'Last Name',field: 'lastname', sortable: true, filter: true, width: 140 },
        { headerName: 'Street address', field: 'streetaddress', sortable: true, filter: true },
        { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true, width: 120 },
        { headerName: 'City', field: 'city', sortable: true, filter: true, width: 140 },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Phone', field: 'phone', sortable: true, filter: true },
        { 
            headerName: '',
            field: 'links.0.href',
            width: 100,
            cellRendererFramework: params => 
                <EditCustomer link={params.value} customer={params.data} updateCustomer={updateCustomer} />
        },
        {   
            headerName: '',
            field: 'links.0.href',
            width: 100,
            cellRendererFramework: params =>
            <IconButton color="secondary" onClick={() => deleteCustomer(params.value)}>
                <DeleteIcon />
                </IconButton>
        }
    ]


    return(
        <div>
            <AddCustomer addCustomer={addCustomer}/>
            <div className="ag-theme-material" style={{ height: 600, width: '95%', margin: 'auto' }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    floatingFilter={true}
                    suppressCellSelection={true}
                 />
            </div>
                <Snackbar 
                open={open}
                message="Customer deleted"
                autoHideDuration={3000}
                onClose={closeSnackBar}
                />
        </div>
    )
}

export default Customerlist;
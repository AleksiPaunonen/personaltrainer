import React, { useEffect, useState } from 'react';
import {  AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import { useParams } from 'react-router';

function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.err(err))
    }

    const deleteTraining = (url) => {
        if (window.confirm('Are you sure?')) {
            fetch(url, { method: 'DELETE' })
            .then(response => {
                if(response.ok) {
                fetchTrainings();
        }
            else
                alert('Something went wrong in deletion');
             
        })
        .catch(err => console.err(err))
        }
    }

    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
        {
            method: 'POST',
            body: JSON.stringify(newTraining),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(_ => fetchTrainings())
        .catch(err => console.err(err))
    }

    const columns = [
        { field: 'date', sortable: true, filter: true, width: 250 },
        { field: 'duration', sortable: true, filter: true, width: 250 },
        { field: 'activity', sortable: true, filter: true },
        { headerName: 'Last name', field: 'customer.lastname', sortable: true, filter: true, width: 250 },
        { headerName: 'First name', field: 'customer.firstname', sortable: true, filter: true, width: 250 },
        {   
            headerName: '',
            field: 'links.0.href',
            width: 100,
            cellRendererFramework: params =>
            <IconButton color="secondary" onClick={() => deleteTraining(params.value)}>
                <DeleteIcon />
                </IconButton>
        }
    ]


    return(
        <div>
        <AddTraining addTraining={addTraining}/>
        <div className="ag-theme-material" style={{ height: 600, width: '95%', margin: 'auto' }}>
            <AgGridReact
                rowData={trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                floatingFilter={true}
                suppressCellSelection={true}
            />
        </div>
        </div>
    )
}

export default Traininglist;
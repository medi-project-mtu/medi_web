import React from 'react'
import { fetchAll } from '../Firebase'
import './index.css'


export default function dashboardTable() {
    const data = fetchAll()
    //console.log(data);
    let count = 0;
    var tableRecords = data.map((record) => {
        count++;
        return (<tr>
                <td>{count}</td>
                <td>{record.name}</td>
                <td>{record.name}</td>
                <td>{record.dob}</td>
                <td><button type="button" className="btn-light details-button">Details</button></td>
                <td><button type="button" className="btn-light details-button">Medi-Predict</button></td>
                </tr>);
    })


    return (
        <div>
            <div class="table-responsive patient-table">
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Date of Birth</th>
                        <th scope="col">Details</th>
                        <th scope="col">Medi-Predict</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRecords}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

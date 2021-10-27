import React from 'react'
import { fetchAll } from '../Firebase'
import './index.css'
import { useHistory } from 'react-router'


export default function DashboardTable() {

    const history = useHistory()

    function handleDetailsRedirect(data){
        history.push(
            {
            pathname: "/profile", 
            state: {profileData: data}
    })}


    const data = fetchAll()
    console.log(data);
    let count = 0;
    var tableRecords = data.map((record) => {
        count++;
        return (<tr>
                <td className="table-dark">{count}</td>
                <td className="table-dark">{record.name}</td>
                <td className="table-dark">{record.name}</td>
                <td className="table-dark">{record.dob}</td>
                <td className="table-dark"><button type="button" className="btn-light details-button" onClick={() => {handleDetailsRedirect(record)}}>Details</button></td>
                <td className="table-dark"><button type="button" className="btn-light medi-button">Medi-Predict</button></td>
                </tr>);
    })


    return (
        <div>
            <div class="table-responsive d-flex aligns-items-center justify-content-center table-container">
                <table class="table table-striped table-sm table-dark table-borderless patient-table">
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

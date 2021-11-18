import React from "react"
import { useHistory } from 'react-router'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"


export default function DashboardTable({data}) {
    const history = useHistory()

    let count = 0;

    const getAge = (dob) => {
        const dateArr = dob.split("/")
        return Math.floor((new Date() - new Date(
                    parseInt(dateArr[2], 10),
                    parseInt(dateArr[1], 10)-1,
                    parseInt(dateArr[0], 10)
                ).getTime()) / 3.15576e10);
    }

    let tableRecords = (data.map((value) => {
        let record = value.val()
        count++;
        console.log(record);
        return (
            <tr>
                <td className="table-dark">{count}</td>
                <td className="table-dark">{record.name}</td>
                <td className="table-dark">{record.email}</td>
                <td className="table-dark">{getAge(record.dob)}</td>
                <td className="table-dark">{record.diabetes.diagnosis}</td>
                <td className="table-dark">N/A</td>
                <td className="table-dark">N/A</td>
                <td className="table-dark">
                    <Link
                        className="btn btn-light details-button"
                        to={`/profile/${count - 1}`}
                    >
                        Details
                    </Link>
                </td>
                <td className="table-dark">
                    <button type="button" className="btn-light medi-button">
                        Medi-Predict
                    </button>
                </td>
            </tr>
        );
    }))
    
    return (
        <div className="dashboard">           
            <div className="table-responsive d-flex aligns-items-center justify-content-center table-container">
                <table className="table table-striped table-sm table-dark table-borderless patient-table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Age</th>
                        <th scope="col">Diabetes</th>
                        <th scope="col">Alzheimers</th>
                        <th scope="col">Heart Disease</th>
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

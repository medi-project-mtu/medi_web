import React from "react"
import { useHistory } from 'react-router'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"


export default function DashboardTable({ data }) {

    let count = 0;
    let myList = []

    let tableRecords = (data.map((value) => {
        let record = value.val()
        count++;


        Object.entries(record.support).forEach(element => {
            myList.push(
                <tr>
                    <td className="table-dark">{record.name}</td>
                    <td className="table-dark">{record.email}</td>
                    <td className="table-dark">{element[1].subject}</td>
                    <td className="table-dark">{element[1].datetime}</td>
                    <td className="table-dark">
                        <Link
                            className="btn btn-light details-button"
                            to={`/profile/${count - 1}`}
                        >
                            View Message
                        </Link>
                    </td>
                </tr>
            );
        })
    }))

    return (
        <div className="dashboard">
            <div className="table-responsive d-flex aligns-items-center justify-content-center table-container">
                <table className="table table-striped table-sm table-dark table-borderless patient-table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Date</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRecords}
                        {myList}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

import React from "react";
import { useHistory } from "react-router";
import dateFormat, { masks } from "dateformat";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

export default function MessageTable({ data }) {
    let count = 0;
    let myList = [];
    let uniqueCount = 0; 

    let tableRecords = data.map((value) => {
        let record = value.val();
        count++;
        if (record.support) {
            Object.entries(record.support).forEach((element) => {
                const date = new Date(element[1].dateTime)
                myList.push(
                    <tr key={uniqueCount++}>
                        <td className="table-dark">
                            <Link className="btn btn-light details-button" to={`/message/${count - 1}/${element[0]}`}>
                                Open
                            </Link>
                        </td>
                        <td className="table-dark">{record.name}</td>
                        <td className="table-dark">{record.email}</td>
                        <td className="table-dark">{element[1].subject}</td>
                        <td className="table-dark">{dateFormat(date, "d mmm - h:MMtt")}</td>
                    </tr>
                );
            });
        }
    });

    return (
        <div className="message-table">
            <div className="table-responsive d-flex aligns-items-center justify-content-center table-container">
                <table className="table table-striped table-sm table-dark table-borderless patient-table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRecords}
                        {myList}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

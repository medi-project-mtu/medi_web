import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router'
import LoadingOverlay from 'react-loading-overlay-ts'


export default function DashboardTable({snapshots, dbLoading, dbError}) {
    
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [tableRecords, setTableRecords] = useState([]);
    const history = useHistory()

    useEffect(() => {
        console.log(dbLoading)
        if (dbLoading) setIsLoading(true);
        if (!dbLoading && snapshots) {
            setIsLoading(false)
            setData(snapshots)
        }
    }, [snapshots, dbLoading, dbError]);

    useEffect(() => {
        let count = 0;
        setTableRecords(data.map((snap) => {
            let record = snap.val()
            console.log(record)
            count++;
            return (<tr>
                    <td className="table-dark">{count}</td>
                    <td className="table-dark">{record.name}</td>
                    <td className="table-dark">{record.name}</td>
                    <td className="table-dark">{record.dob}</td>
                    <td className="table-dark"><button type="button" className="btn-light details-button" onClick={() => {handleDetailsRedirect(record)}}>Details</button></td>
                    <td className="table-dark"><button type="button" className="btn-light medi-button">Medi-Predict</button></td>
                    </tr>);
        }))
    }, [isLoading]);

        
    function handleDetailsRedirect(data){
        history.push(
            {
            pathname: "/profile", 
            state: {profileData: data}
    })}



    return (
        <div className="dashboard">
            <LoadingOverlay active={isLoading} spinner>
                <div className="table-responsive d-flex aligns-items-center justify-content-center table-container">
                    <table className="table table-striped table-sm table-dark table-borderless patient-table">
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
            </LoadingOverlay>
        </div>
    )
}

import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
  
import dood from '../../../Assets/Common/dood.png'

const Card = ({data}) => {
    let { patientId } = useParams();
    const patient = data[patientId].val()

    return (
        <div className="patient-details">
            <h3 className="details-heading">Patient Details</h3>
            <div class="d-flex justify-content-start">
                <img className="profile-pic" src={dood} alt="placeholder, replace me"></img>
                <div className="detail-container">                
                    <label className="detail-field">Name: {patient.name}</label>
                    <label className="detail-field">Phone number: {patient.weight}</label>
                    <label className="detail-field">Date Of Birth: {patient.dob}</label>
                </div>
                
            </div>
        </div>
    )
}

export default Card;

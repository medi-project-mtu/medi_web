import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

import { fetchInsurance } from '../../Firebase';
import dood from '../../../Assets/Common/dood.png'

const Card = ({data, insurance}) => {
    let { patientId } = useParams();
    const patient = data[patientId].val()

    const patientInsurance = insurance.filter(obj =>{return obj.key === patient.insuranceId})
    const insuranceName = patientInsurance[0].val().name

    return (
        <div className="patient-details">
            <div class="d-flex justify-content-center">
                <div className="row">
                    <div className="col py-3">
                        <h3 className="details-heading">Patient Details</h3>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-start">
                <div className="row">

                    <div className="col-3">
                        <img src={dood} alt="replace me" className="profile-pic"></img>
                    </div>

                    <div className="col-3">
                        <label className="detail-field">Patient Name: {patient.name}</label>
                    </div>

                    <div className="col-3">
                        <label className="detail-field">Date of Birth: {patient.dob}</label>
                    </div>

                    <div className="col-3">
                        <label className="detail-field">Gender: {patient.gender}</label>
                    </div>


                    <div className="col-3">
                        <label className="detail-field">Dummy: {patient.gender}</label>
                    </div>

                    <div className="col-3">
                        <label className="detail-field">Height: {patient.height}</label>
                    </div>

                    <div className="col-3">
                        <label className="detail-field">Weight: {patient.weight}</label>
                    </div>

                    <div className="col-3">
                        <label className="detail-field">Insurance Provider: {insuranceName}</label>
                    </div>
                    
                </div>
            </div>
                
        </div>
    )
}

export default Card;

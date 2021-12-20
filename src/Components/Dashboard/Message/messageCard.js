import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
} from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import { Redirect } from "react-router";

// import { fetchInsurance } from "../../Firebase";
// import dood from "../../../Assets/Common/dood.png";

const MessageCard = ({ data }) => {
    let { patientId, messageId } = useParams();

    if (data[patientId] === undefined) {
        return <Redirect to="/*" />;
    }

    const patient = data[patientId].val();
    const message = patient.support[messageId];

    if (message === undefined) {
        return <Redirect to="/*" />;
    }
    
    const date = new Date(message.dateTime);
    const now = new Date();
    const diff = Math.floor((now - date) / 86400000);
    
    return (
        <div className="card patient-details">
            <h4 className="card-header">
                <strong>Subject</strong>: {message.subject}
            </h4>

            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                     {diff} days ago | {dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                </li>
                <li className="list-group-item">
                    <div className="row align-items-start">
                        <div className="col-lg-2">{patient.name}</div>
                        <div className="col-lg-3">{patient.email}</div>
                    </div>
                </li>
                <li className="list-group-item">{message.msg}</li>
            </ul>

            {/* <div className="d-flex justify-content-center card-body">
        <div className="row">
          <div className="col-4">
            <div>
              <label className="detail-field">Name:</label>
            </div>
            <div>
              <label className="detail-data">{patient.name}</label>
            </div>
          </div>

          <div className="col-4">
            <div>
              <label className="detail-field">Date of Birth:</label>
            </div>
            <div>
              <label className="detail-data">{patient.dob}</label>
            </div>
          </div>

          <div className="col-4">
            <div>
              <label className="detail-field">Gender:</label>
            </div>
            <div>
              <label className="detail-data">{patient.gender}</label>
            </div>
          </div>

          <div className="col-4">
            <div>
              <label className="detail-field">Height:</label>
            </div>
            <div>
              <label className="detail-data">{patient.height}cm</label>
            </div>
          </div>

          <div className="col-4">
            <div>
              <label className="detail-field">Weight:</label>
            </div>
            <div>
              <label className="detail-data">{patient.weight}kg</label>
            </div>
          </div> 

          <div className="col-4">
            <div>
              <label className="detail-field">Insurance Provider:</label>
            </div>
            <div>
              <label className="detail-data">{insuranceName}</label>
            </div>
          </div>
        </div> 
      </div>*/}
        </div>
    );
};

export default MessageCard;

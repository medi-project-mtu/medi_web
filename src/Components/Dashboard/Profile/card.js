import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { Redirect, useHistory } from "react-router";

import { fetchInsurance } from "../../Firebase";
import dood from "../../../Assets/Common/dood.png";

const Card = ({ data, insurance }) => {
  let { patientId } = useParams();
  const history = useHistory();

  if (data[patientId] === undefined) {
    return <Redirect to="/*" />;
  }

  const patient = data[patientId].val();

  const patientInsurance = insurance.filter((obj) => {
    return obj.key === patient.insuranceId;
  });

  const insuranceName = patientInsurance[0].val().name;

  if (patient.gender == 0) {
    patient.gender = "Female";
  } else {
    patient.gender = "Male";
  }

  return (
    <div className="card patient-details">
      <h3 className="card-header">Patient Profile</h3>

      <div className="d-flex justify-content-center card-body">
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
      </div>
    </div>
  );
};

export default Card;

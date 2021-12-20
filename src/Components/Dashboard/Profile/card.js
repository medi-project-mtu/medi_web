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
import { CSVLink } from "react-csv";

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

  const headersDiabetes = [
    { label: "Pregnancies", key: "pregnancies" },
    { label: "Glucose", key: "glucose" },
    { label: "BloodPressure", key: "bloodpressure" },
    { label: "SkinThickness", key: "skinthickness" },
    { label: "Insulin", key: "insulin" },
    { label: "BMI", key: "bmi" },
    { label: "DiabetesPedigreeFunction", key: "dpf" },
    { label: "Age", key: "age" },
  ];

  const headersHeart = [
    { label: "Age", key: "age" },
    { label: "Chest Pain Type", key: "chestPainType" },
    { label: "Excercise Induced Angina", key: "exerciseInducedAngina" },
    { label: "Fasting Blood Sugar", key: "fastingBloodSugar" },
    { label: "Gender", key: "gender" },
    { label: "Major Vessel Number", key: "majorVesselsNumber" },
    { label: "Max Heart Rate Achieved", key: "maxHeartRateAchieved" },
    { label: "Peak Excercise ST Segment", key: "peakExerciseSTSegment" },
    { label: "Resting Blood Pressure", key: "restingBloodPressure" },
    { label: "Resting ECG", key: "restingECG" },
    { label: "Serum Cholesterol", key: "serumCholesterol" },
    { label: "ST Depression Induced", key: "stdepressionInduced" },
    { label: "Thal", key: "thal" }
  ];


  const headersAlzheimers = [
    { label: "ID", key: "id" },
    { label: "Age", key: "age" },
    { label: "Hand", key: "hand" },
    { label: "ASF", key: "asf" },
    { label: "M/F", key: "m/f" },
    { label: "Educ", key: "educ" },
    { label: "SES", key: "ses" },
    { label: "MMSE", key: "mmse" },
    { label: "eTIV", key: "etiv" },
    { label: "nWBV", key: "nwbv" },
    { label: "Delay", key: "delay" }
  ];

  let patientDataDiabetes = [];
  let patientDataHeart = [];
  let patientDataAlzheimers = [];



  if (patient.diabetes) {

    patientDataDiabetes.push(
      {
        pregnancies: patient.diabetes.pregnancies,
        glucose: patient.diabetes.glucose,
        bloodpressure: patient.diabetes.bloodPressure,
        skinthickness: patient.diabetes.skinThickness,
        insulin: patient.diabetes.insulin,
        bmi: patient.diabetes.bmi,
        dpf: patient.diabetes.diabetesPedigreeFunction,
        age: patient.diabetes.age,
      }
    );

    patientDataHeart.push(
      {
        age: patient.heartDisease.age,
        chestPainType: patient.heartDisease.chestPainType,
        exerciseInducedAngina: patient.heartDisease.exerciseInducedAngina,
        fastingBloodSugar: patient.heartDisease.fastingBloodSugar,
        gender: patient.heartDisease.gender,
        majorVesselsNumber: patient.heartDisease.majorVesselsNumber,
        maxHeartRateAchieved: patient.heartDisease.maxHeartRateAchieved,
        peakExerciseSTSegment: patient.heartDisease.peakExerciseSTSegment,
        restingBloodPressure: patient.heartDisease.restingBloodPressure,
        restingECG: patient.heartDisease.restingECG,
        serumCholesterol: patient.heartDisease.serumCholesterol,
        stdepressionInduced: patient.heartDisease.stdepressionInduced,
        thal: patient.heartDisease.thal,
      }
    );

    patientDataAlzheimers.push(
      {
        id: "OAS1_0001_MR1",
        age: patient.alzheimers.age,
        asf: patient.alzheimers.asf,
        hand: "R",
        "m/f": patient.alzheimers.gender,
        educ: patient.alzheimers.educationLevel,
        ses: patient.alzheimers.socialEconomicStatus,
        mmse: patient.alzheimers.miniMentalStateExamination,
        etiv: patient.alzheimers.estimatedTotalIntracranialVolume,
        nwbv: patient.alzheimers.normalizeHoleBrainVolume,
        delay: "N/A",
      }
    );

  }

  return (
    <div>
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
      <CSVLink data={patientDataDiabetes} headers={headersDiabetes} className="btn btn-light mx-5 mt-5"
        filename={"diabetesData.csv"}>
        Export All Diabetes Data
      </CSVLink>

      <CSVLink data={patientDataHeart} headers={headersHeart} className="btn btn-light mx-5 mt-5"
        filename={"heartData.csv"}>
        Export All Heart Data
      </CSVLink>

      <CSVLink data={patientDataAlzheimers} headers={headersAlzheimers} className="btn btn-light mx-5 mt-5"
        filename={"alzheimersData.csv"}>
        Export All Alzheimers Data
      </CSVLink>
    </div>
  );
};

export default Card;

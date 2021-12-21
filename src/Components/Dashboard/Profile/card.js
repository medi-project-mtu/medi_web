import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
} from "react-router-dom";
import { Redirect, useHistory } from "react-router";
import { CSVLink } from "react-csv";
import dateFormat, { masks } from "dateformat";

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
        { label: "Thal", key: "thal" },
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
        { label: "Delay", key: "delay" },
    ];

    let patientDataDiabetes = [];
    let patientDataHeart = [];
    let patientDataAlzheimers = [];

    if (patient.diabetes) {
        patientDataDiabetes.push({
            pregnancies: patient.diabetes.pregnancies,
            glucose: patient.diabetes.glucose,
            bloodpressure: patient.diabetes.bloodPressure,
            skinthickness: patient.diabetes.skinThickness,
            insulin: patient.diabetes.insulin,
            bmi: patient.diabetes.bmi,
            dpf: patient.diabetes.diabetesPedigreeFunction,
            age: patient.diabetes.age,
        });
    }

    if (patient.heartDisease) {
        patientDataHeart.push({
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
        });
    }

    if (patient.alzheimers) {
        patientDataAlzheimers.push({
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
        });
    }

    const diabetes =
        patient.diabetes && patient.diabetes.diagnosis
            ? patient.diabetes.diagnosis
            : "N/A";
    const heartDisease =
        patient.heartDisease && patient.heartDisease.diagnosis
            ? patient.heartDisease.diagnosis
            : "N/A";
    const alzheimers =
        patient.alzheimers && patient.alzheimers.diagnosis
            ? patient.alzheimers.diagnosis
            : "N/A";

    let myList = [];
    let uniqueCount = 0;

    if (patient.support) {
        Object.entries(patient.support).forEach((element) => {
            const date = new Date(element[1].dateTime);
            const subObject = element[1].subject.substring(0, 25);
            myList.push(
                <li className="list-group-item" key={uniqueCount++}>
                    <Link className="row messagerow" to={`/message/${patientId}/${element[0]}`}>
                        {/* <div className="col">{patient.email}</div> */}
                        <div className="col-4">
                            {dateFormat(date, "d mmm - h:MMtt")}
                        </div>
                        <div className="col-8">{"- "}{subObject}{(element[1].subject.length > 24)?"...":""}</div>
                    </Link>
                </li>
            );
        });
    } else {
      myList.push(
        <li className="list-group-item text-center">
          <h3>No Messages</h3>
        </li>
        
    );
    }

    return (
        <div>
            <div className="row px-0 g-0 align-items-center justify-content-center">
                <div className="col-4 p-5">
                    <div className="card">
                        <h5 className="card-header">Patient Messages</h5>
                        <ul class="list-group list-group-flush">{myList}</ul>
                    </div>
                </div>
                <div className="col-5 p-5">
                    <div className="card patient-details">
                        <h3 className="card-header">Patient Profile</h3>
                        <div className="d-flex justify-content-center card-body">
                            <div className="row">
                                <div className="col-4">
                                    <div>
                                        <label className="detail-field">
                                            Name:
                                        </label>
                                    </div>
                                    <div>
                                        <label className="detail-data">
                                            {patient.name}
                                        </label>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div>
                                        <label className="detail-field">
                                            Date of Birth:
                                        </label>
                                    </div>
                                    <div>
                                        <label className="detail-data">
                                            {patient.dob}
                                        </label>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div>
                                        <label className="detail-field">
                                            Gender:
                                        </label>
                                    </div>
                                    <div>
                                        <label className="detail-data">
                                            {patient.gender}
                                        </label>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div>
                                        <label className="detail-field">
                                            Height:
                                        </label>
                                    </div>
                                    <div>
                                        <label className="detail-data">
                                            {patient.height}cm
                                        </label>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div>
                                        <label className="detail-field">
                                            Weight:
                                        </label>
                                    </div>
                                    <div>
                                        <label className="detail-data">
                                            {patient.weight}kg
                                        </label>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div>
                                        <label className="detail-field">
                                            Insurance Provider:
                                        </label>
                                    </div>
                                    <div>
                                        <label className="detail-data">
                                            {insuranceName}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-2 p-5">
                    <div className="col">
                        <div
                            className={
                                "card text-center text-white " +
                                (diabetes == "N/A"
                                    ? "bg-secondary mb-3"
                                    : diabetes < "35.0%"
                                    ? "bg-success mb-3"
                                    : diabetes > "65.0%"
                                    ? "bg-danger mb-3"
                                    : "bg-warning mb-3")
                            }
                        >
                            <div class="card-header">Diabetes</div>
                            <h5 class="card-title">{diabetes}</h5>
                            {patient.diabetes && patient.diabetes.diagnosis && (
                                <div class="card-footer">
                                    <CSVLink
                                        data={patientDataDiabetes}
                                        headers={headersDiabetes}
                                        className="btn btn-outline-dark"
                                        filename={"diabetesData.csv"}
                                    >
                                        Export Diabetes Data
                                    </CSVLink>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col">
                        <div
                            className={
                                "card text-white text-center " +
                                (heartDisease == "N/A"
                                    ? "bg-secondary mb-3"
                                    : heartDisease < "35.0%"
                                    ? "bg-success mb-3"
                                    : heartDisease > "65.0%"
                                    ? "bg-danger mb-3"
                                    : "bg-warning mb-3")
                            }
                        >
                            <div class="card-header">Heart Disease</div>
                            <h5 class="card-title">{heartDisease}</h5>
                            {patient.heartDisease && patient.heartDisease.diagnosis && (
                                <div class="card-footer">
                                    <CSVLink
                                        data={patientDataHeart}
                                        headers={headersHeart}
                                        className="btn btn-outline-dark"
                                        filename={"heartData.csv"}
                                    >
                                        Export Heart Data
                                    </CSVLink>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col">
                        <div
                            className={
                                "card text-white text-center " +
                                (alzheimers == "N/A"
                                    ? "bg-secondary mb-3"
                                    : alzheimers < "No Risk"
                                    ? "bg-success mb-3"
                                    : "bg-warning mb-3")
                            }
                        >
                            <div class="card-header">Alzheimers</div>
                            <h5 class="card-title">{alzheimers}</h5>
                            {patient.alzheimers && patient.alzheimers.diagnosis && (
                                <div class="card-footer">
                                    <CSVLink
                                        data={patientDataAlzheimers}
                                        headers={headersAlzheimers}
                                        className="btn btn-outline-dark"
                                        filename={"alzheimersData.csv"}
                                    >
                                        Export Alzheimers Data
                                    </CSVLink>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;

import React, { useState } from "react"
import { useHistory } from 'react-router'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { CSVLink } from "react-csv"
import Modal from "react-bootstrap/Modal";



export default function DashboardTable({ data }) {
    const history = useHistory()
    let count = 0;

    const today = new Date();
    const todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    const [show, setShow] = useState("")
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false)
        clearInput();
    }

    const [maxAge, setMaxAge] = useState("");
    const [maxDob, setMaxDob] = useState("");
    const [gender, setGender] = useState("All");
    const [maxHeight, setMaxHeight] = useState("");
    const [maxWeight, setMaxWeight] = useState("");
    const [maxDiabetes, setMaxDiabetes] = useState("");
    const [maxAlzhemier, setMaxAlzheimer] = useState("All");  // note this does not get less severe diagnoses but the one that is selected
    const [maxHeart, setMaxHeart] = useState("");
    const [riskData, setRiskData] = useState([]);


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

    const headersRisk = [
        { label: "Age", key: "age" },
        { label: "DOB", key: "dob" },
        { label: "Gender", key: "gender" },
        { label: "Height", key: "height" },
        { label: "Weight", key: "weight" },
    ]


    let patientDataAlzheimers = []
    let patientDataHeart = []
    let patientDataDiabetes = []


    const PrepareData = (records) => {

        records.forEach(record => {
            let recordData = record.val()

            if (recordData.diabetes) {
                patientDataDiabetes.push(
                    {
                        pregnancies: recordData.diabetes.pregnancies,
                        glucose: recordData.diabetes.glucose,
                        bloodpressure: recordData.diabetes.bloodPressure,
                        skinthickness: recordData.diabetes.skinThickness,
                        insulin: recordData.diabetes.insulin,
                        bmi: recordData.diabetes.bmi,
                        dpf: recordData.diabetes.diabetesPedigreeFunction,
                        age: recordData.diabetes.age,
                    }
                );
            }

            if (recordData.heartDisease) {
                patientDataHeart.push(
                    {
                        age: recordData.heartDisease.age,
                        chestPainType: recordData.heartDisease.chestPainType,
                        exerciseInducedAngina: recordData.heartDisease.exerciseInducedAngina,
                        fastingBloodSugar: recordData.heartDisease.fastingBloodSugar,
                        gender: recordData.heartDisease.gender,
                        majorVesselsNumber: recordData.heartDisease.majorVesselsNumber,
                        maxHeartRateAchieved: recordData.heartDisease.maxHeartRateAchieved,
                        peakExerciseSTSegment: recordData.heartDisease.peakExerciseSTSegment,
                        restingBloodPressure: recordData.heartDisease.restingBloodPressure,
                        restingECG: recordData.heartDisease.restingECG,
                        serumCholesterol: recordData.heartDisease.serumCholesterol,
                        stdepressionInduced: recordData.heartDisease.stdepressionInduced,
                        thal: recordData.heartDisease.thal,
                    }
                );
            }

            if (recordData.alzheimers) {
                patientDataAlzheimers.push(
                    {
                        id: "OAS1_0001_MR1",
                        age: recordData.alzheimers.age,
                        asf: recordData.alzheimers.asf,
                        hand: "R",
                        "m/f": recordData.alzheimers.gender,
                        educ: recordData.alzheimers.educationLevel,
                        ses: recordData.alzheimers.socialEconomicStatus,
                        mmse: recordData.alzheimers.miniMentalStateExamination,
                        etiv: recordData.alzheimers.estimatedTotalIntracranialVolume,
                        nwbv: recordData.alzheimers.normalizeHoleBrainVolume,
                        delay: "N/A",
                    }
                );
            }
        })
    }

    { console.log(parseFloat(maxDiabetes)) }

    const filterRisk = (records) => {
        let recordData;
        let compareGender = "";
        let tempArray = [];
        const alzCompare = {
            "No Risk": 1,
            "Mild": 2,
            "Moderate": 3,
            "Severe": 4
        }


        setRiskData([]);
        
        records.forEach(record => {
            recordData = record.val();

            const diabetes = (recordData.diabetes && recordData.diabetes.diagnosis) ? recordData.diabetes.diagnosis : '0';
            const heartDisease = (recordData.heartDisease && recordData.heartDisease.diagnosis) ? recordData.heartDisease.diagnosis : '0';
            const alzheimers = (recordData.alzheimers && recordData.alzheimers.diagnosis) ? recordData.alzheimers.diagnosis : 'No Risk';

            if (maxAge != "") {
                if (parseInt(recordData.age) > parseInt(maxAge)) {
                    return;
                }
            }

            if (gender !== "All") {
                if (recordData.gender != gender) {
                    return;
                }
            }

            if (maxHeight != "") {
                if (parseFloat(recordData.height) > parseFloat(maxHeight)) {
                    return;
                }
            }

            if (maxWeight != "") {
                if (parseFloat(recordData.weight) > parseFloat(maxWeight)) {
                    return;
                }
            }

            if (maxDiabetes != "") {
                if (parseFloat(diabetes) < parseFloat(maxDiabetes)) {
                    return;
                }
            }

            if (maxAlzhemier != "All") {
                if (alzCompare[alzheimers] < alzCompare[maxAlzhemier]){
                    return;
                }
            }

            if (maxHeart != "") {
                if (parseFloat(heartDisease) < parseFloat(maxHeart)) {
                    return;
                }
            }

            tempArray.push(
                {
                    age: recordData.age,
                    dob: recordData.dob,
                    gender: recordData.gender,
                    height: recordData.height,
                    weight: recordData.weight
                }
            );
            setRiskData(tempArray)

        })
    }
    // =============================================================================================


    PrepareData(data);

    const clearInput = () => {
        setMaxAge("");
        setMaxDob("");
        setMaxWeight("");
        setMaxHeight("");
    }


    const getAge = (dob) => {
        const dateArr = dob.split("/")
        return Math.floor((new Date() - new Date(
            parseInt(dateArr[2], 10),
            parseInt(dateArr[1], 10) - 1,
            parseInt(dateArr[0], 10)
        ).getTime()) / 3.15576e10);
    }


    let tableRecords = (data.map((value) => {
        let record = value.val()
        count++;

        const diabetes = (record.diabetes && record.diabetes.diagnosis) ? record.diabetes.diagnosis : 'N/A';
        const heartDisease = (record.heartDisease && record.heartDisease.diagnosis) ? record.heartDisease.diagnosis : 'N/A';
        const alzheimers = (record.alzheimers && record.alzheimers.diagnosis) ? record.alzheimers.diagnosis : 'N/A';



        return (
            <tr key={count}>
                <td className="table-dark">{count}</td>
                <td className="table-dark">{record.name}</td>
                <td className="table-dark">{record.email}</td>
                <td className="table-dark">{getAge(record.dob)}</td>
                <td className="table-dark">{diabetes}</td>
                <td className="table-dark">{alzheimers}</td>
                <td className="table-dark">{heartDisease}</td>
                <td className="table-dark">
                    <Link
                        className="btn btn-light details-button"
                        to={`/profile/${count - 1}`}
                    >
                        Details
                    </Link>
                </td>
                {/* <td className="table-dark">
                    <button type="button" className="btn-light medi-button">
                        Medi-Predict
                    </button>
                </td> */}
            </tr>
        );
    }))
    return (
        <div className="patients-table">

            <div className="d-flex justify-content-center">
                <CSVLink data={patientDataDiabetes} headers={headersDiabetes} className="btn btn-success btn-sm mx-5 mt-4"
                    filename={"diabetesData" + "_" + todayDate + "_" + time + ".csv"}>
                    Export All Diabetes Data
                </CSVLink>

                <CSVLink data={patientDataHeart} headers={headersHeart} className="btn btn-danger btn-sm mx-5 mt-4"
                    filename={"heartData" + "_" + todayDate + "_" + time + ".csv"}>
                    Export All Heart Data
                </CSVLink>

                <CSVLink data={patientDataAlzheimers} headers={headersAlzheimers} className="btn btn-warning btn-sm mx-5 mt-4"
                    filename={"alzheimersData" + "_" + todayDate + "_" + time + ".csv"}>
                    Export All Alzheimers Data
                </CSVLink>

                <button type="button" className="btn btn-primary btn-sm mx-5 mt-4" onClick={handleShow}>Run Risk Report</button>
            </div>

            <div className="table-responsive d-flex aligns-items-center justify-content-center table-container">
                <table className="table table-striped table-sm table-dark table-borderless patient-table mt-4">
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
                            {/* <th scope="col">Medi-Predict</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {tableRecords}
                    </tbody>
                </table>
            </div>
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Patient Risk Report</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-horizontal">
                        <div className="form-group form-group-sm py-3">
                            <label className="col-sm-3 risk-modal-label mx-3" for="age">MAX Age: </label>
                            <input type="text" className="risk-input col-sm-6" id="age" value={maxAge} onChange={e => setMaxAge(e.target.value)} />
                        </div>

                        <div className="form-group form-group-sm py-3">
                            <label className="col-sm-3 risk-modal-label mx-3" for="gender">Gender: </label>
                            <select id="gender disabledSelect" class="risk-select col-sm-6" onChange={e => setGender(e.target.value)}>
                                <option value="All">All</option>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </select>
                        </div>

                        <div className="form-group form-group-sm py-3">
                            <label className="col-sm-3 risk-modal-label mx-3" for="height">MAX Height: </label>
                            <input type="text" className="risk-input col-sm-6" id="height" value={maxHeight} onChange={e => setMaxHeight(e.target.value)} />
                        </div>

                        <div className="form-group form-group-sm py-3">
                            <label className="col-sm-3 risk-modal-label mx-3" for="weight">MAX Weight: </label>
                            <input type="text" className="risk-input col-sm-6" id="weight" value={maxWeight} onChange={e => setMaxWeight(e.target.value)} />
                        </div>

                        <div className="form-group form-group-sm py-3">
                            <label className="col-sm-3 risk-modal-label mx-3" for="weight">MIN Diabetes Risk: </label>
                            <input type="text" className="risk-input col-sm-6" id="weight" value={maxDiabetes} onChange={e => setMaxDiabetes(e.target.value)} />
                        </div>

                        <div className="form-group form-group-sm py-3">
                            <label className="col-sm-3 risk-modal-label mx-3" for="gender">Alzheimers Level: </label>
                            <select id="gender disabledSelect" class="risk-select col-sm-6" onChange={(e) => setMaxAlzheimer(e.target.value)}>
                                <option value="All">All</option>
                                <option value="No Risk">No-Risk</option>
                                <option value="Mild">Mild</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Severe">Severe</option>
                            </select>
                        </div>

                        <div className="form-group form-group-sm py-3">
                            <label className="col-sm-3 risk-modal-label mx-3" for="weight">MIN Heart Disease Risk: </label>
                            <input type="text" className="risk-input col-sm-6" id="weight" value={maxHeart} onChange={e => setMaxHeart(e.target.value)} />
                        </div>

                    </div>

                    <div className="csv-link">

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    
                    {/* <button className="btn btn-primary" onClick={() => filterRisk(data)}>Run Report</button> */}
                    <CSVLink data={riskData} headers={headersRisk} className="btn btn-primary"
                        filename={"riskreport" + "_" + todayDate + "_" + time + ".csv"} onClick={() => filterRisk(data)}>
                        Filter and Download Risk Report CSV
                    </CSVLink>
                    <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>

                </Modal.Footer>
            </Modal>
        </div>
    )

}

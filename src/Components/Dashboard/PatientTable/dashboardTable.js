import React from "react"
import { useHistory } from 'react-router'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { CSVLink } from "react-csv"



export default function DashboardTable({ data }) {
    const history = useHistory()
    let count = 0;


    let headersDiabetes = []
    let patientDataDiabetes = []

    let headersAlzheimers = []
    let patientDataAlzheimers = []

    let headersHeart = []
    let patientDataHeart = []


    const ExportDiabetesAll = (records) => {
        headersDiabetes = [
            { label: "Pregnancies", key: "pregnancies" },
            { label: "Glucose", key: "glucose" },
            { label: "BloodPressure", key: "bloodpressure" },
            { label: "SkinThickness", key: "skinthickness" },
            { label: "Insulin", key: "insulin" },
            { label: "BMI", key: "bmi" },
            { label: "DiabetesPedigreeFunction", key: "dpf" },
            { label: "Age", key: "age" },
        ];


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
        })
    }

    const ExportHeartAll = (records) => {
        headersHeart = [
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


        records.forEach(record => {
            let recordData = record.val()
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
        })
    }

    const ExportAlzheimersAll = (records) => {
        headersAlzheimers = [
            { label: "ID", key: "id" },
            { label: "Age", key: "age" },
            { label: "Hand", key:"hand"},
            { label: "ASF", key: "asf" },
            { label: "M/F", key: "m/f" },
            { label: "Educ", key: "educ" },
            { label: "SES", key: "ses" },
            { label: "MMSE", key: "mmse" },
            { label: "eTIV", key: "etiv" },
            { label: "nWBV", key: "nwbv" },
            { label: "Delay", key: "delay" }
        ];


        records.forEach(record => {
            let recordData = record.val()
            // console.log(recordData.diabetes.age);
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

// =============================================================================================


    ExportDiabetesAll(data);
    ExportHeartAll(data);
    ExportAlzheimersAll(data);

    console.log(data[0].val());



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
        console.log(record);

        const diabetes = (record.diabetes && record.diabetes.diagnosis) ? record.diabetes.diagnosis : 'N/A';
        const heartDisease = (record.heartDisease && record.heartDisease.diagnosis) ? record.heartDisease.diagnosis : 'N/A';;
        const alzheimers = (record.alzheimers && record.alzheimers.diagnosis) ? record.alzheimers.diagnosis : 'N/A';;

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
                <td className="table-dark">
                    <button type="button" className="btn-light medi-button">
                        Medi-Predict
                    </button>
                </td>
            </tr>
        );
    }))
    return (
        <div className="dashboard">
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

            <div className="table-responsive d-flex aligns-items-center justify-content-center table-container">
                <table className="table table-striped table-sm table-dark table-borderless patient-table">
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
                            <th scope="col">Medi-Predict</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRecords}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

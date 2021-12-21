import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
} from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import moment from "moment";
import { Redirect } from "react-router";
import { useState, useEffect } from "react";
import { sendEmail } from "../../Emailjs";

const MessageCard = ({ data, name, email }) => {
    const [templatedata, setTemplatedata] = useState({
        gpname: "",
        patientsubject: "",
        patientname: "",
        date: "",
        patientmessage: "",
        patientemail: "",
        gpemail: "",
        gpobject: "",
        gpmessage: "",
    });

    let { patientId, messageId } = useParams();

    if (data[patientId] === undefined) {
        return <Redirect to="/*" />;
    }

    const patient = data[patientId].val();
    const message = patient.support[messageId];

    if (message === undefined) {
        return <Redirect to="/*" />;
    }

    const date = new moment(message.dateTime);

    templatedata.patientemail = patient.email;
    templatedata.gpemail = email;
    templatedata.gpname = name;
    templatedata.patientmessage = message.msg;
    templatedata.patientsubject = message.subject;
    templatedata.date = dateFormat(date, "dddd, mmm dS, yyyy, h:MM TT");
    templatedata.patientname = patient.name;

    const now = new moment();
    const diffDays = now.diff(date, "days");
    const diffHours = now.diff(date, "hours");
    const diffMinutes = now.diff(date, "minutes");
    const diffSeconds = now.diff(date, "seconds");

    const diff =
        diffDays > 0
            ? `${diffDays} days ago`
            : diffHours > 0
            ? `${diffHours} hours ago`
            : diffMinutes > 0
            ? `${diffMinutes} minutes ago`
            : `${diffSeconds} seconds ago`;

    const updateTemplatedata = (e) => {
        setTemplatedata({
            ...templatedata,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="bg-darkish">
            <div className="card message">
                <h4 className="card-header">
                    <strong>Subject</strong>: {message.subject}
                </h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item fst-italic">
                        {dateFormat(date, "dddd, mmm dS, yyyy, h:MM TT")}
                    </li>
                    <li className="list-group-item">
                        {patient.name} {"<"}
                        <a href={`mailto:${patient.email}`}>{patient.email}</a>
                        {">"}
                    </li>
                    <div></div>
                </ul>
                <div className="card-body">
                    <h5 className="card-title">Message:</h5>
                    <p className="card-text">{message.msg}</p>
                </div>
                <div className="card-footer">Support message sent {diff}</div>
            </div>
            <div className="card reply">
                <h4 className="card-header font-monospace">
                    Reply to {" "} 
                    <Link className="messagerow p-1" to={`/profile/${patientId}`}>
                        {patient.name}  
                    </Link>
                </h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <p className="p-0 m-0 text-muted">Object:</p>
                        <input
                            type="text"
                            className="form-control"
                            name="gpobject"
                            onChange={updateTemplatedata}
                            placeholder={`ex: "RE: ${message.subject}"`}
                            value={templatedata.gpobject}
                        />
                    </li>
                    <div></div>
                </ul>
                <div className="card-body">
                    <div className="form-floating">
                        <textarea
                            className="form-control message-textarea"
                            placeholder="Leave a message here"
                            id="floatingTextarea"
                            name="gpmessage"
                            onChange={updateTemplatedata}
                            value={templatedata.gpmessage}
                        />
                        <label htmlFor="floatingTextarea">
                            Message to send
                        </label>
                    </div>
                </div>
                <div className="card-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        onClick={() => sendEmail(templatedata)}>
                        Send
                    </button>
                </div>
            </div>
            <div className="placeholder pt-5"></div>
        </div>
    );
};

export default MessageCard;
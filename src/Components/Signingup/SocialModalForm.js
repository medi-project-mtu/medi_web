import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { addUserDb, auth, logout } from "../Firebase";
import Modal from 'react-bootstrap/Modal'

export default function ModalForm(props) {
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [eirCode, setEirCode] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [practice, setPractice] = useState("");
    
    const history = useHistory();

    const [user, loading, error] = useAuthState(auth);
 
    const handleModalSubmit = () => {
        if (!dob) alert("Please enter your date of birth")
        else if (!eirCode) alert("Please enter your Eir Code") 
        else if (!phone) alert("Please enter your phone") 
        else if (!gender) alert("Please enter your gender") 
        else if (!specialization) alert("Please enter your specialization") 
        else if (!practice) alert("Please enter your medical practice") 
        else {
            const userDetails = [user.email , 'placeholder', name, dob, eirCode, phone, gender, specialization, practice]
            props.modClose();
            addUserDb(userDetails, user);
            history.replace("/dashboard");
        }}
    return (
        <div className="socialProviderForm">
            <Modal.Header>
                <Modal.Title>
                    First time user! Please fill your profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="mb-1">
                        <input
                            type="name"
                            className="form-control"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <div>
                            <p className="p-0 m-0">Date of Birth</p>
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Date of Birth"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </div>
                        <div className="pt-3">
                            <input
                                type="tel"
                                className="form-control"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="pt-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Specialization"
                                value={specialization}
                                onChange={(e) =>
                                    setSpecialization(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="pt-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="EirCode"
                                value={eirCode}
                                onChange={(e) => setEirCode(e.target.value)}
                            />
                        </div>
                        <div className="pt-3">
                            {/* <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            /> */}
                            <select id="disabledSelect" class="form-select">
                                <option onClick={() => setGender("Male")}>Male</option>
                                <option onClick={() => setGender("Female")}>Female</option>
                                <option onClick={() => setGender("Other")}>Other</option>
                            </select>
                        </div>
                        <div className="pt-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Medical Practice"
                                value={practice}
                                onChange={(e) => setPractice(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="w-100 btn btn-danger btn-block mt-3"
                    onClick={handleModalSubmit}
                >
                    Submit
                </button>
                <button
                    className="w-100 btn btn-secondary btn-block mt-3"
                    onClick={() => {
                        logout();
                        props.modClose();
                    }}
                >
                    Close
                </button>
            </Modal.Footer>
        </div>
    );
}

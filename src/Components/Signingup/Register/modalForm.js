import React, { useState } from "react";

export default function ModalForm(props) {
    const [dob, setDob] = useState("");
    const [eirCode, setEirCode] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [practice, setPractice] = useState("");

    return (
            <div className="row">
                <div className="col">
                    <div>
                        <p className="p-0 m-0">Date of Birth</p>
                        <input 
                        type="date" 
                        className="form-control" 
                        placeholder="Date of Birth"
                        value={dob}
                        onChange={(e) => {
                            props.modDob(e.target.value)
                            setDob(e.target.value)
                        }}
                        />
                    </div>
                    <div className="pt-3">
                        <input 
                        type="tel" 
                        className="form-control" 
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => {
                            props.modPhone(e.target.value)
                            setPhone(e.target.value)
                        }}
                        />
                    </div>
                    <div className="pt-3">
                        <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Specialization"
                        value={specialization}
                        onChange={(e) => {
                            props.modSpe(e.target.value)
                            setSpecialization(e.target.value)
                        }}
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
                        onChange={(e) => {
                            props.modEircode(e.target.value)
                            setEirCode(e.target.value)
                        }}
                        />
                    </div>
                    <div className="pt-3">
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Gender"
                            value={gender}
                            onChange={(e) => {
                                props.modGender(e.target.value)
                                setGender(e.target.value)
                            }}
                            />
                    </div>
                    <div className="pt-3">
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Medical Practice"
                            value={practice}
                            onChange={(e) => {
                                props.modPrac(e.target.value)
                                setPractice(e.target.value)
                            }}
                            />
                    </div>
                </div>
            </div>
    )
}

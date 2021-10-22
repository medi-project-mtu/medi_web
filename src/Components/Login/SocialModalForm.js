import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { addUserDb, auth, logout } from "../Firebase";
import Modal from 'react-bootstrap/Modal'

export default function ModalForm(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [eirCode, setEirCode] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [practice, setPractice] = useState("");
    const userDetails = [email , 'placeholder', name, dob, eirCode, phone, gender, specialization, practice]

    const [user, loading, error] = useAuthState(auth);
    
    // useEffect(() => {
    //     if (loading) {
    //         // maybe trigger a loading screen
    //         return;
    //     }
    //     if (user) {
    //         setName(user.displayName)
    //     }}, [user, loading]);

    
    const handleModalSubmit = () => {
        if (!dob) alert("Please enter your date of birth")
        if (!eirCode) alert("Please enter your Eir Code") 
        if (!phone) alert("Please enter your phone") 
        if (!gender) alert("Please enter your gender") 
        if (!specialization) alert("Please enter your specialization") 
        if (!practice) alert("Please enter your medical practice") 
        if (user) {
            setName(user.displayName)
            setEmail(user.email)
        }    
        props.modClose();
        addUserDb(userDetails, user);
    }

    return (

        <div className="socialProviderForm">
            <Modal.Header >
                <Modal.Title>First time user! Please fill your profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="row">
                <div className="mb-1">
                    <input 
                    type="name" 
                    className="form-control" 
                    placeholder="Full Name"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
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
                        onChange={(e) => setSpecialization(e.target.value)}
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
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            />
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
                <button className="w-100 btn btn-danger btn-block mt-3" onClick={handleModalSubmit}>
                    Submit
                </button>
                <button className="w-100 btn btn-secondary btn-block mt-3" onClick={() => { logout(); props.modClose();}}>
                    Close
                </button>
            </Modal.Footer>
        </div>

            
    )
}

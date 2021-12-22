import React from 'react'
import Modal from "react-bootstrap/Modal";

export default function report() {
    return (
        <div>
            <Modal show ={True}>
                <Modal.Header>
                    <Modal.Title>Patient Risk Report</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className="risk-modal-label" for="age">MAX Age: </label>
                    <label className="risk-modal-label" for="dob">MAX DOB: </label>
                    <label className="risk-modal-label" for="gender">MAX Gender: </label>
                    <label className="risk-modal-label" for="height">MAX Height: </label>
                    <label className="risk-modal-label" for="weight">MAX Weight: </label>

                    <input type="text" className="risk-input" id="age"/>
                    <input type="date" className="risk-input" id="dob"/>
                    
                    <select id="gender" class="risk-select">
                                <option>Male</option>
                                <option>Female</option>
                    </select>
                    
                    <input type="text" className="risk-input" id="height"/>
                    <input type="text" className="risk-input" id="weight"/>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn button-primary btn-sm">Run Report</button>
                    <button className="btn button-secondary btn-sm">Cancel</button>
                </Modal.Footer>
            </Modal>
            
            
        </div>
    )
}

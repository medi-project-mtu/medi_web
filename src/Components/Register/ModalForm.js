import React from 'react'
import './index.css'


export default function ModalForm() {
    return (
            <div className="row">
                {/* <div className="modal-row"> */}
                <div className="col">
                    <div className="form-group pt-3">
                        <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Full Name"
                        // value={name} 
                        // onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group pt-3">
                        <input 
                        type="date" 
                        className="form-control" 
                        placeholder="Date of Birth"
                        // value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group pt-3">
                        <input 
                        type="phone" 
                        className="form-control" 
                        placeholder="Phone Number"
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group pt-3">
                        <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Specialization"
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col">
                    <div className="form-group pt-3">
                        <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Addres Line"
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group pt-3">
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="County"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            />
                    </div>
                    <div className="form-group pt-3">
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Gender"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            />
                    </div>
                    <div className="form-group pt-3">
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Medical Practice"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                </div>
                    
                {/* </div> */}
            </div>
    )
}

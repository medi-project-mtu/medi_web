import React from 'react'
import dood from '../../Assets/Common/dood.png'
import './index.css'

export default function card({data}) {

    console.log(data)

    return (
        <div>
            <h3 className="details-heading">Patient Details</h3>

            <div class="d-flex justify-content-start">
                <img className="profile-pic" src={dood} alt="placeholder, replace me"></img>

                <div className="detail-container">                
                    <label className="detail-field">Name: {data.name}</label>
                    <label className="detail-field">Phone number: {data.weight}</label>
                    <label className="detail-field">Date Of Birth: {data.dob}</label>
                </div>

            </div>
        
        </div>
    )
}

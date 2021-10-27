import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db, logout } from "../Firebase";
import { useLocation } from "react-router";
import Navbar from "../../Partials/navbar";
import Card from "./card";

import './index.css'

function Profile() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const history = useHistory();
    const location = useLocation();

    const fetchUserName = async () => {
        try {
            const userRef = db.ref('Gp/' + user?.uid);
            userRef.on('value', (snapshot) => {
                const data = snapshot.val();
                if(data) setName(data.name)
                else setName("...")
            })
        }catch (err) {
            alert(err.message)
    }};

    useEffect(() => {
        if (loading) return;
        if (!user) history.replace("/");
        fetchUserName();
    }, [user, loading, history]);

    return (
        <div className="dashboard-bg">
            <Navbar name={name}/>
            <div className="patient-details">
                <Card data={location.state.profileData}/>
            </div>
        </div>
    )
}

export default Profile;
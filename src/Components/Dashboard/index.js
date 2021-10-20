import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db, logout } from "../Firebase";

import dood from '../../Assets/Common/dood.png'
import './index.css'

function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const history = useHistory();

    const fetchUserName = async () => {
        try {
            const userRef = db.ref('Users/' + user?.uid);
            userRef.on('value', (snapshot) => {
                const data = snapshot.val();
                if(data) setName(data.name)
                else setName("...")
            })
        }catch (err) {
            setName("...")
            setTimeout( function() {
                fetchUserName();
            }, 1000 );
    }};

    useEffect(() => {
        if (loading) return;
        if (!user) history.replace("/");
        fetchUserName();
    }, [user, loading, history]);

    return (
        <div>
            <div className="dashboard text-center h-100">
            <h3 className="text-white">Logged in as</h3>
            <h5 className="text-white">{name}</h5>
            <h5 className="text-white">{user?.email}</h5>
                <img src={dood} className="btn" alt="oy lmao replace me" onClick={logout}></img>
            </div>
        </div>
    )
}

export default Dashboard;
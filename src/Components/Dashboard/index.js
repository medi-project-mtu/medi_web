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
            const query = await db
            .collection("users")
            .where("uid", "==", user?.uid)
            .get();
            const data = await query.docs[0].data();
            setName(data.name);
        } catch (err) {
            setName("...")
            setTimeout( function() {
                fetchUserName();
            }, 500 );
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
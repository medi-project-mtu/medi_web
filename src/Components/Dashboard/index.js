import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db, logout } from "../Firebase";

import dood from '../../Assets/Common/dood.png'
import Navbar from "../../Partials/navbar";
import DashboardTable from "./dashboardTable";
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
            <Navbar name={name}/>
            <div className="dashboard">
                <DashboardTable />
            </div>
        </div>
    )
}

export default Dashboard;
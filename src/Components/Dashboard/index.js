import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, useLocation } from "react-router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth, db } from "../Firebase";

import Navbar from "../../Partials/navbar";
import DashboardTable from "./PatientTable/dashboardTable";
import Card from "./Profile/card"; 
import './index.css'

const Dashboard = () => {
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
            <Switch>
                <Route exact path="/dashboard" component={DashboardTable}/>
                <Route exact path="/profile" component={Card} />
            </Switch>
        </div>
    )
}

export default Dashboard;
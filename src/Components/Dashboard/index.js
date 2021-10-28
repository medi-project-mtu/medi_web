import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useList } from 'react-firebase-hooks/database';
import { useHistory } from "react-router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth, db, fetchAll } from "../Firebase";

import Navbar from "../../Partials/navbar";
import DashboardTable from "./PatientTable/dashboardTable";
import Card from "./Profile/card"; 
import './index.css'

const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [snapshots, dbLoading, dbError] = useList(fetchAll());

    const history = useHistory(); 

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
            {/* set loading before enabling Switch. When data is load. Allow switch and pass data */}
            <Switch>
                <Route exact path="/dashboard" component={DashboardTable} 
                    snapshots={snapshots} dbLoading={dbLoading} dbError={dbError}/>
                <Route exact path="/profile" component={Card} />
            </Switch>
        </div>
    )
}

export default Dashboard;
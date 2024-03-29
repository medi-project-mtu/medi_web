import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useList } from "react-firebase-hooks/database";
import { useHistory } from "react-router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth, db, fetchUserPatient, fetchInsurance } from "../Firebase";
import LoadingOverlay from "react-loading-overlay-ts";

import Navbar from "../../Partials/navbar";
import DashboardTable from "./PatientTable/dashboardTable";
import Card from "./Profile/card";
import MessagesTable from "./MessagesTable/messagesTable";
import MessageCard from "./Message/messageCard";
import "./index.css";

const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [insurances, insLoading, insError] = useList(fetchInsurance());
    const [snapshots, dbLoading, dbError] = useList(fetchUserPatient(user));

    const history = useHistory();

    const fetchUserName = async () => {
        try {
            const userRef = db.ref("Gp/" + user?.uid);
            userRef.on("value", (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setName(data.name);
                    setEmail(data.email);
                    setGender(data.gender);
                }
                else setName("...");
            });
        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) history.replace("/");
        fetchUserName();
    }, [user, loading, history]);

    return (
        <div className="dashboard bg-darkish">
            <Navbar name={name} gender={gender}/>
            {/* set loading before enabling Switch. When data is loaded. Allow switch and pass data */}
            {dbLoading && <LoadingOverlay active={dbLoading} spinner />}
            {!dbLoading && snapshots && !insLoading && insurances && (
                <Switch>
                    <Route exact path="/dashboard">
                        <DashboardTable data={snapshots} />
                    </Route>
                    <Route exact path="/profile/:patientId">
                        <Card
                            component={Card}
                            data={snapshots}
                            insurance={insurances}
                        />
                    </Route>
                    <Route exact path="/messages">
                        <MessagesTable data={snapshots} />
                    </Route>
                    <Route exact path="/message/:patientId/:messageId">
                        <MessageCard
                            component={MessageCard}
                            data={snapshots}
                            name={name}
                            email={email}
                         />
                    </Route>
                </Switch>
            )}
        </div>
    );
};

export default Dashboard;

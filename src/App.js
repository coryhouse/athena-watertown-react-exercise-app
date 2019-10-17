import React from "react";
import { Route, Switch } from "react-router-dom";
import ManageAppointment from './ManageAppointment';
import Appointments from './Appointments';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Switch>
        <Route path="/" exact component={Appointments} />
        <Route path="/appointments/:day" component={Appointments} />
        <Route path="/appointments" component={Appointments} />
        <Route path="/update-appointment/:appointmentId" component={ManageAppointment} />
        <Route path="/add-appointment/:day" component={ManageAppointment} />
      </Switch>
    </>
  );
}

export default App;

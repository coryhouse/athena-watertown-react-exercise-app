import React from 'react';
import { Link, Redirect, useParams } from "react-router-dom";
import DayPicker from 'react-day-picker';
import moment from 'moment-timezone';
import 'react-day-picker/lib/style.css';

import * as api from './api/appointmentApi';

const browserTime = moment.tz.guess();

function Appointment(props) {
  return (
    <li key={props.id}>
      {moment.tz(props.date, browserTime).format('YYYY-MM-DD HH:mm z')}
      <br />
      <Link id={`appointment-${props.id}`} to={`/update-appointment/${props.id}`}>
        {props.appointmentType}
      </Link>
    </li>
  );
}

export default function Appointments() {
  const [appointments, setAppointments] = React.useState([]);
  const params = useParams();
  const [day, setDay] = React.useState(
    params.day
      ? moment.tz(params.day, browserTime).toDate()
      : new Date()
  );
  const [redirect, setRedirect] = React.useState(false);
  React.useEffect(() => {
    api.getAppointments().then((data) => {
      setAppointments(data.map(appointment => ({
        ...appointment,
        moment: moment(appointment.date),
      })));
    });
  }, [setAppointments]);
  const addAppointment = React.useCallback(() => setRedirect(true), [setRedirect]);
  const dayAppointments = React.useMemo(() => {
    return appointments.filter(appointment => appointment.moment.isSame(day, 'day'));
  }, [day, appointments]);
  if (redirect) {
    const dayString = moment.tz(day, browserTime).format('YYYY-MM-DD');
    return <Redirect to={`/add-appointment/${dayString}`} />;
  }
  else {
    return (
      <>
        <h1>Appointments</h1>
        <DayPicker onDayClick={setDay} selectedDays={[day]} />
        <br />
        <button onClick={addAppointment}>Add Appointment</button>
        <ul>
          {dayAppointments.sort(
            (a, b) => (a.date < b.date) ? -1 : a.date === b.date ? 0 : 1
          ).map(Appointment)}
        </ul>
      </>
    );
  }
}

import React from "react";
import { Redirect, useParams } from "react-router-dom";
import Input from "./reusable/Input";
import * as api from "./api/appointmentApi";
import { toast } from "react-toastify";
import moment from 'moment-timezone';

const browserTime = moment.tz.guess();

const newAppointment = {
  id: null,
  day: '',
  time: '',
  appointmentType: '',
};

class DateError extends Error {}
class DayError extends Error {}
class TimeError extends Error {}

function getAppointmentDate(appointment) {
  if (!appointment.day && !appointment.time) {
    throw new DateError();
  }
  else if (!appointment.day) {
    throw new DayError();
  }
  if (!appointment.time) {
    throw new TimeError();
  }
  return moment.tz(`${appointment.day} ${appointment.time}`, browserTime).toDate();
}

export default function ManageAppointment(props) {
  // Handle state via the useState Hook
  const [appointment, setAppointment] = React.useState(newAppointment);
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const { appointmentId, day } = useParams();
  React.useEffect(() => {
    // IOW, if editing.
    let mounted = true;
    if (appointmentId) {
      api.getAppointmentById(appointmentId).then(data => {
        if (mounted) {
          const date = moment.tz(data.date, browserTime);
          setAppointment({
            id: data.id,
            day: date.format('YYYY-MM-DD'),
            time: date.format('HH:mm'),
            appointmentType: data.appointmentType,
          });
          setIsLoading(false);
        }
      });
    }
    else if (day) {
      setAppointment({
        ...newAppointment,
        day,
      });
      setIsLoading(false);
    }
    else {
      // If adding, nothing to load
      setIsLoading(false);
    }

    // Called when component is unmounting.
    return () => (mounted = false);
  }, [appointmentId, day, setAppointment, setIsLoading]);

  const handleSave = React.useCallback((savedAppointment) => {
    const { appointmentType } = savedAppointment;
    const date = moment.tz(savedAppointment.date, browserTime);
    const day = date.format('ddd MMM Do');
    const time = date.format('HH:mm z');
    setRedirect(true);
    toast.success(`${appointmentType} appointment scheduled for ${day} at ${time} 🎉`);
  }, [setRedirect]);

  const isValid = React.useCallback(() => {
    const err = {};
    if (!appointment.appointmentType) {
      err.appointmentType = 'appointment type is required';
    }
    try {
      const appointmentDate = getAppointmentDate(appointment);
      if (appointmentDate < new Date()) {
        err.day = 'appointment must be in the future';
        err.time = 'appointment must be in the future';
      }
    }
    catch (e) {
      if (e instanceof DateError) {
        err.day = 'appointment date is required';
        err.time = 'appointment time is required';
      }
      else if (e instanceof DayError) {
        err.day = 'appointment date is required';
      }
      else if (e instanceof TimeError) {
        err.time = 'appointment time is required';
      }
      else {
        err.day = e.message;
        err.time = e.message;
      }
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  }, [appointment]);

  const saveAppointment = React.useCallback((event) => {
    event.preventDefault(); // Don't post back
    if (!isValid()) {
      return;
    }
    setIsFormSubmitted(true);
    const data = {
      id: appointment.id,
      date: getAppointmentDate(appointment).toISOString(),
      appointmentType: appointment.appointmentType,
    };
    appointment.id
      ? api.editAppointment(data).then(handleSave)
      : api.addAppointment(data).then(handleSave);
  }, [isValid, appointment, handleSave]);

  const handleChange = React.useCallback((event) => {
    setAppointment({
      ...appointment,
      [event.target.name]: event.target.value,
    });
  }, [appointment, setAppointment]);

  const handleDayChange = React.useCallback((day) => {
    setAppointment({
      ...appointment,
      day: moment.tz(day, browserTime).format('YYYY-MM-DD'),
    });
  }, [appointment, setAppointment]);

  if (redirect) {
    const dayString = moment.tz(appointment.day, browserTime).format('YYYY-MM-DD');
    return <Redirect to={`/appointments/${dayString}`} />;
  }
  if (isLoading) return "Loading... 🦄";
  return (
    <>
      <h1>{appointment.id ? 'Update' : 'Add'} Appointment</h1>
      <form onSubmit={saveAppointment}>
        <Input
          name="appointmentType"
          label="Appointment Type"
          type="text"
          error={errors.appointmentType}
          id="appointment-type"
          onChange={handleChange}
          value={appointment.appointmentType}
        />

        <Input
          name="day"
          label="Apppointment Date"
          id="appointment-date"
          type="day"
          error={errors.day}
          onChange={handleDayChange}
          value={appointment.day}
        />

        <Input
          name="time"
          label="Appointment Time"
          type="time"
          error={errors.time}
          id="appointment-time"
          onChange={handleChange}
          value={appointment.time}
        />

        <input
          type="submit"
          disabled={isFormSubmitted}
          value={isFormSubmitted ? "Saving..." : "Save Appointment"}
        />
      </form>
    </>
  );
}

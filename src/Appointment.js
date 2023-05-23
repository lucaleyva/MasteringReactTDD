import React from "react";

export const Appointment = ({ customer }) => <div>{customer.firstName}</div>;

const appointmentTimeofDay = (startsAt) => {
    const [h, m] = new Date(startsAt).toTimeString().split(":");
    return `${h}:${m}`;
}

export const AppointmentsDayView = ( { appointments } ) => ( 
    <div id="appointmentsDayView"> 
    <ol> 
        {appointments.map(appointment => ( 
            <li key={appointment.startsAt}>
                {appointmentTimeofDay(appointment.startsAt)}
            </li>
        ))} 
    </ol> 
    {appointments.length === 0 ? (
        <p>There are no appointments scheduled for today.</p>) : (<Appointment {...appointments[0]} />)
    }
    </div> 
);
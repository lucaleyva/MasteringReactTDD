import React, {useState} from "react";

export const Appointment = ({ customer, service, stylist, notes, startsAt }) =>
    <div>
        <h3>{appointmentTimeofDay(startsAt)}</h3>
        <table>
            <tbody>
                <tr>
                    <td>
                        {customer.firstName}
                    </td>
                    <td>
                        {customer.lastName}
                    </td>
                    <td>
                        {customer.phoneNumber}
                    </td>
                    <td>
                        {stylist}
                    </td>
                    <td>
                        {service}
                    </td>
                    <td>
                        {notes}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>;

const appointmentTimeofDay = (startsAt) => {
    const [h, m] = new Date(startsAt).toTimeString().split(":");
    return `${h}:${m}`;
}

export const AppointmentsDayView = ( { appointments } ) => {
    const [selectedAppointment, setSelectedAppointment] = useState(0);
    return (
        <div id="appointmentsDayView">
        <ol>
            {appointments.map((appointment, i) => (
                <li key={appointment.startsAt}>
                    <button
                        type="button"
                        onClick={() => setSelectedAppointment(i)}
                    >
                        {appointmentTimeofDay(appointment.startsAt)}
                    </button>
                </li>
            ))}
        </ol>
        {
        appointments.length === 0 ?
            (<p>There are no appointments scheduled for today.</p>) :
                (<Appointment {...appointments[selectedAppointment]} />)
        }
        </div>
    );
};
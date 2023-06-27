import React from "react";
import {Appointment, AppointmentsDayView} from "../src/AppointmentsDayView";
import {sampleAppointments} from "../src/sampleData";
import {initializeReactContainer, render, click} from "./reactTestExtenstions";

beforeEach(() => {
  initializeReactContainer();
});

describe("Appointment", () => {

  const appt = sampleAppointments[0];
  const customer = appt.customer;
  const stylist = appt.stylist;
  const service = appt.service;
  const notes = appt.notes;
  const startsAt = appt.startsAt;
  const firstApptTime = "9:00";

  it("renders another customer first name", () => {
    const customer = { firstName: "Ashley" };
    render(<Appointment customer={customer} />);
    expect(document.body.textContent).toContain(customer.firstName);
  });

  it("renders another customer first name", () => {
    render(<Appointment customer={customer} />);
    expect(document.body.textContent).toContain(customer.firstName);
  });

  it("renders a customer last name", () => {
    render(<Appointment customer={customer} />);
    expect(document.body.textContent).toContain(customer.lastName);
  });

  it("renders a customer phone number", () => {
    render(<Appointment customer={customer} />);
    expect(document.body.textContent).toContain(customer.phoneNumber);
  });

  it("renders a customer stylist", () => {
    render(<Appointment customer={{}} stylist={stylist} />);
    expect(document.body.textContent).toContain(stylist);
  });

  it("renders a customer service", () => {
    render(<Appointment customer={{}} service={service} />);
    expect(document.body.textContent).toContain(service);
  });

  it("renders a customer notes", () => {
    render(<Appointment customer={{}} notes={notes} />);
    expect(document.body.textContent).toContain(notes);
  });

  it("renders an appointment start time", () => {
    render(<Appointment customer={{}} startsAt={startsAt} />);
    expect(document.body.textContent).toContain(firstApptTime);
  });

  it("renders all customer data", () => {
    render(<Appointment customer={customer} stylist={stylist} service={service} notes={notes} startsAt={startsAt}/>);
    expect(document.body.textContent).toContain(customer.firstName);
    expect(document.body.textContent).toContain(customer.lastName);
    expect(document.body.textContent).toContain(customer.phoneNumber);
    expect(document.body.textContent).toContain(stylist);
    expect(document.body.textContent).toContain(service);
    expect(document.body.textContent).toContain(notes);
    expect(document.body.textContent).toContain(firstApptTime);
  });

});

describe("AppointmentsDayView", () => {

  const today = new Date();
  const twoAppointments = [
    { startsAt: today.setHours(12, 0),
      customer: { firstName: "Ashley" }
    },
    { startsAt: today.setHours(13, 0),
      customer: { firstName: "Jordan" }
    },
  ];

  it("renders a div with the right id", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(
      document.querySelector(
        "div#appointmentsDayView"
        )
      ).not.toBeNull();
  });

  it("renders an ol element to display appointments", () => {
    render(<AppointmentsDayView appointments={[]} />);
    const listElement = document.querySelector("ol");
    expect(listElement).not.toBeNull();
  });

  it("renders an li for each appointment", () => {
    render(
      <AppointmentsDayView
        appointments={twoAppointments}
      />
    );
    const listChildren = document.querySelectorAll("ol > li");
    expect(listChildren).toHaveLength(2);
  });

  it("renders the time of each appointment", () => {
    render(
      <AppointmentsDayView appointments={twoAppointments}
      />
    );

    const listChildren = document.querySelectorAll("li");
    expect(listChildren[0].textContent).toEqual("12:00");
    expect(listChildren[1].textContent).toEqual("13:00");
  });

  it("initially shows a message saying there are no appointments today", () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(document.body.textContent).toContain("There are no appointments scheduled for today.");
  });

  it("selects the first appointment by default", () => {
    render(
      <AppointmentsDayView appointments={twoAppointments} />
    );

    expect(document.body.textContent).toContain("Ashley")
  });

  it("has a button element in each li", () => {
    render(
      <AppointmentsDayView appointments={twoAppointments} />
    );

    const buttons = document.querySelectorAll("li > button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0].type).toEqual("button")
  });

  it("renders another appointment when selected", () => {
    render(
      <AppointmentsDayView appointments={twoAppointments} />
    );

    const button = document.querySelectorAll("button")[1];
    click(button);
    expect(document.body.textContent).toContain("Jordan");
  });

});


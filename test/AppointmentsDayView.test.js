import React from "react";
import {Appointment, AppointmentsDayView} from "../src/AppointmentsDayView";
import {sampleAppointments} from "../src/sampleData";
import {click, element, elements, initializeReactContainer, render, textOf, typesOf} from "./reactTestExtenstions";

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
    expect(document.body).toContainText(customer.firstName);
  });

  it("renders another customer first name", () => {
    render(<Appointment customer={customer} />);
    expect(document.body).toContainText(customer.firstName);
  });

  it("renders a customer last name", () => {
    render(<Appointment customer={customer} />);
    expect(document.body).toContainText(customer.lastName);
  });

  it("renders a customer phone number", () => {
    render(<Appointment customer={customer} />);
    expect(document.body).toContainText(customer.phoneNumber);
  });

  it("renders a customer stylist", () => {
    render(<Appointment customer={{}} stylist={stylist} />);
    expect(document.body).toContainText(stylist);
  });

  it("renders a customer service", () => {
    render(<Appointment customer={{}} service={service} />);
    expect(document.body).toContainText(service);
  });

  it("renders a customer notes", () => {
    render(<Appointment customer={{}} notes={notes} />);
    expect(document.body).toContainText(notes);
  });

  it("renders an appointment start time", () => {
    render(<Appointment customer={{}} startsAt={startsAt} />);
    expect(document.body).toContainText(firstApptTime);
  });

  it("renders all customer data", () => {
    render(<Appointment customer={customer} stylist={stylist} service={service} notes={notes} startsAt={startsAt}/>);
    expect(document.body).toContainText(customer.firstName);
    expect(document.body).toContainText(customer.lastName);
    expect(document.body).toContainText(customer.phoneNumber);
    expect(document.body).toContainText(stylist);
    expect(document.body).toContainText(service);
    expect(document.body).toContainText(notes);
    expect(document.body).toContainText(firstApptTime);
  });

});

function secondButton() {
    return elements("button")[1];
}

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
      element(
        "div#appointmentsDayView"
        )
      ).not.toBeNull();
  });

  it("renders an ol element to display appointments", () => {
    render(<AppointmentsDayView appointments={[]} />);
      expect(element("ol")).not.toBeNull();
  });

  it("renders an li for each appointment", () => {
    render(
      <AppointmentsDayView
        appointments={twoAppointments}
      />
    );
      expect(elements("ol > li")).toHaveLength(2);
  });

  it("renders the time of each appointment", () => {
    render(
      <AppointmentsDayView appointments={twoAppointments}
      />
    );

    expect(textOf(elements("li"))).toEqual(["12:00", "13:00"]);
  });

  it("initially shows a message saying there are no appointments today", () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(document.body).toContainText("There are no appointments scheduled for today.");
  });

  it("selects the first appointment by default", () => {
    render(
      <AppointmentsDayView appointments={twoAppointments} />
    );

    expect(document.body).toContainText("Ashley")
  });

  it("has a button element in each li", () => {
    render(
      <AppointmentsDayView appointments={twoAppointments} />
    );

    expect(typesOf(elements("li > *"))).toEqual([ "button", "button", ]);
  });

  it("renders another appointment when selected", () => {
    render(
      <AppointmentsDayView appointments={twoAppointments} />
    );

    click(secondButton());
    expect(document.body).toContainText("Jordan");
  });

});


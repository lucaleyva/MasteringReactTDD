import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Appointment, AppointmentsDayView } from "../src/AppointmentsDayView";

describe("Appointment", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
  });

  const render = (component) => act(() => ReactDOM.createRoot(container).render(component));

  it("renders another customer first name", () => {
    const customer = { firstName: "Ashley" };
    act(() => ReactDOM.createRoot(container).render(<Appointment customer={customer} />));
    expect(document.body.textContent).toContain("Ashley");
  });

  it("renders another customer first name", () => {
    const customer = { firstName: "Jordan" };
    act(() => ReactDOM.createRoot(container).render(<Appointment customer={customer} />));
    expect(document.body.textContent).toContain("Jordan");
  });

  it("renders a customer last name", () => {
    const customer = { lastName: "Smith" };
    act(() => ReactDOM.createRoot(container).render(<Appointment customer={customer} />));
    expect(document.body.textContent).toContain("Smith");
  });

  it("renders a customer phone number", () => {
    const customer = { phoneNumber: "12345678910" };
    act(() => ReactDOM.createRoot(container).render(<Appointment customer={customer} />));
    expect(document.body.textContent).toContain("12345678910");
  });

  it("renders a customer stylist", () => {
    const customer = { stylist: "Jen" };
    act(() => ReactDOM.createRoot(container).render(<Appointment customer={customer} />));
    expect(document.body.textContent).toContain("Jen");
  });

  it("renders a customer service", () => {
    const customer = { service: "cut" };
    act(() => ReactDOM.createRoot(container).render(<Appointment customer={customer} />));
    expect(document.body.textContent).toContain("cut");
  });

  it("renders a customer notes", () => {
    const customer = { notes: "don't shave" };
    act(() => ReactDOM.createRoot(container).render(<Appointment customer={customer} />));
    expect(document.body.textContent).toContain("don't shave");
  });

  it("renders all customer data", () => {
      const customer = { firstName: "Jordan", lastName: "Smith", phoneNumber: "12345678910", stylist: "Jen", service: "cut", notes: "don't shave" };
      act(() => ReactDOM.createRoot(container).render(<Appointment customer={customer} />));
      expect(document.body.textContent).toContain("Jordan");
      expect(document.body.textContent).toContain("Smith");
      expect(document.body.textContent).toContain("12345678910");
      expect(document.body.textContent).toContain("Jen");
      expect(document.body.textContent).toContain("cut");
      expect(document.body.textContent).toContain("don't shave");
  });

});

describe("AppointmentsDayView", () => {
  let container;

  const today = new Date();
  const twoAppointments = [
    { startsAt: today.setHours(12, 0),
      customer: { firstName: "Ashley" }
    },
    { startsAt: today.setHours(13, 0),
      customer: { firstName: "Jordan" }
    },
  ];

  beforeEach(() => {
    container =
      document.createElement("div");
      document.body.replaceChildren(container);
  });

  const render = (component) =>
    act(() =>
      ReactDOM.createRoot(container).render(component)
  );
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
    act(() => button.click());
    expect(document.body.textContent).toContain("Jordan");
  });

});


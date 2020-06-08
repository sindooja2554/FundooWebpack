import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import Register from "./components/Register";
import { shallow } from "enzyme";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe("Register Component", () => {
  it("Should have only 1 class with same name", () => {
    const component = shallow(<Register />);
    const wrapper = component.find(".registerMain");
    expect(wrapper.length).toBe(1);
  });
});

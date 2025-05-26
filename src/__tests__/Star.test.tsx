import React from "react";
import { render } from "@testing-library/react";
import { Star } from "../components/Star";
describe("Star Component", () => {
  it("renders a filled star when 'filled' is true", () => {
    const { container } = render(<Star filled={true} />);
    const starIcon = container.querySelector("svg");
    expect(starIcon).toHaveStyle("color: orange");
  });
  it("renders an unfilled star when 'filled' is false", () => {
    const { container } = render(<Star filled={false} />);
    const starIcon = container.querySelector("svg");
    expect(starIcon).toHaveStyle("color: lightgray");
  });
});

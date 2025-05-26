import React from "react";
import { render, screen } from "@testing-library/react";
import { DefaultMessage } from "../components/DefaultMessage";

describe("DefaultMessage Component", () => {
  it("renders the default message", () => {
    render(<DefaultMessage />);
    expect(
      screen.getByText(
        /Select a movie from the Star Wars saga list to see more details.../i
      )
    ).toBeInTheDocument();
  });

  it("has the correct CSS class applied", () => {
    render(<DefaultMessage />);
    const messageElement = screen.getByText(
      /Select a movie from the Star Wars saga list to see more details.../i
    );
    expect(messageElement).toHaveClass("p1 grey");
  });
});

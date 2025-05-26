import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "../components/ErrorBoundary";

describe("ErrorBoundary Component", () => {
  const ProblematicComponent = () => {
    throw new Error("Test error");
  };

  it("renders children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <div>All good!</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("All good!")).toBeInTheDocument();
  });

  it("renders fallback UI when an error is thrown", () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText("Something went wrong. Please try again later.")
    ).toBeInTheDocument();
  });

  it("logs the error to the console", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      "ErrorBoundary caught an error",
      expect.any(Error),
      expect.any(Object)
    );

    consoleSpy.mockRestore();
  });
});

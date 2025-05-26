import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "./Header";

describe("Header Component", () => {
  let mockSetSearchText: jest.Mock;
  let mockSetSortField: jest.Mock;

  beforeEach(() => {
    mockSetSearchText = jest.fn();
    mockSetSortField = jest.fn();
  });

  it("renders the sort dropdown and search input", () => {
    render(
      <Header
        setSearchText={mockSetSearchText}
        setSortField={mockSetSortField}
      />
    );

    expect(screen.getByLabelText(/Sort by:/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Type to search../i)
    ).toBeInTheDocument();
  });

  it("calls setSortField when a sort option is selected", () => {
    render(
      <Header
        setSearchText={mockSetSearchText}
        setSortField={mockSetSortField}
      />
    );

    const selectElement = screen.getByLabelText(/Sort by:/i);
    fireEvent.change(selectElement, { target: { value: "rating" } });

    expect(mockSetSortField).toHaveBeenCalledWith("rating");
  });

  it("calls setSearchText when text is entered in the search input", () => {
    render(
      <Header
        setSearchText={mockSetSearchText}
        setSortField={mockSetSortField}
      />
    );

    const inputElement = screen.getByPlaceholderText(/Type to search../i);
    fireEvent.change(inputElement, { target: { value: "Star Wars" } });

    expect(mockSetSearchText).toHaveBeenCalledWith("Star Wars");
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ActionUnits } from "../../../../../src/actorsScript/components/characterBuildings/actionUnits/ActionUnits";

describe("ActionUnits Component", () => {
  const mockSetFormData = jest.fn();
  const mockFormData = {
    center: "",
    sceneCircumstances: "",
    previousCircumstances: "",
    startingPoint: "",
    relationshipCircumstances: [],
    actionUnits: [
      { action: "Test Action", strategies: ["Strategy 1", "Strategy 2"] },
    ],
  };

  beforeEach(() => {
    mockSetFormData.mockClear();
  });

  it("renders the component with initial action units", () => {
    render(<ActionUnits formData={mockFormData} setFormData={mockSetFormData} />);

    expect(screen.getByDisplayValue("Test Action")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Strategy 1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Strategy 2")).toBeInTheDocument();
  });

  it("adds a new action unit", () => {
    render(<ActionUnits formData={mockFormData} setFormData={mockSetFormData} />);

    const addButton = screen.getByRole("button", { name: /add-action-unit/i });
    fireEvent.click(addButton);

    expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function));

    const updaterFunction = mockSetFormData.mock.calls[0][0];
    const updatedFormData = updaterFunction(mockFormData);

    expect(updatedFormData).toEqual(
      expect.objectContaining({
        actionUnits: expect.arrayContaining([
          expect.objectContaining({ action: "", strategies: [] }),
        ]),
      })
    );
  });

  it("removes an action unit", () => {
    render(<ActionUnits formData={mockFormData} setFormData={mockSetFormData} />);

    const deleteButton = screen.getByTestId("delete-action-unit");
    fireEvent.click(deleteButton);

    expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function));
    const updaterFunction = mockSetFormData.mock.calls[0][0];
    const updatedFormData = updaterFunction(mockFormData);
    expect(updatedFormData).toEqual(
      expect.objectContaining({
        actionUnits: expect.not.arrayContaining([
          expect.objectContaining({ action: "Test Action" }),
        ]),
      })
    );
  });

  it("updates an action unit's action", () => {
    render(<ActionUnits formData={mockFormData} setFormData={mockSetFormData} />);

    const actionInput = screen.getByDisplayValue("Test Action");
    fireEvent.change(actionInput, { target: { value: "Updated Action" } });

    expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function));
    const updaterFunction = mockSetFormData.mock.calls[0][0];
    const updatedFormData = updaterFunction(mockFormData);
    expect(updatedFormData).toEqual(
      expect.objectContaining({
        actionUnits: expect.arrayContaining([
          expect.objectContaining({ action: "Updated Action" }),
        ]),
      })
    );
  });

  it("adds a new strategy to an action unit", () => {
    render(<ActionUnits formData={mockFormData} setFormData={mockSetFormData} />);

    const addStrategyButton = screen.getByRole("button", { name: /add-strategy/i });
    fireEvent.click(addStrategyButton);

    expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function));
    const updaterFunction = mockSetFormData.mock.calls[0][0];
    const updatedFormData = updaterFunction(mockFormData);
    expect(updatedFormData).toEqual(
      expect.objectContaining({
        actionUnits: expect.arrayContaining([
          expect.objectContaining({
            strategies: expect.arrayContaining([""]),
          }),
        ]),
      })
    );
  });

  it("removes a strategy from an action unit", () => {
    const mockFormDataWithStrategies = {
      ...mockFormData,
      actionUnits: [
        {
          action: "Test Action",
          strategies: ["Strategy 1"],
        },
      ],
    };
    render(<ActionUnits formData={mockFormDataWithStrategies} setFormData={mockSetFormData} />);

    const deleteButton = screen.getByTestId("delete-strategy");
    fireEvent.click(deleteButton);

    expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function));
    const updaterFunction = mockSetFormData.mock.calls[0][0];
    const updatedFormData = updaterFunction(mockFormDataWithStrategies);
    expect(updatedFormData).toEqual(
      expect.objectContaining({
        actionUnits: expect.arrayContaining([
          expect.objectContaining({
            strategies: expect.not.arrayContaining(["Strategy 1"]),
          }),
        ]),
      })
    );
  });

  it("updates a strategy's text", () => {
    render(<ActionUnits formData={mockFormData} setFormData={mockSetFormData} />);

    const strategyInput = screen.getByDisplayValue("Strategy 1");
    fireEvent.change(strategyInput, { target: { value: "Updated Strategy" } });

    expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function));
    const updaterFunction = mockSetFormData.mock.calls[0][0];
    const updatedFormData = updaterFunction(mockFormData);
    expect(updatedFormData).toEqual(
      expect.objectContaining({
        actionUnits: expect.arrayContaining([
          expect.objectContaining({
            strategies: expect.arrayContaining(["Updated Strategy"]),
          }),
        ]),
      })
    );
  });
});
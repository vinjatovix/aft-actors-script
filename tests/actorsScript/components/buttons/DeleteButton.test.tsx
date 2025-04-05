import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DeleteButton } from "../../../../src/actorsScript/components/buttons/DeleteButton";

describe("DeleteButton", () => {
  it("renders the button with the delete icon", () => {
    render(<DeleteButton handleOnClick={jest.fn()} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByTestId("DeleteIcon")).toBeInTheDocument();
  });

  it("calls handleOnClick when clicked", () => {
    const handleOnClickMock = jest.fn();

    render(<DeleteButton handleOnClick={handleOnClickMock} />);
    
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleOnClickMock).toHaveBeenCalledTimes(1);
  });
});

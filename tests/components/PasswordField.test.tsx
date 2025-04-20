import '@testing-library/jest-dom';
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { PasswordField } from "../../src/components/PasswordField";

describe("PasswordField Component", () => {
    const defaultProps = {
        name: "password",
        label: "Password",
        value: "",
        onChange: jest.fn(),
        error: "",
        placeholder: "Enter your password",
        autoComplete: "off",
    };

    it("renders the PasswordField component", () => {
        render(<PasswordField {...defaultProps} />);

        expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });

    it("toggles password visibility on icon button click", async () => {
        render(<PasswordField {...defaultProps} />);
        const input = screen.getByLabelText("Password");
        const toggleButton = screen.getByRole("button");

        expect(input).toHaveAttribute("type", "password");

        act(() => {
            fireEvent.mouseDown(toggleButton);
        });
        await waitFor(() => {
            expect(input).toHaveAttribute("type", "text");
        });

        act(() => {
            fireEvent.mouseUp(toggleButton);
        });
        await waitFor(() => {
            expect(input).toHaveAttribute("type", "password");
        });
    });

    it("displays an error message when error prop is provided", () => {
        const errorMessage = "Password is required";

        render(<PasswordField {...defaultProps} error={errorMessage} />);

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it("calls onChange handler when input value changes", () => {
        render(<PasswordField {...defaultProps} />);
        const input = screen.getByLabelText("Password");

        fireEvent.change(input, { target: { value: "new-password" } });

        expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    });
});
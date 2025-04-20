import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordFieldProps {
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    placeholder?: string;
    autoComplete?: string;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
    name,
    label,
    value,
    onChange,
    error,
    placeholder,
    autoComplete,
}) => {
    const [visible, setVisible] = useState(false);

    const handleMouseDown = () => setVisible(true);
    const handleMouseUp = () => setVisible(false);

    return (
        <>
            <TextField
                name={name}
                label={label}
                type={visible ? "text" : "password"}
                value={value}
                onChange={onChange}
                fullWidth
                placeholder={placeholder}
                autoComplete={autoComplete}
                error={!!error}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onMouseDown={handleMouseDown}
                                    onMouseUp={handleMouseUp}
                                    onMouseLeave={handleMouseUp}
                                    onTouchStart={handleMouseDown}
                                    onTouchEnd={handleMouseUp}
                                >
                                    {visible ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
            />
            {error && <p className="error-message">{error}</p>}
        </>
    );
};


import React from 'react';
import { FormErrors } from '../auth/hooks/useFormValidation';

const getInputType = (field: string): React.HTMLInputTypeAttribute | undefined => {
    if (/password/i.test(field)) return "password";
    return field === "email" ? "email" : "text";
};

const getAutocompleteProps = (field: string, isNewPassword: boolean) => {
    let autoComplete: string;
    if (field === "email") {
        autoComplete = "username";
    } else if (/password/i.test(field)) {
        autoComplete = isNewPassword ? "new-password" : "current-password";
    } else {
        autoComplete = "off";
    }

    
    return autoComplete
}


interface InputTextFieldProps {
    field: string;
    formData: { [key: string]: string };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors: FormErrors;
    translationMap: { [key: string]: string };
    isNewPassword?: boolean;
}

export const InputTextField: React.FC<InputTextFieldProps> = ({
    field,
    formData,
    handleInputChange,
    errors,
    translationMap,
    isNewPassword = false,
}) => {
    const inputType = getInputType(field);
    const autoComplete
        = getAutocompleteProps(field, isNewPassword);

    const errorMessage = errors[field as keyof FormErrors];
    const placeholder = translationMap[field as keyof typeof translationMap];
    const value = formData[field as keyof typeof formData];

    return (
        <div key={field}>
            <input
                type={inputType}
                name={field}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                autoComplete={autoComplete}
            />
            {errorMessage && (
                <div className="error-message small">
                    {errorMessage}
                </div>
            )}
        </div>
    );
};


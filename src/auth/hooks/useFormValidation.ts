import { useState } from "react";
import { isInjectionFree } from "../../utils/isInjectionFree";
import { REGEX } from "../../constants";

export interface FormData {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string;
}

export const useFormValidation = <
  T extends Record<string, string | number | boolean | null | undefined>,
>(
  initialFormData: T,
) => {
  const initialErrors: FormErrors = Object.keys(
    initialFormData,
  ).reduce<FormErrors>(
    (acc: FormErrors, key: string) => ({ ...acc, [key]: "" }),
    {},
  );
  const [formData, setFormData] = useState<T>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);

  const validateEmail = (email: string): boolean =>
    REGEX.email.valid.test(email) &&
    !REGEX.email.forbiddenDomains.some((domain) => domain.test(email));

  const validatePassword = (password: string): boolean =>
    REGEX.password.test(password);

  const validateField = (
    field: string,
    value: string | number | boolean | null | undefined,
    newErrors: FormErrors,
  ): boolean => {
    let valid = true;

    if (typeof value === "string" && value.length > REGEX.maxInputLength) {
      newErrors[field] = `O valor excede ${REGEX.maxInputLength} caracteres.`;
      valid = false;
    } else if (typeof value === "string" && !value.trim()) {
      newErrors[field] = "É obrigatorio.";
      valid = false;
    } else if (typeof value === "string" && !isInjectionFree(value)) {
      newErrors[field] = "Amodo oh! -9001";
      valid = false;
    } else if (
      field === "email" &&
      typeof value === "string" &&
      !validateEmail(value)
    ) {
      newErrors.email = "O correo non é válido.";
      valid = false;
    } else if (
      field === "password" &&
      typeof value === "string" &&
      !validatePassword(value)
    ) {
      newErrors.password = "O contrasinal é feble.";
      valid = false;
    } else if (field === "repeatPassword" && value !== formData.password) {
      newErrors.repeatPassword = "Os contrasinais non coinciden.";
      valid = false;
    } else if (
      field === "username" &&
      typeof value === "string" &&
      !REGEX.username.test(value)
    ) {
      newErrors.username = "O nome de usuario non é válido.";
      valid = false;
    }

    return valid;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = { ...initialErrors };
    let valid = true;

    for (const field in formData) {
      const value = formData[field];
      if (!validateField(field, value, newErrors)) {
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    validateForm,
    handleInputChange,
  };
};

import { useState } from 'react';
import { isInjectionFree } from '../../utils/isInjectionFree';
import { REGEX } from '../../constants';
import { useTranslation } from 'react-i18next';

export interface FormData {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string;
}

export const useFormValidation = <
  T extends Record<string, string | number | boolean | null | undefined>
>(
  initialFormData: T
) => {
  const { t } = useTranslation('formValidationErrors');

  const initialErrors: FormErrors = Object.keys(
    initialFormData
  ).reduce<FormErrors>(
    (acc: FormErrors, key: string) => ({ ...acc, [key]: '' }),
    {}
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
    newErrors: FormErrors
  ): boolean => {
    let valid = true;

    if (typeof value === 'string' && value.length > REGEX.maxInputLength) {
      newErrors[field] = t('valueExceeds').replace(
        '{{max}}',
        REGEX.maxInputLength.toString()
      );
      valid = false;
    } else if (typeof value === 'string' && !value.trim()) {
      newErrors[field] = t('required');
      valid = false;
    } else if (typeof value === 'string' && !isInjectionFree(value)) {
      newErrors[field] = t('injectionError');
      valid = false;
    } else if (
      field === 'email' &&
      typeof value === 'string' &&
      !validateEmail(value)
    ) {
      newErrors.email = t('invalidEmail');
      valid = false;
    } else if (
      field === 'password' &&
      typeof value === 'string' &&
      !validatePassword(value)
    ) {
      newErrors.password = t('weakPassword');
      valid = false;
    } else if (field === 'repeatPassword' && value !== formData.password) {
      newErrors.repeatPassword = t('passwordsDontMatch');
      valid = false;
    } else if (
      field === 'username' &&
      typeof value === 'string' &&
      !REGEX.username.test(value)
    ) {
      newErrors.username = t('invalidUsername');
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
    target: { name, value }
  }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors(initialErrors);
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    validateForm,
    handleInputChange,
    resetForm
  };
};

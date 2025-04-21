import '@testing-library/jest-dom';
import { screen, fireEvent, act } from '@testing-library/react';
import { i18n as I18nType } from 'i18next';

import { initializeI18n } from '../test-utils/i18nTest';
import { renderWithProviders } from '../test-utils/renderWithProviders';
import { mockStore } from '../__mocks__/mockStore';

import { Register } from '../../src/auth/pages/Register';

jest.mock('../../src/utils/handleFetch', () => ({
  handleFetch: jest
    .fn()
    .mockImplementation(() => Promise.reject(new Error('BackEndError')))
}));

const fillRegisterForm = (
  username: string,
  email: string,
  password: string,
  repeatPassword: string
) => {
  fireEvent.change(screen.getByLabelText(t('username')), {
    target: { value: username }
  });
  fireEvent.change(screen.getByLabelText(t('email')), {
    target: { value: email }
  });
  fireEvent.change(screen.getByLabelText(t('password')), {
    target: { value: password }
  });
  fireEvent.change(screen.getByLabelText(t('repeatPassword')), {
    target: { value: repeatPassword }
  });
};

let store: ReturnType<typeof mockStore>;
let i18nTest: I18nType;
let t: (key: string, ns?: string) => string;

describe('Register Page', () => {
  beforeAll(async () => {
    i18nTest = await initializeI18n();
    t = (key: string, ns: string = 'register') => i18nTest.t(key, { ns });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    store = mockStore();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const renderRegisterPage = () =>
    renderWithProviders({ store, ui: <Register />, i18nInstance: i18nTest });

  it('should render the registration form', () => {
    const labels = [
      t('username'),
      t('email'),
      t('password'),
      t('repeatPassword')
    ];

    renderRegisterPage();

    labels.forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
    expect(
      screen.getByRole('button', { name: t('submit') })
    ).toBeInTheDocument();
  });

  it('should display validation errors when form is submitted with invalid data', async () => {
    const errorMessages = [t('required', 'formValidationErrors')];

    renderRegisterPage();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: t('submit') }));
    });

    errorMessages.forEach((message) => {
      expect(screen.getAllByText(message)).toHaveLength(4);
    });
  });

  it('should dispatch register action when form is submitted with valid data', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    renderRegisterPage();
    fillRegisterForm(
      'TestUser',
      'test@example.com',
      'Password.123',
      'Password.123'
    );

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: t('submit') }));
    });

    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should display error message when email is invalid', async () => {
    renderRegisterPage();
    fireEvent.change(screen.getByPlaceholderText('aaron@swartz.op'), {
      target: { value: 'test@test' }
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: t('submit') }));
    });

    expect(
      screen.getByText(t('invalidEmail', 'formValidationErrors'))
    ).toBeInTheDocument();
  });

  it('should display error message when passwords do not match', async () => {
    renderRegisterPage();
    fillRegisterForm(
      'Test User',
      'test@da.com',
      'Password@123',
      'Password@456'
    );

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: t('submit') }));
    });

    expect(
      screen.getByText(t('passwordsDontMatch', 'formValidationErrors'))
    ).toBeInTheDocument();
  });

  it('should display error message when password is invalid', async () => {
    renderRegisterPage();
    fireEvent.change(screen.getByLabelText(t('password')), {
      target: { value: 'password' }
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: t('submit') }));
    });

    expect(
      screen.getByText(t('weakPassword', 'formValidationErrors'))
    ).toBeInTheDocument();
  });

  it('should display error message when username is invalid', async () => {
    renderRegisterPage();
    fillRegisterForm(
      'Test User',
      'dsa@dsa.com',
      'Password.123',
      'Password.123'
    );

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: t('submit') }));
    });

    expect(
      screen.getByText(t('invalidUsername', 'formValidationErrors'))
    ).toBeInTheDocument();
  });

  test.each([
    "<script>alert('XSS')</script>",
    '<img src=x onerror=alert(1)>',
    '%0D%0A'
  ])(
    'should display error message when input contains injection characters: %p',
    async (inj) => {
      renderRegisterPage();
      fillRegisterForm('testUser', 'das@das.com', inj, 'Password.123');

      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: t('submit') }));
      });

      expect(
        screen.getByText(t('injectionError', 'formValidationErrors'))
      ).toBeInTheDocument();
    }
  );

  it('should render the backend error message', async () => {
    renderRegisterPage();
    fillRegisterForm('TestUser', 'te@dsa.com', 'Password.123', 'Password.123');

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: t('submit') }));
    });

    expect(screen.queryByText('BackEndError')).toBeInTheDocument();
  });
});

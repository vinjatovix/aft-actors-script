import { screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

import { renderWithProviders } from '../test-utils/renderWithProviders';
import { mockStore } from '../__mocks__/mockStore';

import Login from '../../src/auth/pages/Login';
import i18n from '../../src/i18n';

jest.mock('../../src/utils/handleFetch', () => ({
  handleFetch: jest
    .fn()
    .mockImplementation(() => Promise.reject(new Error('BackEndError')))
}));

const fillLoginForm = (email: string, password: string) => {
  fireEvent.change(screen.getByLabelText(t('email')), {
    target: { value: email }
  });
  fireEvent.change(screen.getByLabelText(t('password')), {
    target: { value: password }
  });
};

let store: ReturnType<typeof mockStore>;
let t: (key: string, ns?: string) => string;

describe('Login Page', () => {
  beforeAll(async () => {
    t = (key: string, ns: string = 'login') => i18n.t(key, { ns });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    store = mockStore();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const renderLoginPage = () => renderWithProviders({ store, ui: <Login /> });

  it('should render the login form', () => {
    renderLoginPage();

    expect(screen.getByPlaceholderText('aaron@swartz.com')).toBeInTheDocument();
    expect(screen.getByLabelText(t('password'))).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: t('submit') })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Google' })).toBeInTheDocument();
  });

  it('should dispatch login action when form is submitted', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    renderLoginPage();
    fillLoginForm('test@example.com', 'password123Adwr!');

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: t('submit') }));
    });

    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should render the backend error message', async () => {
    renderLoginPage();
    fillLoginForm('a@a.com', 'password123Adwr!');

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: t('submit') }));
    });

    expect(screen.queryByText('BackEndError')).toBeInTheDocument();
  });

  it('should display validation errors when form is submitted with invalid data', async () => {
    const errorMessages = [t('required', 'formValidationErrors')];
    renderLoginPage();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: t('submit') }));
    });

    errorMessages.forEach((message) => {
      expect(screen.getAllByText(message)).toHaveLength(2);
    });
  });
});

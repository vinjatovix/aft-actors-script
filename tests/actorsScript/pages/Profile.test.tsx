import '@testing-library/jest-dom';
import { act, fireEvent, screen } from '@testing-library/react';

import { Profile } from '../../../src/actorsScript/pages/Profile';

import { handleFetch } from '../../../src/utils/handleFetch';
import { renderWithProviders } from '../../test-utils/renderWithProviders';
import { mockStore } from '../../__mocks__/mockStore';
import { users } from '../../data';
import i18n from '../../../src/i18n';

jest.mock('../../../src/utils/handleFetch', () => ({
  handleFetch: jest.fn()
}));

const renderComponent = (store: ReturnType<typeof mockStore>) =>
  renderWithProviders({ store, ui: <Profile /> });

const fillForm = (
  newPassword: string,
  repeatPassword: string,
  oldPassword: string
) => {
  fireEvent.change(screen.getByLabelText(t('newPassword')), {
    target: { value: newPassword }
  });
  fireEvent.change(screen.getByLabelText(t('repeatPassword')), {
    target: { value: repeatPassword }
  });
  fireEvent.change(screen.getByLabelText(t('currentPassword')), {
    target: { value: oldPassword }
  });
};

let store: ReturnType<typeof mockStore>;
let t: (key: string, ns?: string) => string;

describe('Profile', () => {
  beforeAll(async () => {
    t = (key: string, ns: string = 'profile') => i18n.t(key, { ns });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({
      auth: { token: 'mockToken', user: users[0] }
    });
  });

  it('renders the Profile page with an user title', () => {
    renderComponent(store);

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
      t('userProfile')
    );
  });

  it('renders the Profile page with an admin title', () => {
    store = mockStore({
      auth: { token: 'mockToken', user: users[1] }
    });

    renderComponent(store);

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
      t('adminProfile')
    );
  });

  it('should render the update password form', () => {
    renderComponent(store);

    ['newPassword', 'repeatPassword', 'currentPassword'].forEach((field) => {
      expect(screen.getByLabelText(t(field))).toBeInTheDocument();
    });
    expect(
      screen.getByRole('button', { name: t('updatePassword') })
    ).toBeInTheDocument();
  });

  it('renders loading state when loading is true', () => {
    store = mockStore({
      auth: { token: 'mockToken', user: users[0], loading: true }
    });
    renderComponent(store);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should display validation errors when form is submitted with invalid data', async () => {
    renderComponent(store);

    fillForm('', '', '');

    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', { name: t('updatePassword') })
      );
    });

    expect(screen.getAllByText('É obrigatorio.')).toHaveLength(3);
  });

  it('should render the backend error message', async () => {
    (handleFetch as jest.Mock).mockImplementation(() => {
      throw new Error('BackEndError');
    });
    renderComponent(store);
    fillForm('SuperSecr3tPassword%', 'SuperSecr3tPassword%', 'oldPassword');

    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', { name: t('updatePassword') })
      );
    });

    expect(await screen.findByText(/BackEndError/i)).toBeInTheDocument();
  });

  it('should dispatch updatePassword action when form is submitted', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    renderComponent(store);
    fillForm(
      'Sup3rSecretPassword%',
      'Sup3rSecretPassword%',
      'Sup3rSecretPassword'
    );

    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', { name: t('updatePassword') })
      );
    });

    expect(dispatchSpy).toHaveBeenCalled();
  });
});

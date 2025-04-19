import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { mockStore } from '../../__mocks__/mockStore';
import { Profile } from '../../../src/actorsScript/pages/Profile';
import { users } from '../../data';
import { handleFetch } from '../../../src/utils/handleFetch';

jest.mock('../../../src/utils/handleFetch', () => ({
  handleFetch: jest.fn()
}));

const renderWithProvider = (store: ReturnType<typeof mockStore>) =>
  render(
    <Provider store={store}>
      <Profile />
    </Provider>
  );

const fillForm = (
  newPassword: string,
  repeatPassword: string,
  oldPassword: string
) => {
  fireEvent.change(screen.getByLabelText('novo contrasinal'), {
    target: { value: newPassword }
  });
  fireEvent.change(screen.getByLabelText('repita o novo contrasinal'), {
    target: { value: repeatPassword }
  });
  fireEvent.change(screen.getByLabelText('contrasinal actual'), {
    target: { value: oldPassword }
  });
};

describe('Profile', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      auth: { token: 'mockToken', user: users[0] }
    });
  });

  it('renders the Profile page with an user title', () => {
    renderWithProvider(store);

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
      'Perfil de usuario'
    );
  });

  it('renders the Profile page with an admin title', () => {
    store = mockStore({
      auth: { token: 'mockToken', user: users[1] }
    });

    renderWithProvider(store);

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
      'Perfil de administrador'
    );
  });

  it('should render the update password form', () => {
    renderWithProvider(store);

    expect(screen.getByLabelText('novo contrasinal')).toBeInTheDocument();
    expect(
      screen.getByLabelText('repita o novo contrasinal')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('contrasinal actual')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Actualizar' })
    ).toBeInTheDocument();
  });

  it('renders loading state when loading is true', () => {
    store = mockStore({
      auth: { token: 'mockToken', user: users[0], loading: true }
    });
    renderWithProvider(store);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should display validation errors when form is submitted with invalid data', async () => {
    renderWithProvider(store);

    fillForm('', '', '');

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Actualizar' }));
    });

    expect(screen.getAllByText('É obrigatorio.')).toHaveLength(3);
  });

  it('should render the backend error message', async () => {
    (handleFetch as jest.Mock).mockImplementation(() => {
      throw new Error('BackEndError');
    });
    renderWithProvider(store);
    fillForm('SuperSecr3tPassword%', 'SuperSecr3tPassword%', 'oldPassword');

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Actualizar' }));
    });

    expect(await screen.findByText(/BackEndError/i)).toBeInTheDocument();
  });

  it('should dispatch updatePassword action when form is submitted', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    renderWithProvider(store);
    fillForm(
      'Sup3rSecretPassword%',
      'Sup3rSecretPassword%',
      'Sup3rSecretPassword'
    );

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Actualizar' }));
    });

    expect(dispatchSpy).toHaveBeenCalled();
  });
});

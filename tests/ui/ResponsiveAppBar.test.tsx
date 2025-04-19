import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import authReducer from '../../src/redux/slices/authSlice';
import ResponsiveAppBar from '../../src/ui/ResponsiveAppBar';

const mockStore = (preloadedState = {}) =>
  configureStore({
    reducer: { auth: authReducer },
    preloadedState
  });

const renderWithProviders = (store: ReturnType<typeof mockStore>) =>
  render(
    <Provider store={store}>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ResponsiveAppBar />
      </BrowserRouter>
    </Provider>
  );

describe('ResponsiveAppBar Component', () => {
  it('should render the home link', () => {
    const store = mockStore({ auth: { user: null, token: null } });

    renderWithProviders(store);

    expect(screen.getByText('Fogar')).toBeInTheDocument();
    expect(screen.queryByText('DramaturgX')).not.toBeInTheDocument();
  });

  it('should render login link when user is not authenticated', () => {
    const store = mockStore({ auth: { user: null, token: null } });

    renderWithProviders(store);

    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should render navigation items when user is authenticated', () => {
    const store = mockStore({
      auth: { user: { username: 'testuser' }, token: 'testtoken' }
    });

    renderWithProviders(store);

    expect(screen.getByText('Fogar')).toBeInTheDocument();
    expect(screen.getByText('DramaturgX')).toBeInTheDocument();
    expect(screen.getByText('Obras')).toBeInTheDocument();
    expect(screen.getByText('Persoaxes')).toBeInTheDocument();
    expect(screen.getByText('Esceas')).toBeInTheDocument();
  });

  it('should render the settings menu when user is authenticated', () => {
    const store = mockStore({
      auth: { user: { username: 'testuser' }, token: 'testtoken' }
    });
    renderWithProviders(store);

    fireEvent.click(screen.getByLabelText('Open settings'));

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('should logout when logout button is clicked', () => {
    const store = mockStore({
      auth: { user: { username: 'testuser' }, token: 'testtoken' }
    });
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    renderWithProviders(store);
    fireEvent.click(screen.getByLabelText('Open settings'));

    fireEvent.click(screen.getByText('Logout'));

    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'auth/logout' });
  });
});

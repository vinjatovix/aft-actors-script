import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { renderWithProviders } from '../test-utils/renderWithProviders';
import { mockStore } from '../__mocks__/mockStore';

import ResponsiveAppBar from '../../src/ui/ResponsiveAppBar';
import i18n from '../../src/i18n';
import { users } from '../data';

const t = (key: string, ns: string = 'common') => i18n.t(key, { ns });
const renderComponent = (store: ReturnType<typeof mockStore>) =>
  renderWithProviders({
    store,
    ui: <ResponsiveAppBar />
  });

let store: ReturnType<typeof mockStore>;

describe('ResponsiveAppBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({
      auth: { token: 'mockToken', user: users[0] }
    });
  });

  it('should render the home link', () => {
    const store = mockStore({ auth: { user: null, token: null } });

    renderComponent(store);

    expect(screen.getByText(t('home'))).toBeInTheDocument();
    expect(screen.queryByText(t('author'))).not.toBeInTheDocument();
  });

  it('should render login link when user is not authenticated', () => {
    const store = mockStore({ auth: { user: null, token: null } });

    renderComponent(store);

    expect(screen.getByText(t('login'))).toBeInTheDocument();
  });

  it('should render navigation items when user is authenticated', () => {
    renderComponent(store);

    ['home', 'authors', 'books', 'characters', 'scenes'].forEach((item) => {
      expect(screen.getByText(t(item))).toBeInTheDocument();
    });
  });

  it('should render the settings menu when user is authenticated', () => {
    renderComponent(store);

    fireEvent.click(screen.getByLabelText('Open settings'));

    ['profile', 'settings', 'logout'].forEach((item) => {
      expect(screen.getByText(t(item))).toBeInTheDocument();
    });
  });

  it('should logout when logout button is clicked', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    renderComponent(store);
    fireEvent.click(screen.getByLabelText('Open settings'));

    fireEvent.click(screen.getByText(t('logout')));

    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'auth/logout' });
  });
});

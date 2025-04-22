import '@testing-library/jest-dom';
import { screen, fireEvent, act } from '@testing-library/react';

import { Settings } from '../../../src/actorsScript/pages/Settings';
import { mockStore } from '../../__mocks__/mockStore';
import { renderWithProviders } from '../../test-utils/renderWithProviders';
import i18n from '../../../src/i18n';

const t = (key: string, ns: string = 'settings') => i18n.t(key, { ns });
const renderSettingsPage = () =>
  renderWithProviders({ store, ui: <Settings /> });

let store: ReturnType<typeof mockStore>;

describe('Settings Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    store = mockStore();
  });

  it('should render the settings page with language options', () => {
    renderSettingsPage();

    expect(screen.getByText(t('header'))).toBeInTheDocument();
    expect(screen.getByText(t('selectLanguage'))).toBeInTheDocument();

    const languageOptions = [
      'Galego',
      'Castellano',
      'English',
      'Català',
      'Euskara',
      'Français',
      'Português',
      'Italiano',
      'Română'
    ];

    languageOptions.forEach((language) => {
      expect(screen.getByLabelText(language)).toBeInTheDocument();
    });
  });

  it('should change the language when a new option is selected', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    renderSettingsPage();

    const galicianRadio = screen.getByLabelText('Galego');
    const frenchRadio = screen.getByLabelText('Français');

    expect(galicianRadio).toBeChecked();
    expect(frenchRadio).not.toBeChecked();

    await act(async () => {
      fireEvent.click(frenchRadio);
    });

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'language/setLanguage',
      payload: 'fr'
    });
    expect(frenchRadio).toBeChecked();
  });

  it('should display a work-in-progress message', () => {
    renderSettingsPage();
    expect(screen.getByText(t('wip'))).toBeInTheDocument();
  });
});

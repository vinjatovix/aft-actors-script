import '@testing-library/jest-dom';
import { screen, fireEvent, act } from '@testing-library/react';
import { i18n as I18nType } from 'i18next';

import { Settings } from '../../../src/actorsScript/pages/Settings';
import { mockStore } from '../../__mocks__/mockStore';
import { initializeI18n } from '../../test-utils/i18nTest';
import { renderWithProviders } from '../../test-utils/renderWithProviders';

let store: ReturnType<typeof mockStore>;
let i18nTest: I18nType;
let t: (key: string, ns?: string) => string;

describe('Settings Page', () => {
  beforeAll(async () => {
    i18nTest = await initializeI18n();
    t = (key: string, ns: string = 'settings') => i18nTest.t(key, { ns });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    store = mockStore();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const renderSettingsPage = () =>
    renderWithProviders({ store, ui: <Settings />, i18nInstance: i18nTest });

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

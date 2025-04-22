import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../src/i18n';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Store } from '@reduxjs/toolkit';
import { mockStore } from '../__mocks__/mockStore';

type RenderWithProvidersArgs = {
  store?: Store;
  ui: React.ReactElement;
  i18nInstance?: typeof i18n;
};

export const renderWithProviders = ({
  store,
  ui,
  i18nInstance = i18n
}: RenderWithProvidersArgs) => {
  return render(
    <Provider store={store ?? mockStore()}>
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <I18nextProvider i18n={i18nInstance}>{ui}</I18nextProvider>
      </MemoryRouter>
    </Provider>
  );
};

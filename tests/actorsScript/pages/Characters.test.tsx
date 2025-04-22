import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Characters } from '../../../src/actorsScript/pages/Characters';
import { store } from '../../../src/redux/store';
import { Provider } from 'react-redux';
import i18n from '../../../src/i18n';

const t = (key: string, ns: string = 'common') => i18n.t(key, { ns });

describe('Characters Page', () => {
  it('renders the Characters page with a title and author names', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          render(
          <Characters />
          );
        </Provider>
      );
    });

    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent(
      t('characters')
    );
  });
});

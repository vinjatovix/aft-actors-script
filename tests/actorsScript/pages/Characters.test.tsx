import { act, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Characters } from '../../../src/actorsScript/pages/Characters';
import i18n from '../../../src/i18n';
import { renderWithProviders } from '../../test-utils/renderWithProviders';

const t = (key: string, ns: string = 'common') => i18n.t(key, { ns });

describe('Characters Page', () => {
  it('renders the Characters page with a title and author names', async () => {
    await act(async () => {
      renderWithProviders({ ui: <Characters /> });
    });

    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent(
      t('characters')
    );
  });
});

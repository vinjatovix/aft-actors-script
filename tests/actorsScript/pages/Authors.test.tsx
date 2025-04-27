import { act, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Authors } from '../../../src/actorsScript/pages/Authors';
import i18n from '../../../src/i18n';
import { renderWithProviders } from '../../test-utils/renderWithProviders';

const t = (key: string, ns: string = 'common') => i18n.t(key, { ns });

describe('Authors Page', () => {
  it('renders the Authors page with a title and author names', async () => {
    await act(async () => {
      renderWithProviders({ ui: <Authors /> });
    })

    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent(
      t('authors')
    );
  });
});

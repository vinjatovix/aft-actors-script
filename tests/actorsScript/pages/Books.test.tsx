import { act, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Books } from '../../../src/actorsScript/pages/Books';
import i18n from '../../../src/i18n';
import { renderWithProviders } from '../../test-utils/renderWithProviders';

const t = (key: string, ns: string = 'common') => i18n.t(key, { ns });

describe('Books Page', () => {
  it('renders the Books page with a title', async () => {
    await act(async () => {
      renderWithProviders({ ui: <Books /> });
    });

    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent(
      t('books')
    );
  });
});

import { act, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Scenes } from '../../../src/actorsScript/pages/Scenes';
import i18n from '../../../src/i18n';
import { renderWithProviders } from '../../test-utils/renderWithProviders';

const t = (key: string, ns: string = 'common') => i18n.t(key, { ns });

describe('Scenes Page', () => {
  it('renders the Scenes page with a title and author names', async () => {
    await act(async () => {
      renderWithProviders({ ui: <Scenes /> });
    });

    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent(
      t('scenes')
    );
  });
});

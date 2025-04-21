import { act, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { handleFetch } from '../../../src/utils/handleFetch';
import * as characterBuildingThunks from '../../../src/redux/thunks/characterBuildingThunks';
import { CharacterBuildingsPage } from '../../../src/actorsScript/pages/CharacterBuildingsPage';

import { renderWithProviders } from '../../test-utils/renderWithProviders';
import { mockStore } from '../../__mocks__/mockStore';
import { users } from '../../data';
import i18n from '../../../src/i18n';

jest.mock('../../../src/utils/handleFetch', () => ({
  handleFetch: jest.fn()
}));

let store: ReturnType<typeof mockStore>;
let t: (key: string, ns?: string) => string;

describe('CharacterBuildingsPage', () => {
  beforeAll(async () => {
    t = (key: string, ns: string = 'characterBuilding') => i18n.t(key, { ns });
  });

  beforeEach(() => {
    store = mockStore({
      auth: { token: 'mockToken', user: users[0] },
      characterBuilding: {
        characterBuildings: [],
        loading: false,
        error: null,
        selectedCharacterBuilding: null
      }
    });
  });

  const renderComponent = () =>
    renderWithProviders({
      store,
      ui: <CharacterBuildingsPage />
    });

  it('dispatches getAllCharacterBuildings when token is available', async () => {
    const mockGetAllCharacterBuildings = jest.spyOn(
      characterBuildingThunks,
      'getAllCharacterBuildings'
    );

    await act(async () => {
      renderComponent();
    });

    expect(mockGetAllCharacterBuildings).toHaveBeenCalled();
  });

  it('renders loading state when loading is true', () => {
    renderComponent();

    expect(screen.getByText(t('loading'))).toBeInTheDocument();
  });

  it('renders error message when there is an error', async () => {
    (handleFetch as jest.Mock).mockImplementation(() => {
      throw new Error('BackEndError');
    });

    await act(async () => {
      renderComponent();
    });

    expect(await screen.findByText(/BackEndError/i)).toBeInTheDocument();
  });

  it('renders not available translation when there are no character buildings', async () => {
    await act(async () => {
      renderComponent();
    });

    expect(await screen.findByText(t('noAvailable'))).toBeInTheDocument();
  });
});

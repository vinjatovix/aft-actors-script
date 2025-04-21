import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { renderWithProviders } from '../../../test-utils/renderWithProviders';
import { mockStore } from '../../../__mocks__/mockStore';

import { CharacterBuildingHeader } from '../../../../src/actorsScript/components/characterBuildings/CharacterBuildingHeader';
import i18n from '../../../../src/i18n';

const CHARACTER_NAME = 'Name';
const SCENE_DESCRIPTION = 'Description';

let store: ReturnType<typeof mockStore>;
let t: (key: string, ns?: string) => string;

describe('CharacterBuildingHeader', () => {
  beforeAll(async () => {
    t = (key: string, ns: string = 'characterBuilding') => i18n.t(key, { ns });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore();
  });

  const renderComponent = (updatedAt?: string) =>
    renderWithProviders({
      store,
      ui: (
        <CharacterBuildingHeader
          name={CHARACTER_NAME}
          description={SCENE_DESCRIPTION}
          updatedAt={updatedAt ?? null}
        />
      )
    });

  it('renders the name and description correctly', () => {
    renderComponent();

    expect(
      screen.getByText(`${CHARACTER_NAME} ${t('at')} ${SCENE_DESCRIPTION}`)
    ).toBeInTheDocument();
  });

  it('renders the updatedAt text when provided', () => {
    const mockUpdatedAt = new Date().toISOString();
    const regex = new RegExp(t('updated'), 'i');

    renderComponent(mockUpdatedAt);

    expect(screen.getByText(regex)).toBeInTheDocument();
  });
});

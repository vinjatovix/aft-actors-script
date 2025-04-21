import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { i18n as I18nType } from 'i18next';

import { initializeI18n } from '../../../test-utils/i18nTest';
import { renderWithProviders } from '../../../test-utils/renderWithProviders';
import { mockStore } from '../../../__mocks__/mockStore';

import { CharacterBuildingHeader } from '../../../../src/actorsScript/components/characterBuildings/CharacterBuildingHeader';

const CHARACTER_NAME = 'Name';
const SCENE_DESCRIPTION = 'Description';

let store: ReturnType<typeof mockStore>;
let i18nTest: I18nType;
let t: (key: string, ns?: string) => string;

describe('CharacterBuildingHeader', () => {
  beforeAll(async () => {
    i18nTest = await initializeI18n();
    t = (key: string, ns: string = 'characterBuilding') =>
      i18nTest.t(key, { ns });
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
      ),
      i18nInstance: i18nTest
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

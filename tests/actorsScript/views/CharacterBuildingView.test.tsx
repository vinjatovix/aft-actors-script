import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CharacterBuildingView } from '../../../src/actorsScript/views/CharacterBuildingView';
import { useDispatch } from 'react-redux';
import {
  deleteCharacterBuilding,
  getAllCharacterBuildings,
  updateCharacterBuilding
} from '../../../src/redux/thunks/characterBuildingThunks';
import { clearSelectedCharacterBuilding } from '../../../src/redux/slices/characterBuildingSlice';
import { characterBuildings, users } from '../../data';
import { i18n as I18nType } from 'i18next';
import { mockStore } from '../../__mocks__/mockStore';
import { initializeI18n } from '../../test-utils/i18nTest';
import { renderWithProviders } from '../../test-utils/renderWithProviders';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));

jest.mock('../../../src/redux/thunks/characterBuildingThunks', () => {
  return {
    deleteCharacterBuilding: jest.fn(() => ({
      type: 'characterBuilding/deleteCharacterBuilding/fulfilled'
    })),
    getAllCharacterBuildings: jest.fn(() => ({
      type: 'characterBuilding/getAllCharacterBuildings/fulfilled',
      payload: [] // importante!
    })),
    updateCharacterBuilding: jest.fn(() => ({
      type: 'characterBuilding/updateCharacterBuilding/fulfilled'
    }))
  };
});

const AUTH = users[0];
const CHARACTER_BUILDING_MOCK = {
  ...characterBuildings[0],
  character: {
    ...characterBuildings[0].character,
    name: characterBuildings[0]?.character?.name || 'Default Character Name'
  },
  scene: {
    ...characterBuildings[0].scene,
    description:
      characterBuildings[0]?.scene?.description || 'Default Scene Description'
  }
};

let mockDispatch = jest.fn();
let store: ReturnType<typeof mockStore>;
let i18nTest: I18nType;
let t: (key: string, ns?: string) => string;

describe('CharacterBuildingView', () => {
  beforeAll(async () => {
    i18nTest = await initializeI18n();
    t = (key: string, ns: string = 'characterBuilding') =>
      i18nTest.t(key, { ns });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore();
    mockDispatch = jest.fn();

    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    mockDispatch.mockImplementation((action) => {
      if (typeof action === 'function') {
        return action(mockDispatch, () => ({
          auth: AUTH,
          characterBuilding: {
            selectedCharacterBuilding: CHARACTER_BUILDING_MOCK
          }
        }));
      }
      return action;
    });
  });

  const renderComponent = () =>
    renderWithProviders({
      store,
      ui: <CharacterBuildingView characterBuilding={CHARACTER_BUILDING_MOCK} />,
      i18nInstance: i18nTest
    });

  it('renders the CharacterBuildingHeader with correct props', () => {
    renderComponent();

    const characterName = screen.getByText(
      new RegExp(CHARACTER_BUILDING_MOCK.character.name)
    );
    const sceneDescription = screen.getByText(
      new RegExp(CHARACTER_BUILDING_MOCK.scene.description)
    );

    expect(characterName).toBeInTheDocument();
    expect(sceneDescription).toBeInTheDocument();
  });

  it('calls handleSubmit when SaveButton is clicked', async () => {
    renderComponent();
    fireEvent.click(screen.getByText(t('save')));

    expect(updateCharacterBuilding).toHaveBeenCalledWith({
      id: CHARACTER_BUILDING_MOCK.id,
      center: CHARACTER_BUILDING_MOCK.center,
      sceneCircumstances: CHARACTER_BUILDING_MOCK.sceneCircumstances,
      previousCircumstances: CHARACTER_BUILDING_MOCK.previousCircumstances,
      startingPoint: CHARACTER_BUILDING_MOCK.startingPoint,
      relationshipCircumstances: [
        {
          character:
            CHARACTER_BUILDING_MOCK.relationshipCircumstances[0].character.id,
          circumstance:
            CHARACTER_BUILDING_MOCK.relationshipCircumstances[0].circumstance
        }
      ],
      actionUnits: [
        {
          action: CHARACTER_BUILDING_MOCK.actionUnits[0].action,
          strategies: CHARACTER_BUILDING_MOCK.actionUnits[0].strategies
        },
        {
          action: CHARACTER_BUILDING_MOCK.actionUnits[1].action,
          strategies: CHARACTER_BUILDING_MOCK.actionUnits[1].strategies
        }
      ]
    });
  });

  it('calls handleDelete when Delete button is clicked', async () => {
    renderComponent();
    fireEvent.click(screen.getByText(t('delete')));

    expect(deleteCharacterBuilding).toHaveBeenCalledWith(
      CHARACTER_BUILDING_MOCK.id
    );
    expect(mockDispatch).toHaveBeenNthCalledWith(
      2,
      clearSelectedCharacterBuilding()
    );
    expect(getAllCharacterBuildings).toHaveBeenCalled();
  });

  it('updates formData when input fields change', () => {
    const updatedValue = 'Updated Value';
    renderComponent();
    const input = screen.getByLabelText(
      t('sceneCircumstances.label')
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: updatedValue } });

    expect(input.value).toBe(updatedValue);
  });
});

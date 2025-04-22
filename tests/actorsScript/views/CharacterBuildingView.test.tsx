import { fireEvent, render, screen } from '@testing-library/react';
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
import i18n from '../../../src/i18n';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));

jest.mock('../../../src/redux/thunks/characterBuildingThunks', () => ({
  ...jest.requireActual('../../../src/redux/thunks/characterBuildingThunks'),
  deleteCharacterBuilding: jest.fn().mockResolvedValue(undefined),
  getAllCharacterBuildings: jest.fn().mockResolvedValue([]),
  updateCharacterBuilding: jest.fn().mockResolvedValue(undefined)
}));

const AUTH = users[0];
const CHARACTER_BUILDING_MOCK = characterBuildings[0];
const t = (key: string, ns: string = 'characterBuilding') =>
  i18n.t(key, { ns });

let mockDispatch = jest.fn();

describe('CharacterBuildingView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

  it('renders the CharacterBuildingHeader with correct props', async () => {
    render(
      <CharacterBuildingView characterBuilding={CHARACTER_BUILDING_MOCK} />
    );

    const characterName = await screen.findByText(
      new RegExp(CHARACTER_BUILDING_MOCK.character.name)
    );
    const sceneDescription = await screen.findByText(
      new RegExp(CHARACTER_BUILDING_MOCK.scene.description)
    );

    expect(characterName).toBeInTheDocument();
    expect(sceneDescription).toBeInTheDocument();
  });

  it('calls handleSubmit when SaveButton is clicked', async () => {
    render(
      <CharacterBuildingView characterBuilding={CHARACTER_BUILDING_MOCK} />
    );
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
    render(
      <CharacterBuildingView characterBuilding={CHARACTER_BUILDING_MOCK} />
    );
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
    render(
      <CharacterBuildingView characterBuilding={CHARACTER_BUILDING_MOCK} />
    );
    const input = screen.getByLabelText(
      t('sceneCircumstances.label')
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: updatedValue } });

    expect(input.value).toBe(updatedValue);
  });
});

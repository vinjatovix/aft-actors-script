import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import { i18n as I18nType } from 'i18next';

import { Relation } from '../../../../../src/actorsScript/components/characterBuildings/relationshipCircumstances/Relation';

import { mockStore } from '../../../../__mocks__/mockStore';
import { initializeI18n } from '../../../../test-utils/i18nTest';
import { renderWithProviders } from '../../../../test-utils/renderWithProviders';

const MOCK_CHARACTERS = [
  { id: '1', name: 'Character 1' },
  { id: '2', name: 'Character 2' }
];

const MOCK_RELATIONS = [
  { character: { id: '1', name: 'Character 1' }, circumstance: 'Friend' }
];

const mockHandleRelationChange = jest.fn();
const mockSetRelations = jest.fn();
const mockHandleRemoveRelation = jest.fn();

let store: ReturnType<typeof mockStore>;
let i18nTest: I18nType;
let t: (key: string, ns?: string) => string;

describe('Relation Component', () => {
  beforeAll(async () => {
    i18nTest = await initializeI18n();
    t = (key: string, ns: string = 'characterBuilding') =>
      i18nTest.t(key, { ns });
  });
  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore();
  });

  const renderComponent = (relation?: (typeof MOCK_RELATIONS)[0]) =>
    renderWithProviders({
      store,
      ui: (
        <Relation
          relation={relation ?? MOCK_RELATIONS[0]}
          index={0}
          handleRelationChange={mockHandleRelationChange}
          relations={relation ? [relation] : MOCK_RELATIONS}
          setRelations={mockSetRelations}
          handleRemoveRelation={mockHandleRemoveRelation}
          characters={MOCK_CHARACTERS}
        />
      ),
      i18nInstance: i18nTest
    });

  it('renders the component with existing relation', () => {
    renderComponent();

    expect(
      screen.getByText(MOCK_RELATIONS[0].character.name)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(MOCK_RELATIONS[0].circumstance)
    ).toBeInTheDocument();
  });

  it('calls handleRemoveRelation when delete button is clicked', () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button'));

    expect(mockHandleRemoveRelation).toHaveBeenCalledWith(0);
  });

  it('updates relation when a new character is selected', () => {
    renderComponent({ character: { id: '', name: '' }, circumstance: '' });

    fireEvent.mouseDown(screen.getByLabelText(t('character')));
    fireEvent.click(screen.getByText(MOCK_CHARACTERS[1].name));

    expect(mockSetRelations).toHaveBeenCalledWith([
      {
        character: MOCK_CHARACTERS[1],
        circumstance: ''
      }
    ]);
  });

  it('calls handleRelationChange when circumstance is updated', () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(t('circumstance')), {
      target: { value: 'Sibling' }
    });

    expect(mockHandleRelationChange).toHaveBeenCalledWith(
      0,
      'circumstance',
      'Sibling'
    );
  });
});

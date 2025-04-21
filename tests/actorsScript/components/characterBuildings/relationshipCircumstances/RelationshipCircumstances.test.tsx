import '@testing-library/jest-dom';
import { screen, fireEvent } from '@testing-library/react';
import { i18n as I18nType } from 'i18next';

import { renderWithProviders } from '../../../../test-utils/renderWithProviders';
import { initializeI18n } from '../../../../test-utils/i18nTest';
import { mockStore } from '../../../../__mocks__/mockStore';

import { RelationshipCircumstances } from '../../../../../src/actorsScript/components/characterBuildings/relationshipCircumstances/RelationshipCircumstances';

const mockSetRelations = jest.fn();
const mockHandleRelationChange = jest.fn();
const mockSetFormData = jest.fn();

const MOCK_CHARACTERS = [
  { id: '1', name: 'Character 1' },
  { id: '2', name: 'Character 2' }
];

const MOCK_RELATIONS = [
  { character: { id: '1', name: 'Character 1' }, circumstance: 'Friend' }
];

const renderComponent = () =>
  renderWithProviders({
    store,
    ui: (
      <RelationshipCircumstances
        setRelations={mockSetRelations}
        relations={MOCK_RELATIONS}
        characters={MOCK_CHARACTERS}
        setFormData={mockSetFormData}
        handleRelationChange={mockHandleRelationChange}
      />
    ),
    i18nInstance: i18nTest
  });

let store: ReturnType<typeof mockStore>;
let i18nTest: I18nType;
let t: (key: string, ns?: string) => string;

describe('RelationshipCircumstances Component', () => {
  beforeAll(async () => {
    i18nTest = await initializeI18n();
    t = (key: string, ns: string = 'characterBuilding') =>
      i18nTest.t(key, { ns });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore();
  });

  it('renders the RelationshipCircumstancesHeader component', () => {
    renderComponent();

    expect(
      screen.getByText(t('relationshipCircumstances'))
    ).toBeInTheDocument();
  });

  it('renders the Relation components for each relation', () => {
    renderComponent();

    expect(
      screen.getByText(MOCK_RELATIONS[0].character.name)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(MOCK_RELATIONS[0].circumstance)
    ).toBeInTheDocument();
  });

  it('calls setRelations when handleAddRelation is triggered', () => {
    renderComponent();

    const addButton = screen.getByTestId('add-relation');
    fireEvent.click(addButton);

    expect(mockSetRelations).toHaveBeenCalledWith([
      ...MOCK_RELATIONS,
      { character: { id: '', name: '' }, circumstance: '' }
    ]);
  });

  it('calls setRelations when handleRemoveRelation is triggered', () => {
    renderComponent();

    const removeButton = screen.getByTestId('remove-relation-0');
    fireEvent.click(removeButton);

    expect(mockSetRelations).toHaveBeenCalledWith([]);
  });
});

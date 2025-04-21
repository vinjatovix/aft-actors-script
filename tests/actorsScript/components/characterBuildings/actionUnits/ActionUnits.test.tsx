import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ActionUnits } from '../../../../../src/actorsScript/components/characterBuildings/actionUnits/ActionUnits';
import { i18n as I18nType } from 'i18next';
import { mockStore } from '../../../../__mocks__/mockStore';
import { initializeI18n } from '../../../../test-utils/i18nTest';
import { renderWithProviders } from '../../../../test-utils/renderWithProviders';

const mockSetFormData = jest.fn();
const mockFormData = {
  center: '',
  sceneCircumstances: '',
  previousCircumstances: '',
  startingPoint: '',
  relationshipCircumstances: [],
  actionUnits: [
    { action: 'Test Action', strategies: ['Strategy 1', 'Strategy 2'] }
  ]
};

let store: ReturnType<typeof mockStore>;
let i18nTest: I18nType;

describe('ActionUnits Component', () => {
  beforeAll(async () => {
    i18nTest = await initializeI18n();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore();
  });

  const renderComponent = (formData?: typeof mockFormData) =>
    renderWithProviders({
      store,
      ui: (
        <ActionUnits
          formData={formData ?? mockFormData}
          setFormData={mockSetFormData}
        />
      ),
      i18nInstance: i18nTest
    });

  it('renders the component with initial action units', () => {
    renderComponent();

    expect(screen.getByDisplayValue('Test Action')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Strategy 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Strategy 2')).toBeInTheDocument();
  });

  it('adds a new action unit', () => {
    renderComponent();

    const addButton = screen.getByRole('button', { name: /add-action-unit/i });
    fireEvent.click(addButton);

    expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function));

    const updaterFunction = mockSetFormData.mock.calls[0][0];
    const updatedFormData = updaterFunction(mockFormData);

    expect(updatedFormData).toEqual(
      expect.objectContaining({
        actionUnits: expect.arrayContaining([
          expect.objectContaining({ action: '', strategies: [] })
        ])
      })
    );
  });

  it('removes an action unit', () => {
    renderComponent();

    const deleteButton = screen.getByTestId('delete-action-unit');
    fireEvent.click(deleteButton);

    expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function));
    const updaterFunction = mockSetFormData.mock.calls[0][0];
    const updatedFormData = updaterFunction(mockFormData);
    expect(updatedFormData).toEqual(
      expect.objectContaining({
        actionUnits: expect.not.arrayContaining([
          expect.objectContaining({ action: 'Test Action' })
        ])
      })
    );
  });

  it("updates an action unit's action", () => {
    renderComponent();

    const actionInput = screen.getByDisplayValue('Test Action');
    fireEvent.change(actionInput, { target: { value: 'Updated Action' } });

    expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function));
    const updaterFunction = mockSetFormData.mock.calls[0][0];
    const updatedFormData = updaterFunction(mockFormData);
    expect(updatedFormData).toEqual(
      expect.objectContaining({
        actionUnits: expect.arrayContaining([
          expect.objectContaining({ action: 'Updated Action' })
        ])
      })
    );
  });

  it('adds a new strategy to an action unit', () => {
    renderComponent();

    const addStrategyButton = screen.getByRole('button', {
      name: /add-strategy/i
    });
    fireEvent.click(addStrategyButton);

    expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function));
    const updaterFunction = mockSetFormData.mock.calls[0][0];
    const updatedFormData = updaterFunction(mockFormData);
    expect(updatedFormData).toEqual(
      expect.objectContaining({
        actionUnits: expect.arrayContaining([
          expect.objectContaining({
            strategies: expect.arrayContaining([''])
          })
        ])
      })
    );
  });

  it('removes a strategy from an action unit', () => {
    const mockFormDataWithStrategies = {
      ...mockFormData,
      actionUnits: [
        {
          action: 'Test Action',
          strategies: ['Strategy 1']
        }
      ]
    };
    renderComponent(mockFormDataWithStrategies);

    const deleteButton = screen.getByTestId('delete-strategy');
    fireEvent.click(deleteButton);

    expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function));
    const updaterFunction = mockSetFormData.mock.calls[0][0];
    const updatedFormData = updaterFunction(mockFormDataWithStrategies);
    expect(updatedFormData).toEqual(
      expect.objectContaining({
        actionUnits: expect.arrayContaining([
          expect.objectContaining({
            strategies: expect.not.arrayContaining(['Strategy 1'])
          })
        ])
      })
    );
  });

  it("updates a strategy's text", () => {
    renderComponent();
    const strategyInput = screen.getByDisplayValue('Strategy 1');
    fireEvent.change(strategyInput, { target: { value: 'Updated Strategy' } });

    expect(mockSetFormData).toHaveBeenCalledWith(expect.any(Function));
    const updaterFunction = mockSetFormData.mock.calls[0][0];
    const updatedFormData = updaterFunction(mockFormData);
    expect(updatedFormData).toEqual(
      expect.objectContaining({
        actionUnits: expect.arrayContaining([
          expect.objectContaining({
            strategies: expect.arrayContaining(['Updated Strategy'])
          })
        ])
      })
    );
  });
});

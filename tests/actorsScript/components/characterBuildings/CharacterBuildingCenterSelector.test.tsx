import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CharacterBuildingCenterSelector } from '../../../../src/actorsScript/components/characterBuildings/CharacterBuildingCenterSelector';

import { mockStore } from '../../../__mocks__/mockStore';
import { renderWithProviders } from '../../../test-utils/renderWithProviders';
import i18n from '../../../../src/i18n';

let store: ReturnType<typeof mockStore>;
let t: (key: string, ns?: string) => string;

describe('CharacterBuildingCenterSelector', () => {
  beforeAll(async () => {
    t = (key: string, ns: string = 'characterBuilding') => i18n.t(key, { ns });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore();
  });

  const mockSetFormData = jest.fn();

  const renderComponent = (formData: { center: string }) => {
    renderWithProviders({
      store,
      ui: (
        <CharacterBuildingCenterSelector
          formData={formData}
          setFormData={mockSetFormData}
        />
      )
    });
  };

  it('renders the select input with correct label', () => {
    renderComponent({ center: '' });
    expect(screen.getByLabelText(t('center.label'))).toBeInTheDocument();
  });

  it('renders all menu items', () => {
    renderComponent({ center: '' });
    fireEvent.mouseDown(screen.getByLabelText(t('center.label')));
    expect(
      screen.getByRole('option', { name: t('center.instinctive') })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: t('center.mental') })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: t('center.emotional') })
    ).toBeInTheDocument();
  });

  it('calls setFormData with the correct value when an option is selected', () => {
    renderComponent({ center: '' });
    fireEvent.mouseDown(screen.getByLabelText(t('center.label')));
    fireEvent.click(screen.getByRole('option', { name: t('center.mental') }));
    expect(mockSetFormData).toHaveBeenCalledWith({ center: 'mental' });
  });

  it('sets the correct value in the select input', () => {
    renderComponent({ center: 'emotional' });
    expect(screen.getByText(t('center.emotional'))).toBeInTheDocument();
  });
});

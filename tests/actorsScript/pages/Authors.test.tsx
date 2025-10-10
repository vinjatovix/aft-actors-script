import { act, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Authors } from '../../../src/actorsScript/pages/Authors';
import i18n from '../../../src/i18n';
import { renderWithProviders } from '../../test-utils/renderWithProviders';
import { authors } from '../../data';
import { mockStore } from '../../__mocks__/mockStore';

const t = (key: string, ns: string = 'common') => i18n.t(key, { ns });

describe('Authors Page', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore();
  });

  it('renders the Authors page with his title', async () => {
    await act(async () => {
      renderWithProviders({ ui: <Authors /> });
    });

    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent(
      t('authors')
    );
  });

  it('renders the author cards', async () => {
    store = mockStore({
      author: {
        authors: authors,
        loading: false,
        error: null
      }
    });
    await act(async () => {
      renderWithProviders({ store, ui: <Authors /> });
    });

    authors.forEach((author) => {
      expect(screen.getByText(author.name)).toBeInTheDocument();
    });
  });

  it('renders the search input', async () => {
    await act(async () => {
      renderWithProviders({ ui: <Authors /> });
    });

    expect(
      screen.getByPlaceholderText(`${t('search')} ${t('author')}`)
    ).toBeInTheDocument();
  });

  it('should filter the authors based on the search term', async () => {
    store = mockStore({
      author: {
        authors: authors,
        loading: false,
        error: null
      }
    });

    await act(async () => {
      renderWithProviders({ store, ui: <Authors /> });
    });

    const searchInput = screen.getByPlaceholderText(
      `${t('search')} ${t('author')}`
    ) as HTMLInputElement;
    const authorName = authors[0].name;

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: authorName } });
    });

    expect(screen.getByText(authorName)).toBeInTheDocument();
    authors.forEach((author) => {
      if (author.name !== authorName) {
        expect(screen.queryByText(author.name)).not.toBeInTheDocument();
      }
    });
  });

  it('renders the reset filter button', async () => {
    await act(async () => {
      renderWithProviders({ ui: <Authors /> });
    });

    expect(
      screen.getByRole('button', { name: t('seeAll') })
    ).toBeInTheDocument();
  });

  it('should reset the search term when the reset button is clicked', async () => {
    store = mockStore({
      author: {
        authors: authors,
        loading: false,
        error: null
      }
    });
    await act(async () => {
      renderWithProviders({ store, ui: <Authors /> });
    });
    const searchInput = screen.getByPlaceholderText(
      `${t('search')} ${t('author')}`
    ) as HTMLInputElement;
    const authorName = authors[0].name;
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: authorName } });
    });
    expect(screen.getByText(authorName)).toBeInTheDocument();
    const resetButton = screen.getByRole('button', { name: t('seeAll') });
    await act(async () => {
      fireEvent.click(resetButton);
    });
    expect(searchInput.value).toBe('');
    authors.forEach((author) => {
      expect(screen.getByText(author.name)).toBeInTheDocument();
    });
  });

  it('should open the modal when the button is clicked', async () => {
    await act(async () => {
      renderWithProviders({ ui: <Authors /> });
    });

    const addButton = screen.getByRole('button', { name: /add/i });
    await act(async () => {
      fireEvent.click(addButton);
    });

    expect(
      screen.getByText(`${t('create')} ${t('author')}`)
    ).toBeInTheDocument();
  });

  it('should close the modal when the close button is clicked', async () => {
    await act(async () => {
      renderWithProviders({ ui: <Authors /> });
    });

    const addButton = screen.getByRole('button', { name: /add/i });
    await act(async () => {
      fireEvent.click(addButton);
    });

    const closeButton = screen.getByRole('button', { name: t('close') });
    await act(async () => {
      fireEvent.click(closeButton);
    });

    expect(
      screen.queryByText(`${t('create')} ${t('author')}`)
    ).not.toBeInTheDocument();
  });
});

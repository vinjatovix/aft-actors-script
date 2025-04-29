import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CreateAuthorModal } from '../../../../src/actorsScript/components/authors/CreateAuthorModal';

import { useDispatch, useSelector } from 'react-redux';
import i18n from '../../../../src/i18n';
import { createAuthor } from '../../../../src/redux/thunks/authorThunks';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}));

jest.mock('../../../../src/redux/thunks/authorThunks', () => ({
    createAuthor: jest.fn(() => () => Promise.resolve()),
}));

const t = (key: string, ns: string = 'common') => i18n.t(key, { ns });

let mockDispatch = jest.fn();

describe('CreateAuthorModal', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockDispatch = jest.fn();
        (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
        (useSelector as unknown as jest.Mock).mockReturnValue({
            authors: [],
            loading: false,
            error: null
        });
    });

    it('renders the modal when open is true', () => {
        const handleModalClose = jest.fn();
        const { getByText } = render(
            <CreateAuthorModal open handleModalClose={handleModalClose} />
        );
        const closeButton = getByText(t('close'));

        expect(closeButton).toBeInTheDocument();
    });

    it('calls handleModalClose when close button is clicked', () => {
        const handleModalClose = jest.fn();
        render(
            <CreateAuthorModal open handleModalClose={handleModalClose} />
        );
        const closeButton = screen.getByText(t('close'));
        fireEvent.click(closeButton);
        expect(handleModalClose).toHaveBeenCalled();
    });

    it('calls handleInputChange when input value changes', () => {
        const handleModalClose = jest.fn();
        render(
            <CreateAuthorModal open handleModalClose={handleModalClose} />
        );
        const input = screen.getByLabelText(t('author'));

        fireEvent.change(input, { target: { value: 'John Doe' } });

        expect(input).toHaveValue('John Doe');
    });

    it('calls handleSubmit when form is submitted', () => {
        const handleModalClose = jest.fn();
        render(
            <CreateAuthorModal open handleModalClose={handleModalClose} />
        );
        const input = screen.getByLabelText(t('author'));
        fireEvent.change(input, { target: { value: 'John Doe' } });
        const submitButton = screen.getByRole('button', { name: "submit" });

        fireEvent.click(submitButton);
        expect(mockDispatch).toHaveBeenCalled();
        expect(createAuthor).toHaveBeenCalledWith(
            expect.objectContaining({
                name: 'John Doe'
            })
        );

    });
})
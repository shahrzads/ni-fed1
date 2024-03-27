import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from './Form';

describe('Form validation tests', () => {
    beforeEach(() => {
        render(<Form />);
    });


    test('Displays error message when first name is missing', () => {
    //   render(<Form />);
      
      // Attempt to submit the form without filling out the first name
      fireEvent.submit(screen.getByTestId('submit-button'));
      
      // Check for error message
      expect(screen.getByText('First name is required.')).toBeInTheDocument();
    });

    test('Displays error message when last name is missing', () => {
        fireEvent.submit(screen.getByTestId('submit-button'));
        expect(screen.getByText('Last name is required.')).toBeInTheDocument();
    });

    test('Displays error message when email is invalid', async () => {
        fireEvent.change(screen.getByTestId('email'), {
            target: { value: 'invalidemail' },
        });
        // fireEvent.click(screen.getByRole('button', { name: /submit/i }));
        fireEvent.submit(screen.getByTestId('submit-button'));
        expect(await screen.findByText('Email is invalid.')).toBeInTheDocument();
        // const input = await screen.findByTestId("email");
        // // Check if the TextField is in error state
        // expect(input).toHaveAttribute('aria-invalid', 'true');

        // // Check if the helper text of the TextField contains the error message
        // expect(emailTextField).toHaveAttribute('aria-describedby', expect.stringContaining('-helper-text'));
        // const helperTextId = emailTextField.getAttribute('aria-describedby');
        // const helperTextElement = screen.getByTestId(helperTextId);
        // expect(input.value).toBe('invalidemail')
        // expect(input).toHaveValue('Email is invalid.');
    });

    test('Displays error message when phone number is invalid', async () => {
        fireEvent.input(screen.getByLabelText('Phone Number'), {
            target: { value: '12345' },
        });
        fireEvent.submit(screen.getByTestId('submit-button'));
        expect(await screen.getByText('Phone number is invalid.')).toBeInTheDocument();
    });
  });

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
  render(<ContactForm />);
});

test('renders the contact form header', () => {
  // arrange:
  render(<ContactForm />);
  // act:
  const header = screen.queryByText(/contact form/i);
  // assert:
  expect(header).toBeInTheDocument();
  expect(header).toBeTruthy();
  expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  // arrange:
  render(<ContactForm />);

  // act:
  const firstNameInput = screen.getByLabelText(/First Name*/i);
  userEvent.type(firstNameInput, 'livi');

  const errorMessage = await screen.findAllByTestId('error');
  // assert:
  expect(errorMessage).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  // arrange:
  render(<ContactForm />);
  // act:
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  // assert:

  waitFor(() => {
    const errorMessage = screen.queryAllByTestId('error');
    expect(errorMessage).toHaveLength(3);
  });
  

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  // arrange:
    render(<ContactForm />);
  // act:
  const firstNameInput = screen.getByText(/first name*/i);
  userEvent.type(firstNameInput, 'Isaac');
  
  const lastNameInput = screen.getByText(/last name*/i);
  userEvent.type(lastNameInput, 'Malin');

  const button = screen.getByRole('button');
  userEvent.click(button);
  // assert:
  const errorMessage = screen.queryAllByTestId('error');
  waitFor(() => {
    expect(errorMessage).toHaveLength(1); 
  });
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  // arrange:
  render(<ContactForm />);

  // act:
  const emailInput = screen.getByLabelText(/email*/i);
  userEvent.type(emailInput, 'isaac@gmail');

  const button = screen.getByRole('button');
  userEvent.click(button);
  // assert:

  const errorMessage = await screen.findByText(/email must be a valid email address/i);
  expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  // arrange:
  render(<ContactForm />);
  // act:
  const lastNameInput = screen.getByLabelText(/last name*/i);
  userEvent.type(lastNameInput, '');

  const button = screen.getByRole('button');
  userEvent.click(button);

  const errorMessage = await screen.findByText(/lastName is a required field/i);
  // assert:
  expect(errorMessage).toBeInTheDocument();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  // arrange:
    render(<ContactForm/>);
  // act:
    const firstNameInput = screen.getByLabelText(/first name*/i);
    const lastNameInput = screen.getByLabelText(/last name*/i);
    const emailInput = screen.getByLabelText(/email*/i);

    userEvent.type(firstNameInput, 'Isaac');
    userEvent.type(lastNameInput, 'Malin');
    userEvent.type(emailInput, 'Isaac@email.com');

    const button = screen.getByRole('button');
    userEvent.click(button);
  // assert:
    waitFor(() => {
      const firstNameDisplay = screen.queryByText('Isaac');
      const lastNameDisplay = screen.queryByText('Malin');
      const emailDisplay = screen.queryByText('Isaac@email.com');
      const messageDisplay = screen.queryByTestId('messageDisplay');

      expect(firstNameDisplay).toBeInTheDocument();
      expect(lastNameDisplay).toBeInTheDocument();
      expect(emailDisplay).toBeInTheDocument();
      expect(messageDisplay).not.toBeInTheDocument();
    });
});

test('renders all fields text when all fields are submitted.', async () => {
  // arrange:
  render(<ContactForm/>);
  // act:
    const firstNameInput = screen.getByLabelText(/first name*/i);
    const lastNameInput = screen.getByLabelText(/last name*/i);
    const emailInput = screen.getByLabelText(/email*/i);
    const messageInput = screen.getByLabelText(/message/i)

    userEvent.type(firstNameInput, 'Isaac');
    userEvent.type(lastNameInput, 'Malin');
    userEvent.type(emailInput, 'Isaac@email.com');
    userEvent.type(messageInput, 'My Message');
    

    const button = screen.getByRole('button');
    userEvent.click(button);
  // assert:
    waitFor(() => {
      const firstNameDisplay = screen.queryByText('Isaac');
      const lastNameDisplay = screen.queryByText('Malin');
      const emailDisplay = screen.queryByText('Isaac@email.com');
      const messageDisplay = screen.queryByTestId('messageDisplay');

      expect(firstNameDisplay).toBeInTheDocument();
      expect(lastNameDisplay).toBeInTheDocument();
      expect(emailDisplay).toBeInTheDocument();
      expect(messageDisplay).toBeInTheDocument();
    });
});

import { fireEvent, render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Login from '../../pages/Login';

it('should validate login credentials and navigate to products page', async () => {
  // setup
  const history = createMemoryHistory();
  const { getByTestId, getByLabelText } = render(
    <Router history={ history }>
      <Login />
    </Router>,
  );

  // simulate user input
  const emailInput = getByLabelText(/login/i);
  const passwordInput = getByLabelText(/senha/i);
  const loginBtn = getByTestId('common_login__button-login');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  // simulate form submission
  fireEvent.click(loginBtn);

  // assert that the user is navigated to the products page
  await waitFor(() => expect(history.location.pathname).toEqual('/customer/products'));
});

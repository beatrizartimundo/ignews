import {render, screen} from '@testing-library/react';
import { useSession } from 'next-auth/client';
import { mocked} from 'ts-jest/utils';
import { SignInButton } from '.';

//Caminho tem que ser exatamente igual para o mock funcionar

jest.mock('next-auth/client')

describe('SignInButton components', () => {

  test('renders corretly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValue([null,false])

    render(
      <SignInButton />
    )
    expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
  })

  test('renders corretly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([
      { user:{name:'User test', email:'user@email.com'}, expires:'fake-expires'},
      false
    ])
    render(
      <SignInButton />
    )
    expect(screen.getByText('User test')).toBeInTheDocument();
  })
  
})
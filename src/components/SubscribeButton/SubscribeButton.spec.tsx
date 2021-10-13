import {render, screen, fireEvent} from '@testing-library/react';
import { mocked} from 'ts-jest/utils';
import { SubscribeButton } from '.';
import {signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

//Caminho tem que ser exatamente igual para o mock funcionar

jest.mock('next-auth/client');

jest.mock('next/router');

describe('Subscribe components', () => {

  test('Subscribe button renders corretly', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValue([null,false])

    render(
      <SubscribeButton />
    )
    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  })

  test('redirect users to signin when is not authenticated', () => {
   const signInMocked = mocked(signIn);
   const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValue([null,false])

    render(
      <SubscribeButton />
    )
    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  })

  test('redirect users to post when have active subscription', () => {
    const useRouterMocked = mocked(useRouter);
    const useSessionMocked = mocked(useSession);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce([
      { 
        user:{name:'User test', email:'user@email.com'},
        expires:'fake-expires', activeSubscription: 'fake-subscription',
      },
      false
    ])

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any);
 
     render(
       <SubscribeButton />
     )
     const subscribeButton = screen.getByText('Subscribe now');
 
     fireEvent.click(subscribeButton);
 
     expect(pushMock).toHaveBeenCalledWith('/posts');
   })
  
})
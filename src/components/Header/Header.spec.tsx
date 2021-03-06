import {render, screen} from '@testing-library/react';
import { Header } from '.';

//Caminho tem que ser exatamente igual para o mock funcionar
jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

jest.mock('next-auth/client', () => {
  return {
    useSession() {
      return [null,false]
    }
  }
})

describe('Header components', () => {

  test('Header renders corretly', () => {
    render(
      <Header />
    )
  
    // debug()
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
  })
  
})
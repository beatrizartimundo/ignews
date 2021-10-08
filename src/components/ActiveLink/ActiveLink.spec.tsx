import {render} from '@testing-library/react';
import { ActiveLink } from '.';

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

describe('Active link components', () => {

  test('active link renders corretly', () => {
    const { getByText } =
    render(
      <ActiveLink  href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )
  
    // debug()
    expect(getByText('Home')).toBeInTheDocument();
  })
  
  
  test('active link renders corretly', () => {
    const { getByText } =
    render(
      <ActiveLink  href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )
  
    expect(getByText('Home')).toHaveClass("active");
  })
})
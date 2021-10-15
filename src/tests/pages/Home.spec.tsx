import { render,screen } from "@testing-library/react";
import { useSession } from "next-auth/client";
import { mocked} from 'ts-jest/utils';
import Home, { getStaticProps } from "../../pages";
import {stripe} from '../../services/stripe';

jest.mock('next-auth/client');

jest.mock('next/router');

jest.mock('../../services/stripe');

describe('Home page', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValue([null,false])
    
    render(<Home product={{priceId: 'fake-price-id', amount: 'R$10,00'}}/>)
    //gera o link do playground
    // screen.logTestingPlaygroundURL()

    expect(screen.getByText('for R$10,00 month')).toBeInTheDocument()
  })

  it('loads initial data', async() => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValue([null,false])
    const retrivePriceStripeMocked = mocked(stripe.prices.retrieve)

    retrivePriceStripeMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount:1000,
    } as any)

    const response = await getStaticProps({})

    // console.log(response)

    expect(response).toEqual(
      expect.objectContaining({
        props:{
          product: {
            priceId:'fake-price-id',
            amount: '$10.00'
          }
        }
      })
    )

    
  })
})
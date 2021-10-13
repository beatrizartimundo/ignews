import { render,screen } from "@testing-library/react";
import { useSession } from "next-auth/client";
import { mocked} from 'ts-jest/utils';
import Posts, {getStaticProps} from "../../pages/posts";
import {getPrismicClient} from '../../services/prismic';

const posts = [
  {slug: 'my-new-post', title: 'my new post', excerpt:'Post excerpt', updatedAt: '13 de outubro'}
];

jest.mock('../../services/prismic');

describe('Home page', () => {
  it('renders correctly', () => {
    
    render(<Posts posts={posts} />)

    expect(screen.getByText('my new post')).toBeInTheDocument()
  })

  it('loads initial data', async() => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid:'my-new-post',
            data: {
              title: [
                {type: 'heading', text: 'my new post'}
              ],
              content: [
                { type: 'paragraph', text: 'Post excerpt'}
              ]
            },
            last_publication_date: '10-13-2021',
          }
        ]
      })
    }as any)

    const response = await getStaticProps({})

    // console.log(response)

    expect(response).toEqual(
      expect.objectContaining({
        props:{
          posts: [{
            slug:'my-new-post',
            title:'my new post',
            excerpt:'Post excerpt',
            updatedAt: '13 de outubro de 2021',
          }]
        }
      })
    )

    
  })
})
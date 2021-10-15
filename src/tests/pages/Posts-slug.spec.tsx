import { render,screen } from "@testing-library/react";
import { getSession } from "next-auth/client";
import { mocked} from 'ts-jest/utils';
import Post, {getServerSideProps} from "../../pages/posts/[slug]";
import { getPrismicClient } from "../../services/prismic";

const posts = {
  slug: 'my-new-post', 
  title: 'my new post', 
  content:'<p>Post excerpt</p>', 
  updatedAt: '13 de outubro',
};

jest.mock('next-auth/client');
jest.mock('../../services/prismic');

describe('Post slug', () => {
  it('renders correctly', () => {
    
    render(<Post post={posts} />)

    expect(screen.getByText('my new post')).toBeInTheDocument();
    expect(screen.getByText('Post excerpt')).toBeInTheDocument()
  })

  it('redirects user if no subscription is found', async() => {
    const getSessionMocked = mocked(getSession)

    getSessionMocked.mockResolvedValueOnce(null)

    const response = await getServerSideProps({
      params: {slug: 'my-new-post'}
    } as any)

    // console.log(response)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: {
          destination:"/posts/preview/my-new-post",
          permanent: false,
        }
      })
    )    
  })

  it('loads initial data', async() => {
    const getSessionMocked = mocked(getSession)
    const getPrismicClientMocked = mocked(getPrismicClient)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-subscription',
    } as any)
    
    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
            data: {
              title: [
                {type: 'heading', text: 'my new post'}
              ],
              content: [
                { type: 'paragraph', text: 'Post content'}
              ]
            },
            last_publication_date: '10-13-2021',
          })
    }as any)

    const response = await getServerSideProps({
      params: {slug: 'my-new-post'}
    }as any)

    // console.log(response)

    expect(response).toEqual(
      expect.objectContaining({
        props:{
          post: {
            slug:'my-new-post',
            title:'my new post',
            content:'<p>Post content</p>',
            updatedAt: '13 de outubro de 2021',
          }
        }
      })
    )

    
  })
})
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('renders only title by default', () => {
  const blog = {
    "author": "Tito",
    "title": "This is a test",
    "url": "tito.com",
    "likes": 0
  }

  render(<Blog blog={blog} />)

  const title = screen.getByText('THIS IS A TEST')
  const url = screen.queryByText('tito.com')
  expect(title).toBeDefined()
  expect(url).toBeNull()
})

// test('clicking show button shows blog details', async () => {
//   const blog = {
//     "author": "Tito",
//     "title": "This is a test",
//     "url": "tito.com",
//     "likes": 0
//   }

//   const user = userEvent.setup()

//   const { container } = render(<Blog blog={blog} />)
//   const button = container.querySelector('.dtl-btn')
//   await user.click(button)

//   const url = container.querySelector('.dtl-url')
//   const like = container.querySelector('.dtl-like')

//   expect(url).toBeDefined()
//   expect(like).toBeDefined()
// })

test('creating a blog will call the fn received as prop', async () => {
  const createBlog= vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('here goes the title')
  const authorInput = screen.getByPlaceholderText('here goes the author')
  const urlInput = screen.getByPlaceholderText('here goes the url')
  const submitBtn = screen.getByText('Create')

  await userEvent.type(titleInput, 'A note with Vitest')
  await userEvent.type(authorInput, 'Tito')
  await userEvent.type(urlInput, 'www.vitest.com')

  await userEvent.click(submitBtn)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('A note with Vitest')
})
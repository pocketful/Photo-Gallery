import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import PhotoCard from '../PhotoCard'

describe('PhotoCard', () => {
  const props = {
    id: 1,
    src: 'https://images.pexels.com/photos/16233384/pexels-props-16233384.jpeg',
    photographer: 'Nati',
    url: 'https://www.pexels.com/photo/food-plate-dinner-table-16233384/',
    alt: '',
    onToggleFavourite: vi.fn(),
    isFavourite: false,
  }

  it('renders PhotoCard with props', () => {
    render(<PhotoCard {...props} />)
    expect(screen.getByText(props.photographer)).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', props.src)
    expect(
      screen.getByRole('img', { name: props.alt || `a photo by ${props.photographer}` }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /food plate dinner table/i || props.alt || 'Amazing world',
      }),
    ).toBeInTheDocument()
  })

  it('clicking favourite button calls onToggleFavourite with correct id', () => {
    render(<PhotoCard {...props} />)
    const favouriteButton = screen.getByRole('button', { name: /favourite/i })
    fireEvent.click(favouriteButton)
    expect(props.onToggleFavourite).toHaveBeenCalledWith(props.id)
  })
})

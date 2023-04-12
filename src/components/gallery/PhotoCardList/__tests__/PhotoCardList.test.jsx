import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import PhotoCardList from '../PhotoCardList'

describe('PhotoCardList', () => {
  const props = [
    {
      id: 1,
      src: 'https://images.pexels.com/photos/16233384/pexels-photo-16233384.jpeg',
      photographer: 'Nati',
      url: 'https://www.pexels.com/photo/food-plate-dinner-table-16233384/',
      alt: '',
      onToggleFavourite: vi.fn(),
      isFavourite: false,
    },
    {
      id: 2,
      src: 'https://images.pexels.com/photos/16233384/pexels-photo-16233385.jpeg',
      photographer: 'Nati2',
      url: 'https://www.pexels.com/photo/food-plate-dinner-table2-16233385/',
      alt: '',
      onToggleFavourite: vi.fn(),
      isFavourite: false,
    },
    {
      id: 3,
      src: 'https://images.pexels.com/photos/16233384/pexels-photo-16233386.jpeg',
      photographer: 'Nati3',
      url: 'https://www.pexels.com/photo/food-plate-dinner-table3-16233386/',
      alt: '',
      onToggleFavourite: vi.fn(),
      isFavourite: true,
    },
  ]

  it('renders the list of photos', () => {
    render(<PhotoCardList data={props} />)
    const listItems = screen.queryAllByRole('article')
    expect(listItems).toHaveLength(props.length)

    props.forEach(({ src, photographer, url, alt }) => {
      const photo = screen.getByRole('img', {
        name: props.alt || `a photo by ${photographer}`,
      })
      expect(photo).toHaveAttribute('src', src)
      expect(photo).toHaveAttribute('alt', alt || `a photo by ${photographer}`)
      expect(screen.getByText(photographer)).toBeInTheDocument()
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: url.split('/')[4].split('-').slice(0, -1).join(' ') || alt || 'Amazing world',
        }),
      ).toBeInTheDocument()
    })
  })
})

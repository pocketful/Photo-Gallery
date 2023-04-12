import { act, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import HomePage from '../HomePage'

describe('HomePage', () => {
  it('renders heading', async () => {
    render(<HomePage />)
    await act(async () => {
      expect(screen.getByRole('heading', { level: 1, name: /photo gallery/i })).toBeInTheDocument()
    })
  })
})

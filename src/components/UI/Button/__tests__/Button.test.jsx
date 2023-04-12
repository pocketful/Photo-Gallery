import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Button from '../Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(
      <Button isFavourite onClick={() => {}}>
        Favourite
      </Button>,
    )
    const button = screen.getByRole('button', { name: /favourite/i })
    expect(button).toBeInTheDocument()
    expect(button).toBeEnabled()
  })

  it('renders as disabled', () => {
    render(
      <Button isFavourite onClick={() => {}} isDisabled>
        Click me
      </Button>,
    )
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('calls onClick when clicked', () => {
    const onClickMock = vi.fn()
    render(
      <Button isFavourite onClick={onClickMock}>
        Favourite
      </Button>,
    )
    const buttonEl = screen.getByRole('button')
    fireEvent.click(buttonEl)
    expect(onClickMock).toHaveBeenCalled()
  })
})

import style from './Button.module.scss'

const Button = ({ children, isFavourite = false, isDisabled = false, onClick }) => {
  return (
    <button
      type="button"
      className={`${style.button} ${isFavourite ? style['button--favourite'] : ''}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button

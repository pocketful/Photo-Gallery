import style from './Error.module.scss'

const Error = ({ children }) => {
  return <p className={style.error}>{children}</p>
}

export default Error

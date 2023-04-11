import style from './Error.module.scss'
import PropTypes from 'prop-types'

const Error = ({ children }) => {
  return <p className={style.error}>{children}</p>
}

export default Error

Error.propTypes = {
  children: PropTypes.node.isRequired,
}

import PropTypes from 'prop-types'
import style from './Container.module.scss'

const Container = ({ children }) => {
  return <main className={style.container}>{children}</main>
}

export default Container

Container.propTypes = {
  children: PropTypes.node.isRequired,
}

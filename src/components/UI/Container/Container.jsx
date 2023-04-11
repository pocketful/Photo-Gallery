import style from './Container.module.scss'
import PropTypes from 'prop-types'

const Container = ({ children }) => {
  return <main className={style.container}>{children}</main>
}

export default Container

Container.propTypes = {
  children: PropTypes.node.isRequired,
}

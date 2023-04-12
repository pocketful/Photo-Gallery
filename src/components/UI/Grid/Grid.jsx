import PropTypes from 'prop-types'
import style from './Grid.module.scss'

const Grid = ({ children }) => {
  return <div className={style.grid}>{children}</div>
}

export default Grid

Grid.propTypes = {
  children: PropTypes.node.isRequired,
}

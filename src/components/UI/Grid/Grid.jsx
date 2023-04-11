import style from './Grid.module.scss'
import PropTypes from 'prop-types'

const Grid = ({ children }) => {
  return <div className={style.grid}>{children}</div>
}

export default Grid

Grid.propTypes = {
  children: PropTypes.node.isRequired,
}

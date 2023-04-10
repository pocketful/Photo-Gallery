import style from './Container.module.scss'

const Container = ({ children }) => {
  return <main className={style.container}>{children}</main>
}

export default Container

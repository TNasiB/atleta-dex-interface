import { ConnectKitButton } from 'connectkit'
import S from './Header.module.scss'
import { Link } from '@tanstack/react-router'

const Header: React.FC = () => {
  return (
    <header className={S.header}>
      <span>DEX</span>

      <div style={{ display: 'flex', gap: 10 }}>
        <Link to="/pools">Pools</Link>
        <Link to="/swap">Swap</Link>
        <Link to="/pools/create">Create pool</Link>
      </div>

      <ConnectKitButton />
    </header>
  )
}

export default Header

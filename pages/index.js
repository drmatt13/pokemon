import { useContext } from 'react'

// context
import _appContext from '../context/_appContext'

export default function Home() {

  const { mobile, darkMode, toggleDarkMode } = useContext(_appContext)

  return <>
    <div>
      <h1>Home</h1>
    </div>
  </>
}
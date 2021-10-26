import { useState, useEffect } from 'react'
import Head from 'next/head'

// context
import _appContext from '../context/_appContext'

// styles
import 'tailwindcss/tailwind.css'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {

  // check if mobile device
  const [mobile] = useState(
    typeof window !== 'undefined' ?
      /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      :
      null
  )

  const [darkMode, setDarkMode] = useState(false)

  // set dark mode
  const toggleDarkMode = () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
      setDarkMode(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
      setDarkMode(true)
    }
  }

  // initialize dark mode with local storage
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
      setDarkMode(true)
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
      setDarkMode(false)
    }
  }, [])

  return <>
    <Head>
      <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no" />
      <meta name="theme-color" content={darkMode ? "#7d54ed" : "#f33984"} />
    </Head>
    <_appContext.Provider value={{ mobile, darkMode, toggleDarkMode }}>
      <Component {...pageProps} />
    </_appContext.Provider>
  </>
}

export default MyApp

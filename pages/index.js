import { useEffect, useContext } from 'react'
import Link from 'next/link'

// components
import Navbar from '../components/Navbar'

// context
import _appContext from '../context/_appContext'

// styles
import styles from '../styles/styles.module.scss'

export default function Home({ env }) {

  const { mobile } = useContext(_appContext)

  const toggleDarkMode = () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    } else {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    }
  }

  useEffect(() => {
    console.log(
      '\nprocess.env.password: ', env, 
      '\nNEXT_PUBLIC_ANALYTICS_ID:', process.env.NEXT_PUBLIC_ANALYTICS_ID
    )
  }, [])

  return <div className="min-h-screen bg-white dark:bg-gradient-to-tl dark:from-blue-400 dark:via-purple-600 dark:to-gray-600">
    <Navbar />
    <div className="container mb-5 py-5 pl-5 bg-gradient-to-r from-white via-pink-100 to-pink-200 dark:from-gray-200 dark:via-purple-300 dark:to-purple-500 sm:rounded-2xl">
      <div className="text-5xl sm:text-7xl max-w-min flex items-center">
        <div className="animate-pulse flex">
          <Link href="/1"><i className="cursor-pointer devicon-nodejs-plain colored" /></Link>
        </div>
        <div className="animate-spin-slow flex ml-5">
          <Link href="/2"><i className="cursor-pointer devicon-react-original colored" /></Link>
        </div>
        <div className="animate-ping flex ml-9 text-3xl sm:text-4xl">
          <Link href="/3"><i className="cursor-pointer devicon-redux-original colored" /></Link>
        </div>
        <div className="animate-bounce flex ml-9">
          <Link href="/4"><i className="cursor-pointer devicon-tailwindcss-plain colored" /></Link>
        </div>
      </div>
    </div>
    <div className="container px-5 md:px-0">
      <div 
        onClick={toggleDarkMode} 
        className="cursor-pointer select-none h-8 w-16 mb-5 rounded-full shadow-md ring-2 ring-gray-200 dark:ring-gray-400  bg-gradient-to-tr from-white to-gray-100 dark:from-gray-200 dark:to-gray-400"
      >
        <div className={`h-8 w-8 p-1 transition-all duration-150 ease-in-out dark:ml-8`}>
          <div className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 dark:from-blue-400 dark:via-purple-600 dark:to-gray-600" />
        </div>
      </div>
      <div className="dark:text-white">mobile device: {mobile ? "true" : "false"}</div>
    </div>
  </div>
}

export async function getStaticProps(context) {

  const env = process.env.DB_PASS

  return {
    props: {
      env
    }, // will be passed to the page component as props
    // never revalidate
  }
}
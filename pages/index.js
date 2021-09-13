import { useContext } from 'react'

// context
import _appContext from '../context/_appContext'

export default function Home() {

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

  return <div className="min-h-screen bg-white dark:bg-gradient-to-tl dark:from-blue-400 dark:via-purple-600 dark:to-gray-600">
    <div className="max-w-full mb-5 flex justify-between bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-gray-600">
      <div className="select-none ml-5 sm:ml-10 flex justify-center items-center text-7xl sm:text-8xl">
        <i className="devicon-nextjs-plain-wordmark colored cursor-pointer" />
      </div>
      <div className="select-none mr-5 sm:mr-10 flex justify-center items-center text-sm sm:text-xl">
        <div className="relative h-10 w-10 flex justify-center items-center bg-white dark:text-gray-200 dark:hover:text-black dark:bg-gray-800 rounded-full shadow-2xl cursor-pointer ring-1 ring-gray-100 hover:ring-green-400 dark:ring-gray-800 dark:hover:ring-green-400 hover:bg-green-400 dark:hover:bg-green-400">
          <div className="absolute top-0 right-0 h-5 w-5 flex justify-center items-center text-sm text-white bg-red-500 border border-opacity-50 dark:border-opacity-100 border-red-700 dark:border-gray-600 rounded-full animate-cart-bounce">2</div>
          <i className="fas fa-shopping-cart" />
        </div>
      </div>
    </div>
    <div className="container mb-5 py-5 pl-5 bg-gradient-to-r from-white via-pink-100 to-pink-200 dark:from-gray-200 dark:via-purple-300 dark:to-purple-500 sm:rounded-2xl">
      <div className="text-5xl sm:text-7xl max-w-min flex items-center">
        <div className="animate-pulse flex">
          <i className="devicon-nodejs-plain colored"/>
        </div>
        <div className="animate-spin-slow flex ml-5">
          <i className="devicon-react-original colored"/>
        </div>
        <div className="animate-ping flex ml-9 text-3xl sm:text-4xl">
          <i className="devicon-redux-original colored"/>
        </div>
        <div className="animate-bounce flex ml-9">
          <i className="devicon-tailwindcss-plain colored"/>
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

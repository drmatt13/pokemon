import Link from 'next/link'

const Navbar = () => {
  return <>
    <div className="max-w-full mb-5 flex justify-between bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-gray-600">
      <div className="select-none ml-5 sm:ml-10 flex justify-center items-center text-7xl sm:text-8xl">
        <Link href="/">
          <i className="devicon-nextjs-plain-wordmark colored cursor-pointer" />
        </Link>
      </div>
      <div className="select-none mr-5 sm:mr-10 flex justify-center items-center text-sm sm:text-xl">
        <div className="relative h-10 w-10 flex justify-center items-center bg-white dark:text-gray-200 dark:hover:text-black dark:bg-gray-800 rounded-full shadow-2xl cursor-pointer ring-1 ring-gray-100 hover:ring-green-400 dark:ring-gray-800 dark:hover:ring-green-400 hover:bg-green-400 dark:hover:bg-green-400">
            <div className="absolute top-0 right-0 h-5 w-5 flex justify-center items-center text-sm text-white bg-black dark:bg-red-500 border border-opacity-50 border-gray-600 rounded-full animate-cart-bounce">2</div>
            <i className="fas fa-shopping-cart" />
        </div>
      </div>
    </div>
  </>
}

export default Navbar

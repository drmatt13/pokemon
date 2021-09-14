// components
import Navbar from './Navbar'

const AppLayout = ({ children }) => {
  return <div className="h-screen flex flex-col bg-gradient-to-tl from-white via-red-200 to-pink-100 dark:from-blue-400 dark:via-purple-600 dark:to-gray-600">
    <Navbar />
    <div className="relative flex-1 overflow-y-auto">
      { children }
    </div>
  </div>
}

export default AppLayout

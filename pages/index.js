import Head from 'next/head'

export default function Home() {
  return <>
    <div className="max-w-full h-24 mb-5 flex justify-between bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
      <div className="max-h-full ml-10 flex justify-center items-center text-8xl">
        <i className="devicon-nextjs-plain-wordmark colored cursor-pointer" />
      </div>
      <div className="max-h-full mr-10 flex justify-center items-center text-2xl">
        <div className="bg-white rounded-full shadow-2xl cursor-pointer ring-1 ring-gray-100 hover:bg-green-400 hover:ring-green-400 transition duration-100 ease-in-out">
          <i className="fas fa-shopping-cart p-3" />
        </div>
      </div>
    </div>
    <div className="container bg-pink-100">
      <div className="text-7xl max-w-min flex items-center">
        <div className="animate-pulse">
          <i className="devicon-nodejs-plain colored"/>
        </div>
        <div className="animate-spin-slow ml-5">
          <i className="devicon-react-original colored"/>
        </div>
        <div className="animate-ping ml-9 text-5xl">
          <i className="devicon-redux-original colored"/>
        </div>
        <div className="animate-bounce ml-9">
          <i className="devicon-tailwindcss-plain colored"/>
        </div>
      </div>
    </div>
  </>
}

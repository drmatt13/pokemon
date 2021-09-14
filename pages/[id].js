import { useRouter } from 'next/router'

// components
import Navbar from '../components/Navbar'

export default function Home({ data }) {

  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return <div className="min-h-screen text-center bg-gradient-to-tl from-white via-red-200 to-pink-100 dark:from-blue-400 dark:via-purple-600 dark:to-gray-600">
    <Navbar />
    <div className="inline-block my-14 relative w-5/6 sm:max-w-md lg:max-w-xl content-center bg-gradient-to-r from-white via-pink-100 to-pink-200 dark:from-gray-200 dark:via-purple-300 dark:to-purple-500 rounded-2xl">
      <div className="absolute select-none top-0 left-0 h-7 w-7 -translate-x-3 -translate-y-2 flex justify-center items-center text-sm text-white bg-black dark:bg-red-500 border border-opacity-25 border-gray-600 rounded-full">{ data.id }</div>        
      <div className="p-4 float-left">
        <p className="text-lg text-left"><img className="float-left select-none shadow ring-1 ring-gray-400 ring-opacity-10 cursor-pointer rounded-xl mr-4 h-16 w-16" src={data.url} />{ data.title }</p>
      </div>
    </div>
  </div>
}

// called on every request when in development mode
export async function getStaticPaths() {
  return {
    // generate at build time [id:1, id:2]
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } }
    ],
    // use router.isFallback & redirect manually or placeholder html while loads
    // if false auto 404
    fallback: true
  }
}

export async function getStaticProps({ params: { id } }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
  const data = await res.json()

  // process.cwd() get DIR/ name at build time

  if (!data) {
    return {
      // generates 404 page
      notFound: true,
      // redirect: {
      //   destination: '/',
      //   permanent: false,
      // },
    }
  }

  return {
    props: {
      data,
    }, // will be passed to the page component as props
    revalidate: 60 // generate new page on next req after 60 seconds
  }
}
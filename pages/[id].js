import { useEffect } from 'react'
import { useRouter } from 'next/router'

// components
import Navbar from '../components/Navbar'

export default function Home({ data }) {

  const router = useRouter()

  useEffect(() => {
    console.log("data: ", data)
  }, [data])

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return <div className="min-h-screen bg-white dark:bg-gradient-to-tl dark:from-blue-400 dark:via-purple-600 dark:to-gray-600">
    <Navbar />
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
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
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
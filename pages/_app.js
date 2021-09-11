import { useEffect } from 'react'
import Head from 'next/head'

// styles
import 'tailwindcss/tailwind.css'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }, [])

  return <>
    <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/devicon/2.14.0/devicon.min.css" integrity="sha512-Fx1qTIVtFTb41Tqu+TxfaaPCcpmkRIbOIKh+4OIwVYAECoW89rz4BnRy95Vu8MYSRgghC3pS9mJ435hzarnZcw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="theme-color" content="#3d3d3d" />
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp

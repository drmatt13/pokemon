import { useState, useEffect } from "react";
import pokemon from "pokemontcgsdk";
import Head from "next/head";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";

// context
import _appContext from "../context/_appContext";

// hooks
import useAuth from "../hooks/useAuth";

// styles
import "tailwindcss/tailwind.css";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const { user, setUser, loading } = useAuth();

  pokemon.configure({ apiKey: process.env.NEXT_PUBLIC_POKEMON_SECRET });

  // check if mobile device
  const [mobile] = useState(
    typeof window !== "undefined"
      ? /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      : null
  );

  return (
    <>
      <Head>
        <title>Pokémon Card Manager</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,user-scalable=no"
        />
        <meta name="theme-color" content="#f33984" />
        {/* font awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>

      <_appContext.Provider value={{ user, setUser, pokemon, mobile }}>
        <div className="relative min-h-screen">
          {loading ? (
            <div className="relative z-10 h-screen w-screen flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <div className="relative z-10">
              {user && <Navbar />}
              <Component {...pageProps} />
            </div>
          )}
          <div
            className="fixed h-screen w-screen top-0 z-0"
            style={{
              backgroundImage: `url("AdobeStock_293831552_Editorial_Use_Only.jpeg")`,
              backgroundSize: "cover",
              opacity: 0.1,
            }}
          />
        </div>
      </_appContext.Provider>
    </>
  );
}

export default MyApp;

import { useState, useEffect } from "react";
import pokemon from "pokemontcgsdk";
import Head from "next/head";

// navbar
import Navbar from "../components/Navbar";

// context
import _appContext from "../context/_appContext";

// hooks
import useAuth from "../hooks/useAuth";

// styles
import "tailwindcss/tailwind.css";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useAuth();

  pokemon.configure({ apiKey: process.env.NEXT_PUBLIC_POKEMON_SECRET });

  // check if mobile device
  const [mobile] = useState(
    typeof window !== "undefined"
      ? /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      : null
  );

  const [darkMode, setDarkMode] = useState(false);

  // set dark mode
  const toggleDarkMode = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setDarkMode(true);
    }
  };

  // initialize dark mode with local storage
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setDarkMode(false);
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,user-scalable=no"
        />
        <meta name="theme-color" content={darkMode ? "#7d54ed" : "#f33984"} />
        {/* font awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>

      <_appContext.Provider
        value={{ user, setUser, pokemon, mobile, darkMode, toggleDarkMode }}
      >
        <div className="relative min-h-screen">
          <div className="relative z-10">
            {user && <Navbar />}
            <Component {...pageProps} />
          </div>
          <div
            className="fixed h-screen w-screen top-0 z-0"
            style={{
              backgroundImage: `url("AdobeStock_293831552_Editorial_Use_Only.jpeg")`,
              backgroundSize: "cover",
              opacity: 0.2,
            }}
          />
        </div>
      </_appContext.Provider>
    </>
  );
}

export default MyApp;

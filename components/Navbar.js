import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie";

// context
import _appContext from "../context/_appContext";

const Navbar = () => {
  const { setUser } = useContext(_appContext);
  const router = useRouter();

  const signOut = () => {
    Cookies.remove("bearer");
    setUser(null);
    router.push("/login");
  };

  return (
    <>
      <style jsx>{`
        .w-full {
          background: #005c97; /* fallback for old browsers */
          background: -webkit-linear-gradient(
            to right,
            #363795,
            #005c97
          ); /* Chrome 10-25, Safari 5.1-6 */
          background: linear-gradient(
            to right,
            #363795,
            #005c97
          ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        }
      `}</style>
      <div
        className="w-full h-20 flex border-b border-gray-700 shadow-xl text-sm sm:text-lg md:text-xl lg:text-2xl font-bold cursor-pointer text-yellow-400"
        style={{
          fontFamily: "'Bebas Neue', cursive",
          letterSpacing: "2.5px",
        }}
      >
        <div className="flex-1 flex items-center">
          <Link href="/">
            <div className="ml-4 sm:ml-8 hover:text-yellow-300 hover:underline">
              poké search
            </div>
          </Link>
          <Link href="/collections">
            <div className="ml-4 sm:ml-8 hover:text-yellow-300 hover:underline">
              collections
            </div>
          </Link>
        </div>
        <div
          className="mx-4 sm:mx-8 flex items-center hover:text-yellow-300 hover:underline"
          onClick={signOut}
        >
          Sign Out
        </div>
      </div>
    </>
  );
};

export default Navbar;

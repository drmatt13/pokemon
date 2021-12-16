import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie";
import Loading from "../../components/Loading";

// context
import _appContext from "../../context/_appContext";

const validEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const Index = () => {
  const { setUser } = useContext(_appContext);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailClass, setEmailClass] = useState("");
  const [password, setPassword] = useState("");
  const [passwordClass, setPasswordClass] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      if (value.length === 0) setEmailClass("");
      else if (!validEmail(value)) setEmailClass("ring ring-red-500");
      else setEmailClass("ring ring-green-500");
      setEmail(value);
    }
    if (name === "password") {
      if (value.length === 0) setPasswordClass("");
      else if (value.length < 8) {
        setPasswordClass("ring ring-red-500");
      } else {
        setPasswordClass("ring ring-green-500");
      }
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password.length < 8) {
        alert("password must be at least 8 characters");
        return;
      }
      setLoading(true);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setUser(json.data.user);
        Cookies.set("token", json.data.token);
        router.push("/");
      } else {
        setLoading(false);
        alert("invalid email or password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Login | Pokémon Card Manager</title>
      </Head>
      <div className="flex flex-col items-center min-h-screen pt-28">
        <div
          className="text-5xl md:text-6xl lg:text-7xl text-yellow-400 text-center"
          style={{
            textShadow:
              "#2a75bb 0px 0px 2.5px, #2a75bb 0px 0px 2.5px, #2a75bb 0px 0px 2.5px, #2a75bb 0px 0px 2.5px, #2a75bb 0px 0px 2.5px, #2a75bb 0px 0px 2.5px",
            fontFamily: "'Bebas Neue', cursive",
            letterSpacing: "2.5px",
          }}
        >
          Pokémon Card Manager
        </div>
        {loading ? (
          <div className="flex flex-col items-center mt-12">
            <Loading />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col mt-16 pb-24 animate-fade-in"
          >
            <input
              className={`${emailClass} p-2 w-64 rounded`}
              name="email"
              type="email"
              placeholder="email"
              required={true}
              value={email}
              onChange={(e) => handleChange(e)}
            />
            <input
              className={`${passwordClass} p-2 w-64 mt-2 rounded`}
              name="password"
              type="password"
              placeholder="password"
              required={true}
              value={password}
              onChange={(e) => handleChange(e)}
            />
            <input
              className="text-sm sm:text-lg cursor-pointer p-2 w-64 mt-2 border border-gray-600 bg-purple-600 text-yellow-400 rounded shadow-xl hover:bg-purple-700"
              style={{
                fontFamily: "'Bebas Neue', cursive",
                letterSpacing: "2.5px",
              }}
              type="submit"
              value="SIGN IN"
            />
            <div className="mt-2 flex text-white justify-center">
              <div>Not a member?</div>
              <Link href="/register">
                <div className="ml-2 underline cursor-pointer text-yellow-400 hover:text-yellow-500">
                  Sign up now
                </div>
              </Link>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Index;

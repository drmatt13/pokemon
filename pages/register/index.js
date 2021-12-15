import { useState, useRef, useContext } from "react";
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
  const [username, setUsername] = useState("");
  const [usernameClass, setUsernameClass] = useState("");
  const [email, setEmail] = useState("");
  const [emailClass, setEmailClass] = useState("");
  const [password, setPassword] = useState("");
  const [passwordClass, setPasswordClass] = useState("");
  const [password2, setPassword2] = useState("");
  const [password2Class, setPassword2Class] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "username":
        if (value.length === 0) setUsernameClass("");
        else if (value.length < 3) setUsernameClass("ring ring-red-500");
        else setUsernameClass("ring ring-green-500");
        setUsername(value);
        break;
      case "email":
        if (value.length === 0) setEmailClass("");
        else if (!validEmail(value)) setEmailClass("ring ring-red-500");
        else setEmailClass("ring ring-green-500");
        setEmail(value);
        break;
      case "password":
        if (value.length === 0) setPasswordClass("");
        else if (value.length < 8) {
          setPasswordClass("ring ring-red-500");
        } else {
          setPasswordClass("ring ring-green-500");
        }
        setPassword(value);
        break;
      case "password2":
        if (value.length === 0) setPassword2Class("");
        else if (value.length < 8) {
          setPassword2Class("ring ring-red-500");
        } else {
          setPassword2Class("ring ring-green-500");
        }
        setPassword2(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== password2) {
        alert("Passwords do not match");
        setPasswordClass("ring ring-red-500");
        setPassword2Class("ring ring-red-500");
        return;
      }
      setLoading(true);
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
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
        if (json.message === "Username already exists") {
          alert("Username already exists, please use a different username");
          setUsernameClass("ring ring-red-500");
        } else if (json.message === "Email already exists") {
          alert("Email already exists, please use a different email");
          setEmailClass("ring ring-red-500");
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Register | Pokémon Card Manager</title>
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
              className={`${usernameClass} p-2 w-64 rounded`}
              type="text"
              name="username"
              placeholder="username"
              required={true}
              value={username}
              onChange={(e) => handleChange(e)}
            />
            <input
              className={`${emailClass} p-2 w-64 mt-2 rounded`}
              type="email"
              name="email"
              placeholder="email"
              required={true}
              value={email}
              onChange={(e) => handleChange(e)}
            />
            <input
              className={`${passwordClass} p-2 w-64 mt-2 rounded`}
              type="password"
              name="password"
              placeholder="password"
              required={true}
              value={password}
              onChange={(e) => handleChange(e)}
            />
            <input
              className={`${password2Class} p-2 w-64 mt-2 rounded`}
              type="password"
              name="password2"
              placeholder="confirm password"
              required={true}
              value={password2}
              onChange={(e) => handleChange(e)}
            />
            <input
              className="text-sm sm:text-lg cursor-pointer p-2 w-64 mt-2 border border-gray-600 bg-purple-600 text-yellow-400 rounded shadow-xl hover:bg-purple-700"
              style={{
                fontFamily: "'Bebas Neue', cursive",
                letterSpacing: "2.5px",
              }}
              type="submit"
              value="REGISTER"
            />
            <div className="mt-2 flex text-white justify-center">
              <div>Already a user?</div>
              <Link href="/login">
                <div className="ml-2 underline cursor-pointer text-yellow-400 hover:text-yellow-500">
                  Login now
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

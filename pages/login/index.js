import { useContext } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

// context
import _appContext from "../../context/_appContext";

const Index = () => {
  const { setUser } = useContext(_appContext);
  const router = useRouter();

  const login = () => {
    Cookies.set("bearer", "1234567890");
    setUser({ _id: "1234567890", name: "John Doe" });
    router.push("/");
  };

  return (
    <button
      className="bg-gray-300 m-4 px-3 py-2 shadow-lg hover:bg-gray-200 border border-gray-300"
      onClick={login}
    >
      Login
    </button>
  );
};

export default Index;

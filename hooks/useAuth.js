import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const UseAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState();

  useEffect(() => {
    const bearer = Cookies.get("bearer");
    if (bearer) {
      setUser({ _id: "1234567890", name: "John Doe" });
    } else {
      router.push("/login");
    }
  }, []);

  return [user, setUser];
};

export default UseAuth;

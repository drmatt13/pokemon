import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const UseAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setUser({ _id: "1234567890", name: "John Doe" });
      setLoading(false);
      if (["/login", "/register"].includes(router.pathname)) router.push("/");
    } else {
      setLoading(false);
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return { user, setUser, loading };
};

export default UseAuth;

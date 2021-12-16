import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const UseAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const req = await fetch("/api/auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const json = await req.json();
    if (json.success) {
      Cookies.set("token", json.token);
      setUser(json.data.user);
      if (["/login", "/register"].includes(router.pathname)) {
        router.push("/");
      }
    } else {
      Cookies.remove("token");
      router.push("/login");
    }
    setLoading(false);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      checkAuth(token);
    } else {
      setLoading(false);
      router.push("/login");
    }
  }, []);

  return { user, setUser, loading };
};

export default UseAuth;

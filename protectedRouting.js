"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "utils";
const publicRoutes = ["/", "/login"];
const privateRoutes = ["/dashboard", "/weather", "/chat"];

const AuthWrapper = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // debugger;
    if (getCookie("token") && publicRoutes.includes(pathname)) {
      router.push("/weather");
      return;
    }

    if (getCookie("token") && !privateRoutes.includes(pathname)) {
      router.push("/pagenotfound");
      return;
    }
    if (!getCookie("token") && !publicRoutes.includes(pathname)) {
      router.push("/login");
      return;
    }

    if (getCookie("token")) {
      router.push(pathname);
    }
  }, [pathname]);

  return children;
};

export default AuthWrapper;

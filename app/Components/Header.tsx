"use client";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SecurityIcon from "@mui/icons-material/Security";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SendIcon from "@mui/icons-material/Send";
import LogoutIcon from "@mui/icons-material/Logout";

import { puJWT } from "../Redux/AuthSlice";
import { latinToCyrillic } from "../tip/add/Components/lotin";
import Link from "next/link";

export default function Header() {
  const admin = useSelector((state: any) => state.auth.admin);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const menuListAdmin = [
    {
      name: "Sms jonatish",
      path: "/send",
      icon: <SendIcon />,
    },
    {
      name: "Shaxsiy",
      path: "/shaxsiy",
      icon: <SecurityIcon />,
    },
    {
      name: "Mijoz",
      path: admin ? "/tip/batalyon" : "/tip",
      icon: <PermIdentityIcon />,
    },
  ];

  const [active, setActive] = React.useState<string>(menuListAdmin[0].path);

  React.useEffect(() => {
    if (pathname === "/") {
      setActive(menuListAdmin[0].path);
    } else {
      const matchingMenuItem = menuListAdmin.find(
        (item) => item.path === pathname
      );
      if (matchingMenuItem) {
        setActive(matchingMenuItem.path);
      }
    }
  }, [pathname, menuListAdmin]);

  const handleClick = (path: string) => {
    setActive(path);
    router.push(path);
  };

  const AuthOut = () => {
    sessionStorage.setItem("token", "out");
    dispatch(puJWT("out"));
    location.reload();
  };

  return (
    <div className="py-6 min-h-[100vh] w-[300px] fixed top-0 left-0 flex flex-col bg-[#1976D2] text-white">
      <Link href={"/send"}>
        <div className="flex pl-3 gap-2 items-center">
          <div className="w-[54px] h-[54px] rounded-[999px] bg-white">
            <img
              className="w-[54px] h-[54px] rounded-[999px]"
              src="/icon-192x192.png"
              alt=""
            />
          </div>
          <h1 className="text-[26px] font-bold">{latinToCyrillic("SMS")}</h1>
        </div>
      </Link>
      <div className="min-w-[300px] h-[1px] bg-white my-4"></div>
      <div className="flex flex-col px-3 gap-4">
        {menuListAdmin.map((e) => (
          <button
            key={e.path}
            onClick={() => handleClick(e.path)}
            className={`flex gap-6 items-center px-4 w-full py-2 rounded-xl transition-all duration-300 ${
              active === e.path
                ? "bg-white text-[#1976D2] transform scale-105"
                : "bg-[#1976D2] text-white hover:bg-[#fff] hover:text-[#1976D2] hover:scale-105"
            }`}
          >
            {e.icon}
            <h1 className="text-[20px] font-bold text-center">
              {latinToCyrillic(e.name)}
            </h1>
          </button>
        ))}

        <button
          onClick={AuthOut}
          className={`flex gap-6 items-center px-4 w-full py-2 rounded-xl transition-all duration-300 bg-red-600 text-white hover:bg-red-700 transform hover:scale-105`}
        >
          <LogoutIcon />
          <h1 className="text-[20px] font-bold text-center">
            {latinToCyrillic("Chiqish")}
          </h1>
        </button>
      </div>
    </div>
  );
}

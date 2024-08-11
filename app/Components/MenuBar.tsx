import * as React from "react";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StorageIcon from "@mui/icons-material/Storage";
import { latinToCyrillic } from "../tip/add/Components/lotin";
import { useRouter, usePathname } from "next/navigation";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import NumbersIcon from "@mui/icons-material/Numbers";

export default function MenuBar() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { path: "/names", label: "BXM", icon: <AccountBalanceIcon /> },
    { path: "/coctav", label: "Hisob Raqami", icon: <StorageIcon /> },
    { path: "/shahar", label: "Ijrochi", icon: <CollectionsBookmarkIcon /> },
    { path: "/boshliq", label: "Boshliq", icon: <InterpreterModeIcon /> },
    { path: "/manzil", label: "Manzil", icon: <ShareLocationIcon /> },
    { path: "/bank", label: "Bank", icon: <AccountBalanceWalletIcon /> },
    { path: "/mfo", label: "Mfo", icon: <FeaturedPlayListIcon /> },
    { path: "/str", label: "Str", icon: <NumbersIcon /> },
  ];

  const [isHisobOpen, setIsHisobOpen] = React.useState(false);
  const [isInitialLoad, setIsInitialLoad] = React.useState(true);

  // Synchronize the menu's open state with the URL path only on initial load
  React.useEffect(() => {
    if (isInitialLoad) {
      const isPathMatched = menuItems.some((item) => pathname === item.path);
      setIsHisobOpen(isPathMatched);
      setIsInitialLoad(false);
    }
  }, [pathname, menuItems, isInitialLoad]);

  const handleHisobClick = () => {
    setIsHisobOpen((prev) => !prev);
  };

  return (
    <div className="w-full">
      <Button
        id="hisob-button"
        variant="contained"
        disableElevation
        sx={{
          width: "100%",
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "17px",
          fontWeight: "bold",
          textAlign: "start",
        }}
        onClick={handleHisobClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {latinToCyrillic("spravichnik")}
      </Button>
      <div className="flex flex-col gap-4">
        {isHisobOpen && (
          <div className="mt-2">
            {menuItems.map((e) => (
              <Button
                key={e.path}
                onClick={() => router.push(e.path)}
                disableRipple
                className={`flex gap-6 items-center px-4 w-full py-2 rounded-xl transition-all duration-300 justify-start ${
                  pathname === e.path
                    ? "bg-white text-[#1976D2] transform scale-105 pointer-events-none"
                    : "bg-[#1976D2] text-white hover:bg-[#fff] hover:text-[#1976D2] hover:scale-105"
                }`}
              >
                {e.icon}
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {latinToCyrillic(e.label)}
                </span>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

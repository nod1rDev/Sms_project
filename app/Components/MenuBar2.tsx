import * as React from "react";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import DnsIcon from "@mui/icons-material/Dns";
import TokenIcon from "@mui/icons-material/Token";
import StorageIcon from "@mui/icons-material/Storage";
import { latinToCyrillic } from "../tip/add/Components/lotin";
import { useRouter, usePathname } from "next/navigation";

export default function MenuBar2() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    // { path: "/umumiy", label: "Бригада умумий ҳисобот", icon: <DonutSmallIcon /> },
    // { path: "/main", label: "батальон умумий ҳисобот", icon: <DnsIcon /> },
    { path: "/maxsus", label: "Бригада ҳисобот", icon: <TokenIcon /> },
    { path: "/otchot", label: "батальон ҳисобот", icon: <StorageIcon /> },
  ];

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isInitialLoad, setIsInitialLoad] = React.useState(true);

  // Synchronize the menu's open state with the URL path only on initial load
  React.useEffect(() => {
    if (isInitialLoad) {
      const isPathMatched = menuItems.some((item) => pathname === item.path);
      setIsMenuOpen(isPathMatched);
      setIsInitialLoad(false);
    }
  }, [pathname, menuItems, isInitialLoad]);

  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="w-full">
      <Button
        id="hisobot-button"
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
        onClick={handleMenuClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {latinToCyrillic("Hisobot")}
      </Button>
      <div className="flex flex-col gap-4">
        {isMenuOpen && (
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
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  {e.label}
                </span>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

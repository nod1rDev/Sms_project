"use client";
import { UpdateAuth, UpdateAuth2, getAuth } from "@/app/Api/Apis";
import { IconButton } from "@mui/material";
import React from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useSelector, useDispatch } from "react-redux";
import { alertChange, setModalShaxsiy } from "@/app/Redux/ShaxsiySlice";
import EditModal from "./EditModal";
import Users from "./Users";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import { changeAdminStatuss } from "@/app/Redux/AuthSlice";

function Shaxsiy() {
  const [userData, setUserData] = React.useState<any>();
  const JWT = useSelector((state: any) => state.auth.JWT);
  const [value, setValue] = React.useState<any>({
    username: null,
    oldPassword: null,
    newPassword: null,
  });

  const getUser = async () => {
    const res = await getAuth(JWT);
    dispatch(changeAdminStatuss(res.data.adminstatus));
    setUserData(res.data);
  };

  React.useEffect(() => {
    getUser();
  }, []);
  const dispatch = useDispatch();

  const updateAuth = async (valuee: any) => {
    const res = await UpdateAuth(JWT, valuee);
    if (res.success) {
      handleClose();
      setValue({ username: null, oldPassword: null, newPassword: null });
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Parol tahrirlandi"),
          status: "success",
        })
      );
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic(res.message),
          status: "error",
        })
      );
    }
  };
  const open = useSelector((s: any) => s.shax.modal);

  const updateAuth2 = async (valuee: any) => {
    const res = await UpdateAuth2(JWT, valuee, open.id);
    if (res.success) {
      handleClose();
      setValue({ username: null, oldPassword: null, newPassword: null });
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Parol tahrirlandi"),
          status: "success",
        })
      );
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic(res.message),
          status: "error",
        })
      );
    }
  };
  const adminS = useSelector((s: any) => s.auth.admin);
  const handleSubmit = () => {
    !adminS
      ? updateAuth({
          username: value.username,
          oldPassword: value.oldPassword,
          newPassword: value.newPassword,
        })
      : updateAuth({
          oldPassword: value.oldPassword,
          newPassword: value.newPassword,
        });

    setTimeout(() => getUser(), 500);
  };
  const handleSubmit2 = () => {
    console.log(value);

    updateAuth2({
      oldPassword: value.oldPassword,
      newPassword: value.newPassword,
    });
  };

  const handleClose = () => {
    dispatch(setModalShaxsiy(false));
  };

  return (
    <div className="px-6 py-8  bg-blue-50 min-h-screen">
      <h1 className="font-bold text-[40px] mb-6 text-blue-800">
        {latinToCyrillic("Shaxsiy ma'lumotlar")}
      </h1>
      <div className="flex w-full justify-between items-start gap-6">
        <div className="flex rounded-lg relative w-[50%] bg-white shadow-lg px-8 py-6 gap-4 flex-col border border-blue-200">
          <div className="absolute top-2 right-2">
            <IconButton
              onClick={() => dispatch(setModalShaxsiy(true))}
              aria-label="delete"
              size="large"
            >
              <AppRegistrationIcon style={{ color: "#1E3A8A" }} fontSize="inherit" />
            </IconButton>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="font-bold text-[32px] text-blue-700">
              {latinToCyrillic("Ish profilingiz nomi:")}
            </h1>
            <span className="text-slate-600 font-bold text-[28px]">
              {userData && userData.username}
            </span>
          </div>
        </div>

        {userData && userData.adminstatus ? <Users /> : null}
      </div>
      <EditModal
        isUser={userData && userData.adminstatus}
        setValue={setValue}
        value={value}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    </div>
  );
}

export default Shaxsiy;

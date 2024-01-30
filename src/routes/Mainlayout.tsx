import { Link } from "react-router-dom";
import homelogo from "../assets/home.png";
import { MessagesSquare } from "lucide-react";
import { LogOut } from "lucide-react";
import { Search } from "lucide-react";
import { MapPin } from "lucide-react";
import { Bell } from "lucide-react";
import { UserContext } from "../context/ContextProvider";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Mainlayout = () => {
  const { userData, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (userData.isLoggedIn == false) {
    return <Navigate to={"/login"} />;
  }

  const logoutHandler = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <div className="w-full h-full items-center ">
      <div className="w-full h-full flex">
        <div className="w-1/6 h-screen py-4 bg-blue-900 justify-between flex flex-col items-center">
          <div className="w-full h-30 flex flex-col space-y-5 items-center">
            <div className="w-full flex items-center space-x-1 justify-center">
              <div>
                <img src={homelogo} alt="chat-home_image" className="w-5 h-5" />
              </div>
              <h2>
                <Link
                  className="text-xl text-white font-normal leading-relaxed"
                  to={"/"}
                >
                  Home
                </Link>
              </h2>
            </div>

            {/* Messages Button */}
            <div className="h-full w-full px-4">
              <button
                className="bg-blue-700 px-4 w-full h-10 items-center justify-center flex gap-2 rounded-md"
                type="button"
              >
                <MessagesSquare size={15} color="#fff" />
                <h4 className="text-base font-normal text-white">Messages</h4>
              </button>
            </div>
          </div>

          {/* Logout Handler */}
          <div className="h-20 w-full px-4">
            <button
              className="bg-home px-4 w-full h-10 items-center justify-center flex gap-2 rounded-md"
              type="button"
              onClick={logoutHandler}
            >
              <LogOut size={15} color="red" />
              <h4 className="text-base font-normal text-red-500">Log out</h4>
            </button>
          </div>
        </div>

        {/* Top layer */}
        <div className="w-5/6 flex flex-col">
          <div className="w-full h-28 py-1 px-8 flex items-center self-start justify-between">
            <div className="relative w-80 h-12 px-2 flex items-center border border-slate-300 rounded-lg justify-between">
              <input
                className="relative w-32 flex space-x-2 border-none h-10 focus:outline-none px-4 text-xs"
                type="text"
                placeholder="Search for house"
              />
              <Search color="#cccccc" size={14} className="absolute" />
              <hr className="w-[1px] h-6 bg-slate-400" />
              <input
                className="relative w-32 text-xs flex space-x-2 border-none h-10 focus:outline-none px-4"
                type="text"
                placeholder="location"
              />
              <MapPin color="#cccccc" size={17} className="absolute left-64" />
            </div>

            <div className="w-60 flex space-x-4 items-center ">
              <div className="border-slate-300 rounded-lg h-10 w-10 border flex items-center justify-center">
                <Bell color="#000" size={20} className="self-center" />
              </div>

              <div className="border border-slate-300 rounded-lg flex items-center w-48 h-full py-2 justify-center">
                <p className="text-sm leading-relaxed text-slate-500">
                  {userData.user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Messages UI */}
          <div className="flex w-full h-full items-center justify-center">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainlayout;

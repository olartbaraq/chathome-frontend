import homelogo from "../assets/home.png";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/ContextProvider";
import { useContext } from "react";

const Homepage = () => {
  const { userData } = useContext(UserContext);

  if (userData.isLoggedIn == true) {
    return <Navigate to={"/mainpage"} />;
  }

  return (
    <div className="h-screen w-screen flex p-20 items-center justify-center">
      <div className="border text-center border-gray-500 rounded-xl max-w-max p-10 items-center flex flex-col justify-center">
        <img
          className="w-fit h-fit self-center"
          src={homelogo}
          alt="chat-home_image"
        />
        <h2 className="text-3xl self-center text-black font-bold leading-relaxed">
          Welcome to CHATHOME
        </h2>
        <Link to={"login"} className="text-blue-500 texet-3xl font-semibold">
          Continue to Login
        </Link>
      </div>
    </div>
  );
};

export default Homepage;

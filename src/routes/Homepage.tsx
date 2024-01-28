import homelogo from "../assets/home.png";
import { Link } from "react-router-dom";
const Homepage = () => {
  return (
    <div className="border text-center border-gray-500 rounded-xl w-full p-32 overflow-x-hidden m-10">
      <img
        className="w-full h-full self-center"
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
  );
};

export default Homepage;

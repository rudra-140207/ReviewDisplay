import axios from "axios";
import { useNavigate } from "react-router-dom";
import kiet2 from "../assets/kiet2.jpg";
import logo from "../assets/logo.png";

const Home = () => {
  const navigate = useNavigate();
  const wakeUpCall = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_BACKEND_URL);
      console.log(res.data);
    } catch (err) {
      console.error("Backend wake-up failed:", err);
    }
  };

  wakeUpCall();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-gray-800 px-4">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${kiet2})` }}
      ></div>
      <div className="absolute inset-0 bg-white/60 z-0"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl text-center px-4">
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="w-36 h-20 md:w-72 md:h-24 mb-6"
        />

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
          Cherished Memories & Words of Gratitude
        </h1>

        <p className="text-base sm:text-lg md:text-xl mb-8">
        Hanuman knew not his strength until Jamvant spoke.<br></br>Students need the same — a mentor who reveals what's within.<br></br> That's how we reach 100% placement, one belief at a time
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            onClick={() => handleClick("/testimonial")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300 w-full sm:w-auto"
          >
            Send Testimonial
          </button>
          <button
            onClick={() => handleClick("/list")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300 w-full sm:w-auto"
          >
            See All Testimonial
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
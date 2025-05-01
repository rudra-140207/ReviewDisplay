import axios from "axios";
import { useNavigate } from "react-router-dom";
import kiet1 from "../assets/kiet1.png";
import kiet2 from "../assets/kiet2.jpg";
import hanuman from "../assets/hanuman.jpg";
import logo from "../assets/logo.png";

const Home = () => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const wakeUpCall = async () => {
    try {
      const res = await axios.get(`${backendUrl}`);
      console.log(res.data);
    } catch (err) {
      console.error("Backend wake-up failed:", err);
    }
  };

  wakeUpCall();

  const handleClick = (path) => {
    navigate(path);
  };

// return (
//     <div className="relative min-h-screen flex flex-col items-center justify-center text-gray-800 px-4 overflow-hidden">
//   {/* Background Image */}
//   <div
//     className="absolute inset-0 bg-cover bg-center z-[-10]"
//     style={{ backgroundImage: `url(${kiet2})` }}
//   ></div>

//   <div className="absolute inset-0 bg-white/60 z-0"></div>

//   <div className="absolute bottom-4 right-4 w-110 h-60 z-10 rounded-xl overflow-hidden shadow-lg hidden md:block">
//     <iframe
//       className="w-full h-full"
//       src="https://www.youtube.com/embed/4RWoeEV9O8Y?autoplay=1&loop=1&playlist=4RWoeEV9O8Y&controls=0&modestbranding=1&showinfo=0"
//       title="YouTube floating"
//       frameBorder="0"
//       allow="autoplay"
//       allowFullScreen
//     ></iframe>
//   </div>

//   <div className="absolute bottom-4 left-4 w-100 h-100 z-10 rounded-xl overflow-hidden shadow-lg hidden md:block">
//     <img
//       src={hanuman}
//       alt="KIET Photo"
//       className="w-full h-full object-cover rounded-xl"
//     />
//   </div>

//   {/* Main Content */}
//   <div className="relative z-10 flex flex-col items-center max-w-2xl text-center px-4">
//     <img src={logo} alt="Logo" className="w-36 h-20 md:w-72 md:h-24 mb-6" />

//     <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
//       Cherished Memories & Words of Gratitude
//     </h1>

//     <p className="text-base sm:text-lg md:text-xl mb-8">
//       Hanuman knew not his strength until Jamvant spoke.<br />
//       Students need the same — a mentor who reveals what's within.<br />
//       That's how we reach 100% placement, one belief at a time
//     </p>

//     <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
//       <button
//         onClick={() => handleClick("/testimonial")}
//         className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300 w-full sm:w-auto"
//       >
//         Send Testimonial
//       </button>
//       <button
//         onClick={() => handleClick("/list")}
//         className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300 w-full sm:w-auto"
//       >
//         See All Testimonial
//       </button>
//     </div>
//   </div>
// </div>

//   );
// };
// export default Home;



return (
<div className="relative min-h-screen flex flex-col items-center justify-center text-gray-800 px-4 overflow-hidden">
      <div className="absolute inset-0 z-[-10] overflow-hidden">
        <iframe
          className="w-full h-full object-cover"
          src="https://www.youtube.com/embed/4RWoeEV9O8Y?autoplay=1&loop=1&playlist=4RWoeEV9O8Y&controls=0&modestbranding=0&showinfo=0"
          title="YouTube video background"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </div>

      <div className="absolute inset-0 bg-white/40 z-0"></div>

      <div className="relative z-10 flex flex-col items-center max-w-2xl text-center px-4">
        <img src={logo} alt="Logo" className="w-36 h-20 md:w-72 md:h-24 mb-6" />

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
          Cherished Memories & Words of Gratitude
        </h1>

        <p className="text-base sm:text-lg md:text-xl mb-8">
          Hanuman knew not his strength until Jamvant spoke.
          <br />
          Students need the same — a mentor who reveals what's within.
          <br /> That's how we reach 100% placement, one belief at a time
        </p>

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


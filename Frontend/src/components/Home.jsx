import axios from "axios";
import { useNavigate } from "react-router-dom";
import kiet2 from "../assets/kiet2.jpg";
import logo from "../assets/logo.png";
import { useRef, useState, useEffect } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const iframeRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [guideVisible, setGuideVisible] = useState(true); // State for showing the guide

  const toggleMute = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: muted ? "unMute" : "mute",
        args: [],
      }),
      "*"
    );

    setMuted(!muted);
    setGuideVisible(false); // Hide guide when user clicks the button
  };

  useEffect(() => {
    const wakeUpCall = async () => {
      try {
        const res = await axios.get(`${backendUrl}`);
        console.log(res.data);
      } catch (err) {
        console.error("Backend wake-up failed:", err);
      }
    };
    wakeUpCall();
  }, [backendUrl]);

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-gray-800 px-4 overflow-hidden">
      {/* Background Image Always Visible */}
      <div
        className="absolute inset-0 z-[-20] bg-cover bg-center"
        style={{ backgroundImage: `url(${kiet2})` }}
      ></div>

      {/* YouTube Video Only on Medium+ Screens */}
      <div className="hidden sm:block absolute inset-0 z-[-10] overflow-hidden">
        <iframe
          ref={iframeRef}
          className="w-full h-full object-cover"
          src="https://www.youtube.com/embed/4RWoeEV9O8Y?autoplay=1&mute=1&loop=1&playlist=4RWoeEV9O8Y&controls=0&modestbranding=1&showinfo=0&enablejsapi=1"
          title="YouTube video background"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/30 z-0" />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl text-center px-4">
        <img src={logo} alt="Logo" className="w-36 h-20 md:w-72 md:h-24 mb-6" />

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
          Cherished Memories & Words of Gratitude
        </h1>

        <p className="text-base sm:text-lg md:text-xl mb-8">
          Hanuman knew not his strength until Jamvant spoke.
          <br />
          Students need the same — a mentor who reveals what's within.
          <br />
          That's how we reach 100% placement, one belief at a time.
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

      {/* Mute/Unmute Button Only on sm+ screens */}
      <button
        onClick={toggleMute}
        className={`${
          guideVisible ? "border-4 border-yellow-500" : ""
        } hidden sm:flex absolute bottom-4 left-4 z-20 bg-white/70 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300`}
        aria-label="Toggle sound"
      >
        {muted ? (
          <FaVolumeMute className="text-2xl text-indigo-700" />
        ) : (
          <FaVolumeUp className="text-2xl text-indigo-700" />
        )}
      </button>

      {/* Tooltip Guide for the Mute/Unmute Button */}
      {guideVisible && (
        <div className="hidden sm:flex absolute bottom-16 left-12 z-30 bg-black text-white p-3 rounded-lg shadow-lg">
          <p className="text-sm">Click here to mute/unmute the sound</p>
        </div>
      )}
    </div>
  );
};

export default Home;

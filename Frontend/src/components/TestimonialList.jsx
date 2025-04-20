import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";
import { IoArrowBack } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import kiet2 from "../assets/kiet2.jpg";

const TestimonialsList = () => {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordEntered, setPasswordEntered] = useState(false);
  const [password, setPassword] = useState("");
  const [mentorFilter, setMentorFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [nameSearch, setNameSearch] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/testinomial`);
        setTestimonials(response.data);
        setFilteredTestimonials(response.data);
      } catch (error) {
        toast.error("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };

    if (passwordEntered) fetchTestimonials();
  }, [passwordEntered]);

  useEffect(() => {
    let filtered = testimonials;

    if (mentorFilter) {
      filtered = filtered.filter(t =>
        t.mentor?.toLowerCase().includes(mentorFilter.toLowerCase())
      );
    }

    if (branchFilter) {
      filtered = filtered.filter(t =>
        t.branch?.toLowerCase().includes(branchFilter.toLowerCase())
      );
    }

    if (nameSearch) {
      filtered = filtered.filter(t =>
        t.name?.toLowerCase().includes(nameSearch.toLowerCase())
      );
    }

    setFilteredTestimonials(filtered);
  }, [mentorFilter, branchFilter, nameSearch, testimonials]);

  const openModal = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTestimonial(null);
    setIsModalOpen(false);
  };

  const handlePasswordSubmit = () => {
    if (password === "Rudra07" || password === "kieteee") {
      setPasswordEntered(true);
    } else {
      toast.error("Incorrect Password");
    }
  };

  const handlePasswordKeyPress = (e) => {
    if (e.key === "Enter") handlePasswordSubmit();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center text-gray-800 px-4 pt-12 pb-20">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${kiet2})` }}
      ></div>
      <div className="absolute inset-0 bg-white/60 z-0"></div>

      <ToastContainer />

      {/* Back Arrow */}
      {passwordEntered && (
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 z-20 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-lg hover:bg-white transition"
        >
          <IoArrowBack className="text-2xl text-indigo-700" />
        </button>
      )}

      {/* Password Prompt */}
      {!passwordEntered && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-30">
          <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4 text-center">
              Enter Password
            </h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handlePasswordKeyPress}
              placeholder="Enter Password"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            />
            <button
              onClick={handlePasswordSubmit}
              className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {passwordEntered && (
        <>
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-indigo-800 mb-8 z-10">
            Testimonials from Our Happy Students
          </h1>

          {/* Filters */}
          <div className="z-10 w-full max-w-4xl mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by Name"
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
              className="p-3 font-bold rounded-lg border border-gray-500"
            />
            <input
              type="text"
              placeholder="Filter by Mentor"
              value={mentorFilter}
              onChange={(e) => setMentorFilter(e.target.value)}
              className="p-3 font-bold rounded-lg border border-gray-500"
            />
            {/* <input
              type="text"
              placeholder="Filter by Branch"
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="p-3 font-bold rounded-lg border border-gray-500"
            /> */}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 z-10 w-full max-w-6xl">
            {loading ? (
              <div className="col-span-full flex justify-center py-10">
                <ImSpinner2 className="animate-spin text-indigo-600 text-4xl" />
              </div>
            ) : (
              filteredTestimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  onClick={() => openModal(testimonial)}
                  className="bg-white rounded-xl shadow-lg p-4 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="flex justify-center mb-3">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-indigo-400"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-indigo-700 text-center">
                    {testimonial.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 text-center">{testimonial.branch}</p>
                  <p className="mt-2 text-gray-700 text-center text-sm">
                    {testimonial.message.substring(0, 100)}...
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Modal */}
          {isModalOpen && selectedTestimonial && (
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
              <div className="bg-white rounded-xl p-6 w-full max-w-lg relative overflow-y-auto max-h-[90vh]">
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-4 text-3xl text-indigo-600 hover:text-indigo-800"
                >
                  &times;
                </button>

                <div className="flex justify-center mb-4 mt-6">
                  <img
                    src={selectedTestimonial.photo}
                    alt="testimonial"
                    className="w-28 h-28 rounded-full object-cover border-4 border-indigo-400"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-indigo-700 text-center">
                  {selectedTestimonial.name}
                </h3>
                <p className="text-sm text-gray-500 text-center mb-4">
                  {selectedTestimonial.branch}
                </p>

                <p className="text-gray-700 text-justify text-base whitespace-pre-wrap">
                  {selectedTestimonial.message}
                </p>

                {selectedTestimonial.remark && (
                  <div className="mt-4 bg-gray-100 p-3 rounded-lg text-sm">
                    <strong>Remark:</strong> {selectedTestimonial.remark}
                  </div>
                )}

                <div className="mt-4 bg-gray-50 p-3 rounded-lg text-sm">
                  <p><strong>Roll No:</strong> {selectedTestimonial.rollNo}</p>
                  <p className="mt-2"><strong>Mentor:</strong> {selectedTestimonial.mentor}</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TestimonialsList;

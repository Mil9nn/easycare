import Chatbot from "@/components/chat/Chatbot";
import DoctorCard from "@/components/doctor/DoctorCard";
import { useAdminStore } from "@/hooks/useAdminStore";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { useRef } from "react";

const Home = () => {
  const doctors = useAdminStore((state) => state.doctors);
  const gettingDoctors = useAdminStore((state) => state.gettingDoctors);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -clientWidth : clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-[50%] h-full bg-blue-500/10"></div>
        <div className="absolute bottom-0 right-0 w-[50%] h-full bg-pink-500/10"></div>

        {/* Content Wrapper */}
        <div className="relative max-w-7xl mx-auto px-6 py-5 space-y-16">
          <div className="flex flex-col items-center gap-1 justify-center">
            <h1 className="text-3xl font-extrabold tracking-tight leading-tight">
              Welcome to{" "}
              <span className="uppercase text-blue-400">Harmony Care</span>
            </h1>
            <p className="text-lg text-zinc-700">
              Where compassion meets innovation
            </p>
            <p className="italic text-zinc-800">“Your health, our mission”</p>
          </div>

          <div className="text-center space-y-6"></div>

          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Healthcare made <span className="text-blue-400">Simple</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Book, manage and track your appointments anytime, anywhere.
            </p>
            <div>
              <button className="relative group z-0 overflow-hidden px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 cursor-pointer">
                <span className="relative z-10">Book an Appointment</span>
                <span className="absolute top-0 left-0 translate-y-full z-5 group-hover:translate-y-0 transition-transform duration-1000 ease-in-out w-full h-full bg-purple-500"></span>
              </button>
            </div>
          </div>

          {/* About & Why Choose Us */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-5">
              <h2 className="text-3xl font-bold">About Us</h2>
              <p className="text-gray-900 leading-relaxed">
                Founded with the vision to make healthcare more accessible,
                Harmony Care Hospital brings together advanced medical expertise
                and patient-first care. With specialists across multiple fields,
                digital medical records, and a seamless appointment system, we
                ensure your journey to wellness is smooth and stress-free.
              </p>
            </div>

            <div className="space-y-5">
              <h2 className="text-3xl font-bold">Why Choose Us</h2>
              <ul className="space-y-3 text-gray-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">✔</span> Trusted doctors with
                  10+ years average experience
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">✔</span> Multi-specialty care
                  under one roof
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">✔</span> Secure patient data &
                  digital ID verification
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">✔</span> Flexible scheduling
                  and easy cancellations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-[#F1FAEE] bg-gradient-to-br from-[#F1FAEE] via-white to-[#A8DADC]/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="p-8 rounded-2xl bg-white shadow hover:shadow-lg transition-all">
            <img
              src="/assets/icons/doctor.svg"
              alt="Doctors"
              className="mx-auto w-12 h-12 mb-4"
            />
            <h3 className="text-xl font-semibold text-[#1D3557]">
              Qualified Doctors
            </h3>
            <p className="mt-2 text-gray-600">
              Book a consultation with certified healthcare professionals across
              specialties.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white shadow hover:shadow-lg transition-all">
            <img
              src="/assets/icons/appointment.svg"
              alt="Appointments"
              className="mx-auto w-12 h-12 mb-4"
            />
            <h3 className="text-xl font-semibold text-[#1D3557]">
              Easy Appointments
            </h3>
            <p className="mt-2 text-gray-600">
              Book, reschedule or cancel at your convenience.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white shadow hover:shadow-lg transition-all">
            <img
              src="/assets/icons/records.svg"
              alt="Records"
              className="mx-auto w-12 h-12 mb-4"
            />
            <h3 className="text-xl font-semibold text-[#1D3557]">
              Health Records
            </h3>
            <p className="mt-2 text-gray-600">
              Keep your medical history safe, accessible, and organized.
            </p>
          </div>
        </div>
      </section>

      <div className="fixed bottom-5 right-5 z-50 w-full max-w-sm sm:max-w-lg">
        <Chatbot />
      </div>
      <section className="max-w-7xl mx-auto p-10">
        <h1 className="text-2xl font-bold mb-1">Doctors</h1>
        <p className="text-gray-600 text-sm max-w-lg italic mb-5">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </p>
        {gettingDoctors ? (
          <div className="flex items-center text-teal-400 justify-center gap-1">
            <Loader className="animate-spin" />
            <p className="text-center text-sm text-gray-500">
              Loading doctors...
            </p>
          </div>
        ) : (
          <div className="relative px-4">
            {/* Left Arrow */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md rounded-full p-2 z-10"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory remove-scrollbar p-5"
            >
              {doctors?.slice(0, 5).map((doctor) => (
                <div key={doctor._id} className="snap-start shrink-0 w-72">
                  <DoctorCard
                    name={doctor.fullName}
                    specialization={doctor.specialization}
                    imageSrc={doctor.profileImage}
                    className="bg-white shadow-lg rounded-2xl hover:scale-[1.02] transition-transform"
                    doctorId={doctor._id}
                    isActive={doctor.isActive}
                  />
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md rounded-full p-2 z-10"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;

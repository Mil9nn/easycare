import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div className="relative">
      {/* HERO SECTION */}
      <section className="relative min-h-[calc(100vh-65px)] bg-red-100 flex flex-col justify-center items-center overflow-hidden ">
        <div className="absolute top-0 left-0 w-[50%] h-full bg-gradient-to-b from-blue-200/30 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[50%] h-full bg-gradient-to-t from-rose-200/30 to-transparent blur-3xl"></div>

        <div className="relative text-center px-6 py-20 space-y-8 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-gray-900">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-rose-500">
              EasyCare
            </span>
          </h1>
          <p className="text-lg text-zinc-700 max-w-2xl mx-auto">
            Appointment management system
          </p>
          <Link to="/doctors">
            <button className="relative group z-0 overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-500 to-rose-500 hover:from-blue-600 hover:to-rose-600 text-white font-semibold rounded-full shadow-lg transition-all duration-500">
              <span className="relative z-10">Book an Appointment</span>
              <span className="absolute top-0 left-0 translate-y-full z-0 group-hover:translate-y-0 transition-transform duration-1000 ease-in-out w-full h-full bg-rose-600"></span>
            </button>
          </Link>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-gray-900">About Us</h2>
          <p className="text-gray-700 leading-relaxed">
            <p>
              EasyCare is a hospital appointment management system designed to
              streamline your healthcare visits. Book appointments with
              available doctors, manage your medical records, and track your
              appointment history - all in one place.
            </p>
          </p>
        </div>

        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✔</span> Browse doctors by specialization
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✔</span> View real-time doctor availability
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✔</span> Secure patient data management
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✔</span> Easy appointment booking and rescheduling
            </li>
          </ul>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Find Doctors",
              desc: "Book consultations with certified healthcare professionals across specialties.",
              img: "/assets/assets_frontend/qualified_doctor.jpg",
            },
            {
              title: "Quick Booking",
              desc: "Book, reschedule, or cancel at your convenience.",
              img: "/assets/assets_frontend/book_consultation.jpg",
            },
            {
              title: "Track Records",
              desc: "Keep your medical history safe, accessible, and organized.",
              img: "/assets/assets_frontend/health_records.jpg",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="rounded-2xl"
            >
              <img
                src={feature.img}
                alt={feature.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

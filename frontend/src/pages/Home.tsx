import Chatbot from "@/components/chat/Chatbot";
import DoctorCard from "@/components/DoctorCard";
import SpecializationButton from "@/components/SpecializationButton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAdminStore } from "@/hooks/useAdminStore";
import { Loader } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const doctors = useAdminStore((state) => state.doctors);
  const gettingDoctors = useAdminStore((state) => state.gettingDoctors);

  const [selectedSpecialization, setSelectedSpecialization] = useState('');

  const filteredDoctors = selectedSpecialization ? doctors?.filter((doctor) => (
    doctor.specialization.toLowerCase() === selectedSpecialization.toLowerCase()
  )) : doctors;

  return (
    <div className="p-10">
      <div className="fixed bottom-5 right-5 z-50 w-full max-w-sm sm:max-w-md">
        <Chatbot />
      </div>
      <section className="max-w-6xl mx-auto mb-10">
        <h1 className="text-2xl text-center font-bold mb-1 tracking-wide">Find by Speciality</h1>
        <p className="text-gray-600 text-sm max-w-lg mx-auto italic text-center mb-5">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </p>
        <div>
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <ScrollArea className="w-full max-w-2xl mx-auto rounded-md whitespace-nowrap">
              <div className="flex w-max space-x-4 p-4">
                <SpecializationButton onClick={() => setSelectedSpecialization("dermatology")}
                  iconSrc="/assets/specializations/Dermatologist.svg"
                  specialization="Dermatologist"
                />
                <SpecializationButton onClick={() => setSelectedSpecialization("gastroenterology")}
                  iconSrc="/assets/specializations/Gastroenterologist.svg"
                  specialization="Gastroenterologist"
                />
                <SpecializationButton onClick={() => setSelectedSpecialization("general_physician")}
                  iconSrc="/assets/specializations/General_physician.svg"
                  specialization="General_physician"
                />
                <SpecializationButton onClick={() => setSelectedSpecialization("gynecology")}
                  iconSrc="/assets/specializations/Gynecologist.svg"
                  specialization="Gynecologist"
                />
                <SpecializationButton onClick={() => setSelectedSpecialization("neurology")}
                  iconSrc="/assets/specializations/Neurologist.svg"
                  specialization="Neurologist"
                />
                <SpecializationButton onClick={() => setSelectedSpecialization("pediatrics")}
                  iconSrc="/assets/specializations/Pediatricians.svg"
                  specialization="Pediatrician"
                />
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-1">Available Doctors</h1>
        <p className="text-gray-600 mb-5">
          Find the best doctors available for your health needs.
        </p>
        {gettingDoctors ? <div className="flex items-center text-teal-400 justify-center gap-1">
          <Loader className="animate-spin" />
          <p className="text-center text-sm text-gray-500">Loading doctors...</p>
        </div> : (<div className="grid lg:grid-cols-5 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-5 p-1 max-w-6xl mx-auto">
          {filteredDoctors?.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              name={doctor.fullName}
              specialization={doctor.specialization}
              imageSrc={doctor.profileImage}
              className="bg-teal-200"
            />
          ))}
        </div>)}
      </section>
    </div>
  );
};

export default Home;

"use client";

import { FaUserPlus, FaBookOpen, FaChartLine } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus size={40} />,
      title: "Sign Up & Role",
      description: "Sign Up as a student. Instructor or Admin role will be selected after approval"
    },
    {
      icon: <FaBookOpen size={40} />,
      title: "Access Courses & Tools",
      description: "Browse courses, generate AI quizzes and visualize your performance."
    },
    {
      icon: <FaChartLine size={40} />,
      title: "Track Your Progress",
      description: "Track your performance find you lackings and improve learning outcomes."
    }
  ];

  return (
    <section className="container mx-auto px-4 pb-20 lg:pt-0 pt-10 ">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        How It Works
      </h2>

      <div className="grid md:grid-cols-3 gap-12">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-full border border-current">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="text-base">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;

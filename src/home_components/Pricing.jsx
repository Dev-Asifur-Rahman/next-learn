import Link from "next/link";
import React from "react";

const Pricing = () => {
  const plans = [
    {
      title: "Basic",
      price: "$0/mo",
      badge: "Free",
      features: [
        "Everything in Standard",
        "AI quiz maker ",
        "AI summarization",
        "Enroll up to 2 courses",
      ],
      disabledFeatures: [
        "Download quizzes as PDF",
        "Priority support",
        "Real-time collaboration",
      ],
      path: "#",
      // /auth/login
      buttonText: "Get Started",
      buttonClass:
        "btn-outline hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black",
    },
    {
      title: "Standard",
      price: "$9.99/mo",
      badge: "Most Popular",
      features: [
        "Everything in Standard",
        "AI quiz maker ",
        "AI summarization",
        "Unlimited course enrollments",
      ],
      disabledFeatures: [
        "Download quizzes as PDF",
        "Priority support",
        "Real-time collaboration",
      ],
      path: "#",
      buttonText: "Subscribe",
      buttonClass:
        "btn-dash hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black",
    },
    {
      title: "Premium",
      price: "$29/mo",
      badge: "Best Value",
      features: [
        "Everything in Standard",
        "AI quiz maker ",
        "AI summarization",
        "Unlimited course enrollments",
        "Download quizzes as PDF",
        "Priority support",
        "Real-time collaboration",
      ],
      path: "#",
      disabledFeatures: [],
      buttonText: "Subscribe",
      buttonClass:
        "btn-dash hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-10">
        Choose Your Plan
      </h1>
      <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-6 md:gap-8">
        {plans.map((plan) => (
          <div
            key={plan.title}
            className="card bg-base-100 shadow-xl
                       flex-1 max-w-sm min-w-[260px] mx-auto mb-8
                       sm:mb-0
                       hover:scale-[1.03] transition-transform duration-300"
          >
            <div className="card-body">
              <span className="badge badge-xs badge-warning">{plan.badge}</span>
              <div className="flex justify-between items-center mt-2">
                <h2 className="text-3xl font-bold">{plan.title}</h2>
                <span className="text-xl">{plan.price}</span>
              </div>
              <ul className="mt-6 flex flex-col gap-2 text-xs">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 mr-2 text-success flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.disabledFeatures.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center opacity-50 line-through"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 mr-2 text-base-content/50 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link href={plan.path}>
                  <button className={`btn w-full ${plan.buttonClass}`}>
                    {plan.buttonText}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;

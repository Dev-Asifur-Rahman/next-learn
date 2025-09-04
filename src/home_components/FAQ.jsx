import React from "react";
import LottieComponent from "@/components/LottieComponent";
import faq from "@/lottie/faq.json";

const FAQ = () => {
  return (
    <section className="w-full mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Frequently Asked Questions
      </h2>
      <section className="flex flex-col-reverse md:flex-row lg:flex-row justify-between items-center w-full">
        <div className="space-y-4 lg:w-1/2 md:w-1/2 w-full">
          <div className="collapse bg-base-100 border border-base-300 dark:border-white">
            <input type="radio" name="faq-accordion" defaultChecked />
            <div className="collapse-title font-semibold">
              What is NextLearn?
            </div>
            <div className="collapse-content text-sm">
              <p>
                NextLearn is an AI-powered learning platform that offers
                personalized study materials, quizzes, and interactive courses
                to enhance your learning experience.
              </p>
            </div>
          </div>

          <div className="collapse bg-base-100 border border-base-300 dark:border-white">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold">
              How does AI generate quizzes on NextLearn?
            </div>
            <div className="collapse-content text-sm">
              <p>
                Our AI analyzes course content to create relevant, accurate, and
                varied quiz questions that strengthen your understanding
                effectively.
              </p>
            </div>
          </div>

          <div className="collapse bg-base-100 border border-base-300 dark:border-white">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold">
              Is NextLearn free to use?
            </div>
            <div className="collapse-content text-sm">
              <p>
                NextLearn offers both free and premium plans. You can access
                basic courses for free, while premium plans unlock advanced
                features and exclusive content.
              </p>
            </div>
          </div>

          <div className="collapse bg-base-100 border border-base-300 dark:border-white">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title font-semibold">
              How can I become an instructor on NextLearn?
            </div>
            <div className="collapse-content text-sm">
              <p>
                To become an instructor, sign up and apply through the
                instructor dashboard. Our team will review your profile and
                approve eligible applications quickly.
              </p>
            </div>
          </div>
        </div>
        <div className=" w-full mb-6 lg:mb-0 md:mb-0 lg:w-1/2 md:w-1/2">
          <LottieComponent animation={faq}></LottieComponent>
        </div>
      </section>
    </section>
  );
};

export default FAQ;

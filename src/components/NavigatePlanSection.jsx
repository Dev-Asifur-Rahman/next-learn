"use client";

const NavigatePlanSection = () => {
  const navigatePlanSection = () => {
    const planSection = document.getElementById('plan-section')
    planSection.scrollIntoView({behavior:"smooth"})
  };
  return (
    <button
      onClick={navigatePlanSection}
      className="bg-black dark:bg-transparent dark:border text-white w-[180px] py-3 rounded-full font-semibold dark:hover:text-black dark:hover:bg-white transition cursor-pointer"
    >
      Get Started
    </button>
  );
};

export default NavigatePlanSection;

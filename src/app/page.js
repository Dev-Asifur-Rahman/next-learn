import Hero from "@/home_components/Hero";
import HowItWorks from "@/home_components/HowItWorks";
import Testimonials from "@/home_components/Testimonials";

export default function Home() {
  return (
    <>
      <section className="w-full">
        <Hero></Hero>
        <HowItWorks></HowItWorks>
        <Testimonials></Testimonials>
      </section>
    </>
  );
}

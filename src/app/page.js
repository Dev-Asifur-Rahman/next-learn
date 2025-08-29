import FAQ from "@/home_components/FAQ";
import Hero from "@/home_components/Hero";
import HowItWorks from "@/home_components/HowItWorks";
import MapSection from "@/home_components/MapSection";
import Newsletter from "@/home_components/Newsletter";
import Pricing from "@/home_components/Pricing";
import Testimonials from "@/home_components/Testimonials";

export default function Home() {
  return (
    <>
      <section className="w-full scroll-smooth">
        <Hero></Hero>
        <HowItWorks></HowItWorks>
        <Pricing></Pricing>
        <FAQ></FAQ>
        <Testimonials></Testimonials>
        <Newsletter></Newsletter>
        <MapSection></MapSection>
      </section>
    </>
  );
}

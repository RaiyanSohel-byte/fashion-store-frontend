import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Hero from "@/components/home/Hero";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <WhyChooseUs />
      <Contact />
    </div>
  );
}

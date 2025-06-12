import Hero from "./Hero";
import Features from "./Features";
import FeaturesWithImage from "./FeaturesWithImage";
import Counter from "./Counter";
import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import Pricing from "./Pricing";
import Preview from "./Preview";

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <Preview />
      <FeaturesWithImage />
      <Counter />
      <Testimonials />
      <Pricing />
      <FAQ />
    </>
  );
};

export default Home;

import Banner from "@/components/blocks/banner";
import DetailsBlock from "@/components/blocks/details-block";
import Projects from "./projects";
import Testimonials from "@/components/blocks/testimonials";

export default function Home() {
  return (
    <div
      className={` min-h-[90vh] w-full`}
    >
      <Banner />
      <DetailsBlock />
      <Projects />
      <Testimonials />
    </div>
  );
}

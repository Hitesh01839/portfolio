import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Lab from "@/components/sections/Lab";
import Thinking from "@/components/sections/Thinking";
import Work from "@/components/sections/Work";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Work />
      <Lab />
      <Thinking />
      <Contact />
    </main>
  );
}

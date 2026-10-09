import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProductSections from "@/components/ProductSections";
import Image from "next/image";

export default function Home() {
  return (
    <div >    
      <Marquee></Marquee>
      <Hero></Hero>
       <ProductSections />
      </div>
  );
}

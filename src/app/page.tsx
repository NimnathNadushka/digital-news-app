import Image from "next/image";
import styles from "./page.module.css";
import Posts from "@/sections/Posts";
import Hero from "@/sections/Hero";

export default function Home() {
  return (
    <main id="main">
      
    <Hero />
    <Posts />

    </main>

  );
 
  ;
}

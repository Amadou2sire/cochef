import React from "react";

import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import MenuPreview from "../components/MenuPreview";
import EventsSection from "../components/EventsSection";
import ChefOfTheWeek from "../components/ChefOfTheWeek";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      
      <HeroSection />
      <FeaturesSection />
      <MenuPreview />
      <EventsSection />
      <ChefOfTheWeek />
      <AboutSection />
      <ContactSection />
      
    </main>
  );
}

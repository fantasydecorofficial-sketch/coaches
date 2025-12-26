import AnnouncementBanner from "@/components/landing/AnnouncementBanner";
import HeroSection from "@/components/landing/HeroSection";
import LearningStages from "@/components/landing/LearningStages";
import BonusSection from "@/components/landing/BonusSection";
import MeetInstructor from "@/components/landing/MeetInstructor";
import Testimonials from "@/components/landing/Testimonials";
import MoneyBackGuarantee from "@/components/landing/MoneyBackGuarantee";
import StickyBottomBar from "@/components/landing/StickyBottomBar";

import { useEffect } from "react";
import { api } from "@/lib/api";
import CustomFooter from "@/components/landing/CustomFooter";

const Index = () => {
  useEffect(() => {
    api.trackAnalytics('page_visit', { page: 'home' });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBanner />
      <HeroSection />
      <LearningStages />
      <BonusSection />
      <MeetInstructor />
      <Testimonials />
      <MoneyBackGuarantee />
      <StickyBottomBar />
      <CustomFooter />
    </div>
  );
};

export default Index;

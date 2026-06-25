// app/page.jsx
import React from 'react';
import BreakingSectionTop from '@/components/Homepage/BreakingSectionTop';
import FirstTopSection from '@/components/Homepage/FirstTopSection';
import BottomSlider from '@/components/Homepage/BottomSlider';
import TrendingSlider from '@/components/Homepage/TrendingSlider';
import VideoSection from '@/components/Homepage/VideoSection';
import ManoranjanSection from '@/components/Homepage/ManoranjanSection';
import RajyaSection from '@/components/Homepage/RajyaSection';
import CrimeSection from '@/components/Homepage/CrimeSection';
import PodcastSection from '@/components/Homepage/PodcastSection';
import SportsSection from '@/components/Homepage/SportsSection';
import DharmSection from '@/components/Homepage/DharmSection';
import TravelSection from '@/components/Homepage/TravelSection';
import WorldSection from '@/components/Homepage/WorldSection';
import { getAllHomepageData } from '@/lib/wordpress';

export default async function page() {
  const { 
    sports, 
    religious, 
    rasifal, 
    travel,
    jobEducation,
    goodNews,
    othersNews,
    world,
    allLatest
  } = await getAllHomepageData();

  // ✅ Combine travel data
  const allTravelData = [
    ...travel,
    ...jobEducation,
    ...goodNews,
    ...othersNews 
  ];

  return (
    <>
      <BreakingSectionTop />

      <TrendingSlider />
      
      <FirstTopSection />
      
      <SportsSection sportsData={sports} />
      
      <ManoranjanSection />
      <VideoSection />
      
      <DharmSection 
        religiousData={religious} 
        rasifalData={rasifal} 
      />
      
      {/* ✅ World Section - Ab data aa jayega */}
      <WorldSection worldData={world} />
      
      <RajyaSection />
      <PodcastSection />
      <CrimeSection />
      <BottomSlider sliderData={allLatest} />
      
      <TravelSection travelData={allTravelData} />
      
    </>
  );
}
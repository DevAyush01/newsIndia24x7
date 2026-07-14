// app/page.jsx - ✅ FIXED with breakingNews data

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
import { getAllHomepageData, getBreakingNews } from '@/lib/wordpress';
import TrendingSection from '@/components/Homepage/TrendingSection';
import WebStoriesSection from '@/components/Homepage/WebStoriesSection';
import WebsiteLowerBand from '@/components/Homepage/WebsiteLowerBand';
import BadiKhabre from '@/components/Homepage/BadiKhabre';

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

  // ✅ Fetch breaking news separately
  const breakingNews = await getBreakingNews(10);

  // ✅ Combine travel data
  const allTravelData = [
    ...travel,
    ...jobEducation,
    ...goodNews,
    ...othersNews 
  ];

  return (
    <>
      {/* ✅ Pass breakingNews as prop */}
      <BreakingSectionTop breakingNews={breakingNews} />

      <TrendingSlider />
      
      <FirstTopSection />

      <BadiKhabre/>
      <VideoSection />
      
      <WebStoriesSection/>
      {/* <RajyaSection /> */}
      {/* <CrimeSection /> */}
      {/* <SportsSection sportsData={sports} /> */}
      
      {/* <ManoranjanSection /> */}
      
      {/* <DharmSection 
        religiousData={religious} 
        rasifalData={rasifal} 
      /> */}
      
      {/* <WorldSection worldData={world} /> */}
      <TrendingSection/>
      
      <PodcastSection />
      <BottomSlider sliderData={allLatest} />
      
      <TravelSection travelData={allTravelData} />
      <WebsiteLowerBand/>
    </>
  );
}
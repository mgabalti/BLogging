import NewsGridSection from '@/components/NewsGridSection';
import FeaturedStories from '@/components/FeaturedStories';
import PoliticsSection from '@/components/PoliticsSection';
import SportsSection from '@/components/SportsSection';
import EntertainmentSection from '@/components/EntertainmentSection';
import DailyLifeSection from '@/components/DailyLifeSection';
import AlsoInNewsSection from '@/components/AlsoInNewsSection';

export default function Home() {
  return (
    <main>
      <NewsGridSection />
      <FeaturedStories />
      <PoliticsSection />
      <SportsSection />
      <EntertainmentSection />
      <DailyLifeSection />
      <AlsoInNewsSection />
    </main>
  );
} 
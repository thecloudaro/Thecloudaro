import Navbar from '@/components/Navbar/Navbar';
import HeroSection from '@/components/HomeSection/HeroSection';
import DynamicSection from '@/components/HomeSection/DynamicSection';
import BuildAround from '@/components/HomeSection/BuildAround/BuildAround';


const sectionsData = [
  { heading: 'Section 1', text: 'This is the first cinematic section.', bgImage: '/BgPics/black.jpg' },
  { heading: 'Section 2', text: 'Second section with smooth scroll effect.', bgImage: '/BgPics/black.jpg' },
  { heading: 'Section 3', text: 'Third section, default background will be used.', bgImage: '/BgPics/black.jpg' }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section>
        <HeroSection />
      </section>

      {/* Dynamic Sections */}
      <section>
        {sectionsData.map((section, index) => (
          <DynamicSection
            key={index}
            heading={section.heading}
            text={section.text}
            bgImage={section.bgImage}
          />
        ))}
      </section>

      <BuildAround/>

      {/* Footer rendered in root layout */}
    </div>
  );
}

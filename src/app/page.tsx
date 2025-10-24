import Navbar from '@/components/Navbar/Navbar';
import HeroSection from '@/components/HomeSection/Hero/HeroSection';
import DynamicSection from '@/components/HomeSection//DynamicSections/DynamicSections';
import BuildAround from '@/components/HomeSection/BuildAround/BuildAround';
import Customer from '@/components/HomeSection/Customers/Customers';
import FAQ from '@/components/HomeSection/FAQ/FAQ';


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
      <div className="min-h-screen bg-black">
      <BuildAround/>
      </div>
      {/* Single Dynamic Section render */}
<section>
  <DynamicSection
    heading="Security as Standard"
    text="This page will be developed later,
    once the pictures are available and animations are added."

    bgImage="/BgPics/black.jpg"
  />
</section>

<section>
  <div className="min-h-screen bg-black">
  <Customer/>
  </div>
</section>
<div className="min-h-screen bg-black">
<FAQ/>
</div>
<section>
  
</section>



      {/* Footer rendered in root layout */}
    </div>
  );
}

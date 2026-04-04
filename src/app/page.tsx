const comingSoon = false; 

import HeroSection from '@/components/HomeSection/Hero/HeroSection';
import DynamicSection from '@/components/HomeSection/DynamicSections/DynamicSections';
import BuildAround from '@/components/HomeSection/BuildAround/BuildAround';
import Customer from '@/components/HomeSection/Customers/Customers';
import FAQ from '@/components/HomeSection/FAQ/FAQ';

// Homepage cinematic sections (Section 1 - 3). Currently hidden on the page but kept for future use.
const sectionsData = [
  { heading: 'Section 1', text: 'This is the first cinematic section.', bgImage: '/BgPics/black.jpg' },
  { heading: 'Section 2', text: 'Second section with smooth scroll effect.', bgImage: '/BgPics/black.jpg' },
  { heading: 'Section 3', text: 'Third section, default background will be used.', bgImage: '/BgPics/black.jpg' }
];

export default function Home() {

  const showCinematicSections = false;
  const showCustomerSection = false;

  // 👉 Coming Soon Screen
  if (comingSoon) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[rgb(var(--home-coming-soon-bg))] px-6 text-center text-[rgb(var(--home-coming-soon-text))]">
        <h1 className="mb-4 text-5xl font-bold">TheCloudaro</h1>

        <p className="mb-2 text-xl text-[rgba(var(--home-coming-soon-muted))]">
          We are building something powerful for websites, apps and digital growth.
        </p>

        <p className="text-[rgba(var(--home-coming-soon-faint))]">Website coming soon…</p>

        <div className="mt-8 text-sm text-[rgba(var(--home-coming-soon-footer))]">
          Contact: info@thecloudaro.com
        </div>
      </div>
    );
  }

  // 👉 Real Homepage (tumhara existing code)
  return (
    <div className="min-h-screen bg-background">

      <section>
        <HeroSection />
      </section>

      {/* Temporarily hidden Sections 1–3 (cinematic sections). Toggle `showCinematicSections` to true to show them again. */}
      {showCinematicSections && (
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
      )}

      <div className="relative z-10 min-h-screen bg-[hsl(var(--faq-bg-default))]">
        <BuildAround />
      </div>

      <section className="relative z-10">
        <DynamicSection
          heading="Security as Standard"
          text="This page will be developed later once the pictures are available and animations are added."
          bgImage="/BgPics/black.jpg"
        />
      </section>

      {/* Temporarily hidden Customer Reviews section. Toggle `showCustomerSection` to true to show it again. */}
      {showCustomerSection && (
        <section>
          <div className="min-h-screen bg-[hsl(var(--faq-bg-default))]">
            <Customer />
          </div>
        </section>
      )}

      <div className="relative z-10 min-h-screen bg-[hsl(var(--faq-bg-default))]">
        <FAQ />
      </div>

    </div>
  );
}

import Navbar from '@/components/Navbar/Navbar';
import TransferHeroSection from '@/components/Transfer/Hero/HeroSection';
import TransferPricingNavbar from '@/components/Transfer/TransferPricingNavbar';
import DiagonalDivider from '@/components/Transfer/DiagonalDivider';
import DynamicSection from '@/components/HomeSection/DynamicSections/DynamicSections';
import BuildAround from '@/components/HomeSection/BuildAround/BuildAround';
import Customer from '@/components/HomeSection/Customers/Customers';
import FAQ from '@/components/HomeSection/FAQ/FAQ';

const sectionsData = [
  { 
    heading: 'Why Transfer to Spaceship?', 
    text: 'Get better performance, security, and support for your domain.', 
    bgImage: '/BgPics/black.jpg' 
  },
  { 
    heading: 'Easy Transfer Process', 
    text: 'Transfer your domain in just a few simple steps with our guided process.', 
    bgImage: '/BgPics/black.jpg' 
  },
  { 
    heading: '24/7 Support', 
    text: 'Our expert team is here to help you with your domain transfer anytime.', 
    bgImage: '/BgPics/black.jpg' 
  }
];

export default function TransferPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section>
        <TransferHeroSection />
      </section>

      {/* Diagonal Divider */}
      <DiagonalDivider direction="down" />

      {/* Transfer Pricing Navbar */}
      <TransferPricingNavbar />

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

      {/* Build Around Section */}
      <div className="min-h-screen bg-black">
        <BuildAround/>
      </div>

      {/* Security Section */}
      <section>
        <DynamicSection
          heading="Security as Standard"
          text="Your domain is protected with enterprise-grade security features and SSL certificates."
          bgImage="/BgPics/black.jpg"
        />
      </section>

      {/* Customer Section */}
      <section>
        <div className="min-h-screen bg-black">
          <Customer/>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="min-h-screen bg-black">
        <FAQ/>
      </div>

      {/* Footer rendered in root layout */}
    </div>
  );
}

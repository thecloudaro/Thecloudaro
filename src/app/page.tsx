import Navbar from '@/components/Navbar/Navbar';
import HeroSection from '@/components/Hero/HeroSection';
import NextSection from '@/components/Hero/NextSection';
import PageTransition from '@/components/Hero/PageTransition';
import NextSection1 from '@/components/Hero/NextSection1';


export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0e27]">
      <Navbar />
      <>
      <PageTransition />

      <section >
        <HeroSection />
      </section >

      <section>
        <NextSection />
      </section>
      

      <section>
        {/* <NextSection1/> */}
      </section>

     
    </>
    </div>
  );
}
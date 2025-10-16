import Navbar from '@/components/Navbar/Navbar';
import HeroSection from '@/components/Hero/HeroSection';
import NextSection from '@/components/Hero/NextSection';
import PageTransition from '@/components/Hero/PageTransition';


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
      

     
    </>
    </div>
  );
}
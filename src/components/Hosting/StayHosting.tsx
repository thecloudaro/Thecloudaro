'use client';

import { motion } from 'framer-motion';
import ContentHeading from '@/components/ui/content-heading';
import ContentDescription from '@/components/ui/content-description';
import HostingButton from '@/components/ui/hosting-button';

interface StayHostingProps {
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  buttonOnClick?: () => void;
  imageSrc?: string;
  imageAlt?: string;
}

const StayHosting = ({
  heading = "Stay up and open",
  description = "Keep your site up, business open, and visitors happy with 99.99% uptime.",
  buttonText = "See my options",
  buttonHref = "/business-hosting",
  buttonOnClick,
  imageSrc = "/Hosting/stayup.svg",
  imageAlt = "Stay up and open"
}: StayHostingProps) => {
  const resolvedHref = buttonOnClick ? undefined : buttonHref;

  return (
    <section className="relative w-full py-8 lg:py-12" style={{ backgroundColor: 'rgb(var(--hosting-section-bg))' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-full h-[600px] lg:h-[700px] xl:h-[800px] flex items-center justify-center"
          >
            <div className="relative w-full h-full max-w-xl lg:max-w-2xl xl:max-w-3xl flex items-center justify-center">
              <motion.img
                src={imageSrc}
                alt={imageAlt}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full h-full object-contain max-w-full max-h-full"
              />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="space-y-8 lg:space-y-10"
          >
            <ContentHeading title={heading} />
            <ContentDescription text={description} />
            <div className="pt-2">
              <HostingButton 
                variant="white"
                size="md"
                href={resolvedHref}
                onClick={buttonOnClick}
              >
                {buttonText}
              </HostingButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StayHosting;


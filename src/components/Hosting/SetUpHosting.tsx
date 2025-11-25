'use client';

import { motion } from 'framer-motion';
import ContentHeading from '@/components/ui/content-heading';
import ContentDescription from '@/components/ui/content-description';
import HostingButton from '@/components/ui/hosting-button';

interface SetUpHostingProps {
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  buttonOnClick?: () => void;
  imageSrc?: string;
  imageAlt?: string;
}

const SetUpHosting = ({
  heading = "Set up superfast",
  description = "Install WordPress and create personalized, professional websites quickly using powerful AI tools.",
  buttonText = "See my options",
  buttonHref,
  buttonOnClick,
  imageSrc = "/Hosting/setup.svg",
  imageAlt = "WordPress Setup"
}: SetUpHostingProps) => {
  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24" style={{ backgroundColor: 'rgb(var(--hosting-section-bg))' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] flex items-center justify-center"
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
                href={buttonHref}
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

export default SetUpHosting;


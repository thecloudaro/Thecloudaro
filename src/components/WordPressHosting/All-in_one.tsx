"use client";

import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import WhiteButton from "@/components/ui/white-button";

const AllInOne = () => {
  return (
    <section className="py-24" style={{ backgroundColor: 'rgb(var(--wp-allinone-bg))', color: 'rgb(var(--wp-allinone-heading))' }}>
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="text-center">
          <ContentHeading
            title="All-in-one EasyWP<br/>Dashboard"
            className="text-4xl font-bold sm:text-5xl md:text-6xl !text-[rgb(var(--wp-allinone-heading))]"
          />

          <ContentDescription
            size="lg"
            className="mt-6 text-base sm:text-lg !text-[rgba(var(--wp-allinone-description))]"
          >
            Manage your WordPress site effortlessly
          </ContentDescription>
        </div>

        <div className="mt-24 grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start">
          <div className="hidden h-[360px] lg:block" />

          <div className="space-y-10 lg:mt-12">
            <div>
              <h3 className="text-3xl font-semibold" style={{ color: 'rgb(var(--wp-allinone-feature-heading))' }}>Simple backups</h3>
              <p className="mt-3 text-lg" style={{ color: 'rgba(var(--wp-allinone-feature-text))' }}>
                Have peace of mind with an easy backup and restore<br/> tool.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-semibold" style={{ color: 'rgb(var(--wp-allinone-feature-heading))' }}>File and database access</h3>
              <p className="mt-3 text-lg" style={{ color: 'rgba(var(--wp-allinone-feature-text))' }}>
                Securely access your website files and folders with<br/> SFTP.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-semibold" style={{ color: 'rgb(var(--wp-allinone-feature-heading))' }}>Analytics</h3>
              <p className="mt-3 text-lg" style={{ color: 'rgba(var(--wp-allinone-feature-text))' }}>
                Check the health of your site with simplified reports<br/> and graphs.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-semibold" style={{ color: 'rgb(var(--wp-allinone-feature-heading))' }}>Security</h3>
              <p className="mt-3 text-lg" style={{ color: 'rgba(var(--wp-allinone-feature-text))' }}>
                Shield your online project from threats with EasyWP&apos;s <br/>exclusive
                security tools.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-30 flex justify-center">
          <WhiteButton className="text-xs sm:text-sm !px-4 !py-2">
            Choose your plan
          </WhiteButton>
        </div>
      </div>
    </section>
  );
};

export default AllInOne;



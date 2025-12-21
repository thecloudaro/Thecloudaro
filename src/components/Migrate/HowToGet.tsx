"use client";

import { useState } from "react";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import Image from "next/image";
import Link from "next/link";
import VideoModal from "@/components/ui/VideoModal";

const HowToGet = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  // Replace with your actual YouTube video
  const videoUrl =
  "https://www.youtube.com/embed/S8Zih5d-8QY?autoplay=1&mute=1";


  const openModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <section
        className="py-24"
        style={{
          backgroundColor: "rgb(var(--migration-howtoget-bg))",
          color: "rgb(var(--migration-howtoget-text))",
        }}
      >
        <div className="mx-auto max-w-6.5xl px-6 sm:px-10">
          <div className="text-center space-y-6">
            <ContentHeading
              title="How to get ready for migration"
              className="!text-[2.5rem] sm:!text-[3.25rem] md:!text-[4rem] font-bold !text-[rgb(var(--migration-howtoget-heading))]"
            />

            <ContentDescription
              size="xl"
              className="text-sm sm:text-base md:text-xl !text-[rgba(var(--migration-howtoget-description))]"
            >
              Check your cPanel backup file has all your website’s data, files,
              and databases
              <br />
              from your current hosting environment.
            </ContentDescription>
          </div>

          <div className="mt-16 grid gap-8 items-center md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
            <div className="flex justify-center">
              <Image
                src="/Migration/HowToGet.svg"
                alt="How to get ready illustration"
                width={620}
                height={620}
                className="h-auto w-[340px] sm:w-[420px] md:w-[500px]"
                priority
              />
            </div>

            <div className="space-y-6 text-left">
              <ContentHeading
                title="How to run your backup"
                className="!text-2xl sm:!text-[3rem] font-bold !text-[rgb(var(--migration-howtoget-subheading))]"
              />

              <ul className="space-y-8 list-disc list-outside text-base sm:text-2xl !text-[rgba(var(--migration-howtoget-list))]">
                <li>
                  In your cPanel account, go to the files section and select
                  <br />
                  “Backup menu”.
                </li>
                <li>
                  Choose “Download a Full Account Backup” then
                  <br />
                  “Generate Backup”.
                </li>
                <li>
                  When this has finished, download your cPanel backup
                  <br />
                  file from “Backups Available for Download”.
                </li>
              </ul>

              <div>
                <Link
                  href="#"
                  onClick={openModal}
                  className="inline-flex items-center gap-1 text-sm font-semibold transition hover:underline"
                  style={{
                    color: "rgb(var(--migration-howtoget-link))",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color =
                      "rgb(var(--migration-howtoget-link-hover))";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color =
                      "rgb(var(--migration-howtoget-link))";
                  }}
                >
                  View full tutorial <span aria-hidden>↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Render modal ONLY when open (preloader issue solved) */}
      {isModalOpen && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={closeModal}
          videoUrl={videoUrl}
        />
      )}
    </>
  );
};

export default HowToGet;

"use client";

import SectionHeader from "@/components/Common/SectionHeader";

const Preview = () => {
  return (
    <>
      <div id="music-generator" />
      <section id="preview" className="relative z-1 overflow-hidden bg-gray-1 py-17.5 dark:bg-black dark:text-white lg:py-22.5 xl:py-27.5">
        <SectionHeader
          title="See Eilumi AI in Action"
          description="Experience our AI music generator firsthand and create your own viral-ready tracks."
        />

        <div className="relative z-1 mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
            <iframe
              src="https://eilumi-music-spark.vercel.app/"
              className="w-full h-[800px]"
              style={{ border: 'none' }}
              title="Eilumi AI Preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Preview; 
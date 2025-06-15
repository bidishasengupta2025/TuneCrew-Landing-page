"use client";

import { useEffect } from 'react';

const PreviewPage = () => {
  useEffect(() => {
    // Redirect to the preview site
    window.location.href = 'https://eilumi-spark-generator-v2-nry3-llcjrj16c.vercel.app/';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E55A2B]">
      <div className="text-center text-white">
        <p className="text-xl font-satoshi mb-4">Redirecting to preview...</p>
        <a 
          href="https://eilumi-spark-generator-v2-nry3-llcjrj16c.vercel.app/"
          className="text-white underline hover:text-orange-100 transition-colors duration-300"
        >
          Click here if you are not redirected automatically
        </a>
      </div>
    </div>
  );
};

export default PreviewPage; 
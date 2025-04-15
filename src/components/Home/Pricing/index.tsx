"use client";
import React, { useEffect, useState, useRef } from "react";
import SectionHeader from "@/components/Common/SectionHeader";
import { pricingData } from "@/pricing/pricingData";
import PriceItem from "./PriceItem";

import menuDataJson from "@/data.json";

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="overflow-hidden py-17.5 lg:py-22.5 xl:py-27.5"
    >
      {/* <!-- section title --> */}
      <SectionHeader
        title={menuDataJson.pricing.title}
        description={menuDataJson.pricing.description}
      />

      <div className="flex justify-center">
        <div className="md:w-full max-w-[1170px] flex flex-col md:flex-row gap-8 justify-center">
          {pricingData &&
            pricingData.map((price, key) => (
              <PriceItem plan={price} key={key} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

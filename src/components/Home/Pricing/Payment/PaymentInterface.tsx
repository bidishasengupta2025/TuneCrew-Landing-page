import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import DialogBox from "./DialogBox";
import { Price } from "@/types/priceItem";

import config from "@/data.json";
import Image from "next/image";

type PlanProps = {
  plan: Price;
  isBilling?: boolean;
  subscriptionPlan?: any;
};

const PaymentInterface = ({ plan }: PlanProps) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const active = plan?.active;

  const { serviceId, templateId, userId, icon1, icon2, icon3 } = config.emailJS;

  const { airtable_token, airtable_base_ID, airtable_table_name } =
    config.airTable;

  const AIRTABLE_BASE_URL = `https://api.airtable.com/v0/${airtable_base_ID}/${airtable_table_name}`;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailRef.current) {
      const email = emailRef.current.value;
      

      setLoading(true);

      emailjs
        .send(serviceId, templateId, { email }, userId)
        .then(() => {
          if (formRef.current) {
            formRef.current.reset();
          }
          setOpenDialog(true);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });

      try {
        const response = await fetch(AIRTABLE_BASE_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${airtable_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            records: [
              {
                fields: {
                  Email: email,
                },
              },
            ],
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Email saved");
        } else {
          console.log(`Failed to save email: ${data.error?.message}`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 16); // Allow only digits and limit to 16
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 "); // Add a space every 4 digits
    e.target.value = formattedValue;
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 4); // Allow only digits and limit to 4
    if (value.length <= 2) {
      e.target.value = value;
    } else {
      e.target.value = `${value.substring(0, 2)}/${value.substring(2)}`; // Add '/' after the first two digits
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 3); // Allow only digits and limit to 3
    e.target.value = value;
  };

  return (
    <div className=" rounded-lg flex max-h-150 md:max-h-125  items-center justify-center bg-white px-6 h-screen  md:overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-20">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      )}
      <div
        style={{ maxHeight: "600px" }}
        className="w-full bg-white overflow-scroll md:overflow-hidden  rounded-md p-6   flex flex-col md:flex-row "
      >
        <div className="lg:w-1/2 w-full pr-6  border-b-2 md:border-b-0 md:border-r-2">
          <div className="flex">
            <div
              className={`flex max-h-[60px] w-full max-w-[60px] items-center justify-center rounded-2xl border ${
                active ? "bg-white/10" : "bg-primary/10"
              }`}
            >
              <Image
                src={plan?.icon}
                alt={plan?.nickname}
                width={34}
                height={34}
              />
            </div>
            <div className="ml-2">
              <h3 className="text-2xl font-bold">{plan?.subtitle} </h3>
              <h2 className="text-lg font-semibold mb-4">
                Subscribe to {plan?.nickname}{" "}
              </h2>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            ${plan?.unit_amount / 100}
          </p>
          <p className="text-sm text-gray-500">per {plan?.time_period}</p>

          <div className="mt-6">
            <div className="flex justify-between">
              <span>{plan?.subtitle} </span>
              <span>${plan?.unit_amount / 100}</span>
            </div>
            <p className="text-sm text-gray-500">Billed {plan?.time_period}</p>

            <div className="flex justify-between mt-4">
              <span>Subtotal</span>
              <span>${plan?.unit_amount / 100}</span>
            </div>

            <div className="flex justify-between mt-2">
              <span>Tax</span>
              <span>$0.00</span>
            </div>

            <div className="flex justify-between mt-4 border-t pt-2 mb-5 md:mb-0">
              <span>Total due today</span>
              <span>${plan?.unit_amount / 100}</span>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 lg:pl-6 pt-6 lg:pt-0 flex-grow">
          <h3 className="text-lg font-semibold mb-4">Pay with card</h3>
          <form className="space-y-3" onSubmit={handleSubmit} ref={formRef}>
            <input
              ref={emailRef}
              required
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />

            <div className="space-y-0">
              <h6 className="font-semibold">Card information</h6>
              <div className="relative  ">
                <input
                  required
                  type="text"
                  placeholder="1234 1234 1234 1234"
                  className="w-full px-4 py-2 border rounded focus:outline-none "
                  onChange={handleCardNumberChange}
                />
                <div className="flex absolute right-1  top-5 transform -translate-y-1/3  items-center">
                  <img
                    src={icon1}
                    alt="credit card"
                    className="mr-1 hidden sm:block"
                    height={40}
                    width={40}
                  />
                  <img
                    src={icon2}
                    alt="credit card"
                    className="mr-1 mb-3"
                    height={45}
                    width={45}
                  />
                  <img
                    src={icon3}
                    alt="credit card"
                    className="mr-1 mb-3"
                    height={40}
                    width={40}
                  />
                </div>
              </div>

              <div className="flex space-x-0 ">
                <input
                  required
                  type="text"
                  placeholder="MM / YY"
                  className="w-1/2 px-4 py-2 border rounded-b focus:outline-none"
                  onChange={handleExpiryChange}
                />
                <input
                  required
                  type="text"
                  placeholder="CVC"
                  className="w-1/2 px-4  py-2 border rounded-b focus:outline-none"
                  onChange={handleCvcChange}
                />
              </div>
            </div>

            <input
              required
              type="text"
              placeholder="Cardholder name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />

            <select
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              defaultValue="United States"
            >
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
              <option>Other</option>
            </select>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">
                Securely save my information for 1-click checkout
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Subscribe
            </button>

            <p className="text-xs text-gray-500 text-center">
              By confirming your subscription, you allow Feedbird, Inc. to
              charge you for future payments in accordance with their terms. You
              can always cancel your subscription.
            </p>
          </form>
        </div>
      </div>
      {openDialog && <DialogBox setOpenDialog={setOpenDialog} />}
    </div>
  );
};

export default PaymentInterface;

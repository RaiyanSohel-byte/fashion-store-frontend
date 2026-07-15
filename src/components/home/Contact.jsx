"use client";
import React from "react";
import { IoArrowForwardOutline } from "react-icons/io5";

const Contact = () => {
  return (
    <section className="bg-background py-24 lg:py-40 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col justify-between">
            <div>
              <span className="mb-4 block text-[10px] font-medium uppercase tracking-luxury text-muted-foreground">
                Client Services
              </span>
              <h2 className="mb-6 font-serif text-4xl leading-tight tracking-[0.05em] text-foreground sm:text-5xl">
                How may we <br className="hidden sm:block" /> assist you?
              </h2>
              <p className="mb-12 max-w-md text-sm leading-relaxed text-muted-foreground">
                Our client advisors are available to offer personalized styling
                advice, assist with inquiries regarding our collections, and
                guide you through our bespoke tailoring process.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h4 className="mb-2 text-[10px] font-medium uppercase tracking-luxury text-foreground">
                  Email
                </h4>
                <a
                  href="mailto:raiyansohel22@gmail.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  raiyansohel22@gmail.com
                </a>
              </div>
              <div>
                <h4 className="mb-2 text-[10px] font-medium uppercase tracking-luxury text-foreground">
                  Telephone
                </h4>
                <a
                  href="tel:+8801790839334"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  +880 1790839334
                </a>
              </div>
              <div className="sm:col-span-2">
                <h4 className="mb-2 text-[10px] font-medium uppercase tracking-luxury text-foreground">
                  Operating Hours
                </h4>
                <p className="text-sm text-muted-foreground">
                  Monday to Saturday, 10:00 AM – 7:00 PM (CET)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 p-8 sm:p-12">
            <form
              className="flex flex-col gap-10"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-border pb-2 text-sm text-foreground focus:border-foreground focus:outline-none transition-colors"
                  required
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 top-0 -translate-y-4 text-[10px] uppercase tracking-luxury text-muted-foreground transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-focus:-translate-y-4 peer-focus:text-[10px] peer-focus:text-foreground cursor-text"
                >
                  Full Name
                </label>
              </div>

              {/* Email Field */}
              <div className="relative mt-2">
                <input
                  type="email"
                  id="email"
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-border pb-2 text-sm text-foreground focus:border-foreground focus:outline-none transition-colors"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 top-0 -translate-y-4 text-[10px] uppercase tracking-luxury text-muted-foreground transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-focus:-translate-y-4 peer-focus:text-[10px] peer-focus:text-foreground cursor-text"
                >
                  Email Address
                </label>
              </div>

              {/* Subject Field */}
              <div className="relative mt-2">
                <select
                  id="subject"
                  className="w-full appearance-none bg-transparent border-b border-border pb-2 text-sm text-foreground focus:border-foreground focus:outline-none transition-colors cursor-pointer"
                  required
                >
                  <option value="" disabled selected>
                    Select an Inquiry
                  </option>
                  <option value="styling">Styling & Fit Advice</option>
                  <option value="order">Online Order Assistance</option>
                  <option value="bespoke">Bespoke Tailoring</option>
                  <option value="press">Press & Media</option>
                </select>

                <div className="pointer-events-none absolute right-0 top-1 text-muted-foreground">
                  ▼
                </div>
              </div>

              {/* Message Field */}
              <div className="relative mt-2">
                <textarea
                  id="message"
                  rows="4"
                  placeholder=" "
                  className="peer w-full resize-none bg-transparent border-b border-border pb-2 text-sm text-foreground focus:border-foreground focus:outline-none transition-colors"
                  required
                ></textarea>
                <label
                  htmlFor="message"
                  className="absolute left-0 top-0 -translate-y-4 text-[10px] uppercase tracking-luxury text-muted-foreground transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-focus:-translate-y-4 peer-focus:text-[10px] peer-focus:text-foreground cursor-text"
                >
                  Your Message
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group mt-4 flex w-fit items-center gap-4 bg-primary px-8 py-4 text-[10px] font-medium uppercase tracking-luxury text-background transition-transform hover:scale-[1.02]"
              >
                Submit Inquiry
                <IoArrowForwardOutline className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

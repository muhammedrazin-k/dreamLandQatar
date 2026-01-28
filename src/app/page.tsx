"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const services = [
  { id: 1, title: "Pick & Drop facility AC Vehicles", icon: "🚗" },
  { id: 2, title: "Self Drive Quad Biking", icon: "🚗" },
  { id: 3, title: "Sandboarding", icon: "🏂" },
  { id: 4, title: "Camel Ride", icon: "🐫" },
  { id: 5, title: "Skilled Experienced Safari Guides", icon: "👨‍🌾" },
  { id: 6, title: "Soft Drinks & Mineral Water", icon: "🥤" },
];

const serviceOptions = [
  "QUAD BIKING",
  "DUNE BUGGY SAFARI",
  "SUNRISE BUGGY TOUR",
  "SUNSET BUGGY TOUR",
  "INLAND SEA BUGGY TOUR",
  "CAMEL TREKKING",
  "CAMEL TREKKING WITH PRIVATE SAFARI",
  "PRIVATE DESERT SAFARI",
];

const experiences = [
  {
    title: "PRIVATE CAMEL TOUR",
    desc: "Embark on an exclusive journey through the majestic dunes. Experience the desert's silence and beauty on a private camel trek tailored for an intimate and authentic adventure.",
    image: "/images/private-camel.jpg",
    price: "From QAR 250",
  },
  {
    title: "DUNE BUGGY SAFARI",
    desc: "Experience the ultimate off-road adventure with a private buggy tour through the desert dunes, combining high-speed thrills with breathtaking scenery.",
    image: "/images/buggy-1.jpg",
    price: "From QAR 450",
  },
  {
    title: "SUNRISE DESERT SAFARI",
    desc: "Witness the magical moment when the first light hits the golden dunes. A tranquil and spiritual journey into the heart of the desert.",
    image: "/images/sunrise.png",
    price: "From QAR 300",
  },
  {
    title: "CAMEL TREKKING & DINNER",
    desc: "Travel back in time with a traditional camel trek, followed by a luxury dinner under the stars at our private desert camp.",
    image: "/images/desert-dinner.jpg",
    price: "From QAR 600",
  },
];


const carouselItems = [
  { img: "/images/camel-front-view.jpg", title: "TRADITIONAL CAMEL TREK", tag: "Adventure" },
  { img: "/images/buggy-single.jpg", title: "THRILL SEEKERS", tag: "Power" },
  { img: "/images/behind-camel.jpg", title: "DESERT SAFARI", tag: "Explore" },
  { img: "/images/buggy-race.jpg", title: "RUSTIC LUXURY", tag: "Harmony" },
];

export default function Home() {
  const [step, setStep] = useState(1);
  const [activeSlide, setActiveSlide] = useState(0);
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.service || formData.service === "Select Service") {
        newErrors.service = "Please select a service";
      }
    } else if (step === 2) {
      if (!formData.date) newErrors.date = "Please select a date";
      if (!formData.time) newErrors.time = "Please select a time";
    } else if (step === 3) {
      if (!formData.name) newErrors.name = "Please enter your name";
      if (!formData.email) newErrors.email = "Please enter your email";
      if (!formData.phone) newErrors.phone = "Please enter your phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      setIsSubmitting(true);
      try {
        const data = new FormData();
        data.append("service", formData.service);
        data.append("date", formData.date);
        data.append("time", formData.time);
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phone", formData.phone);

        const response = await fetch("https://formdb.io/f/bSpIBsTw", {
          method: "POST",
          body: data,
          headers: {
            "Accept": "application/json"
          }
        });

        if (response.ok) {
          setIsSuccess(true);
          setFormData({
            service: "",
            date: "",
            time: "",
            name: "",
            email: "",
            phone: "",
          });
          setStep(1);
        } else {
          alert("Something went wrong. Please try again.");
        }
      } catch (err) {
        alert("Failed to submit. Please check your connection.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Background Features */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="moving-line top-1/4 left-1/4" style={{ animationDelay: '0s' }} />
        <div className="moving-line top-3/4 left-2/3" style={{ animationDelay: '2s' }} />
        <div className="moving-line top-1/2 left-4/5" style={{ animationDelay: '4s' }} />
      </div>

      {/* Header */}
      <header className="absolute top-0 z-50 flex w-full items-center justify-between px-6 md:px-12 py-6 md:py-8 transition-all duration-300">
        <div className="flex flex-col">
          <div className="text-xl md:text-3xl font-black tracking-tighter leading-none text-foreground">DREAM LAND</div>
          <div className="text-[8px] md:text-[10px] font-black tracking-[0.4em] text-brand-red ml-1 uppercase">Qatar Adventures</div>
        </div>


        <div className="flex items-center gap-3 md:gap-6">
          <ThemeToggle />
          <a
            href="tel:+97455579001"
            className="group flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-all hover:border-brand-red hover:scale-110"
            title="Call Us"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </a>
          <a
            href="https://wa.me/97455579001"
            className="group flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-all hover:border-[#25D366] hover:scale-110"
            title="WhatsApp Us"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-32 pb-20 bg-premium-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid gap-20 lg:grid-cols-2 lg:items-center">
            {/* Left Content */}
            <div className="relative z-10 space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="inline-block rounded-full border border-brand-red/20 bg-brand-red/5 px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-brand-red dark:border-brand-red/40 dark:bg-brand-red/10 dark:text-red-500">
                Premium Market Leader
              </div>
              <h1 className="text-4xl md:text-7xl lg:text-[6.5rem] font-black tracking-tighter text-foreground leading-[0.9] md:leading-[0.85]">
                {carouselItems[activeSlide].title.split(' ')[0]} <br />
                <span className="text-brand-red">{carouselItems[activeSlide].title.split(' ').slice(1).join(' ') || ''}</span>
              </h1>
              <p className="max-w-md text-base md:text-xl font-medium opacity-60 leading-relaxed">
                Experience the Arabian desert with a touch of modern luxury. Bespoke tours tailored for the discerning traveler.
              </p>
              <div className="flex items-center gap-6 pt-6">
                <a
                  href="#booknow"
                  className="rounded-full bg-zinc-900 px-8 py-4 md:px-12 md:py-5 text-xs md:text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-brand-red hover:shadow-[0_20px_40px_rgba(139,0,0,0.2)] border border-zinc-200 dark:border-white/10"
                >
                  Book Now
                </a>
                <div className="h-px w-20 bg-border" />
                <button className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
                  Full Story
                </button>
              </div>
            </div>

            {/* Right Carousel */}
            <div className="relative flex items-center justify-center animate-in fade-in slide-in-from-right-8 duration-1000">
              <div className="relative h-[550px] w-full max-w-[450px] p-6 lg:p-8">
                {/* Stylish Image Container */}
                <div className="relative h-full w-full overflow-hidden bg-card p-4 shadow-premium transition-all duration-700 ease-in-out">
                  {carouselItems.map((item, index) => (
                    <div
                      key={index}
                      className={`absolute inset-4 transition-all duration-1000 ease-in-out ${index === activeSlide ? 'opacity-100 scale-100 rotate-0 translate-x-0' : 'opacity-0 scale-110 rotate-2 translate-x-20'}`}
                    >
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute bottom-10 left-10 text-white">
                        <div className="text-[10px] font-black uppercase tracking-[0.5em] opacity-80 mb-2">{item.tag}</div>
                        <div className="text-2xl font-black tracking-tighter">0{index + 1}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative Frames */}
                <div className="absolute -top-4 -right-4 h-32 w-32 border-t-2 border-r-2 border-brand-red/10 dark:border-brand-red/30 pointer-events-none" />
                <div className="absolute -bottom-4 -left-4 h-32 w-32 border-b-2 border-l-2 border-brand-red/10 dark:border-brand-red/30 pointer-events-none" />

                {/* Carousel Navigation Dots */}
                <div className="absolute -right-8 top-1/2 flex -translate-y-1/2 flex-col gap-4">
                  {carouselItems.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      className={`h-2 transition-all duration-500 rounded-full ${i === activeSlide ? 'w-8 bg-brand-red' : 'w-2 bg-zinc-200 hover:bg-zinc-400'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booknow" className="bg-background py-24 px-4 relative overflow-hidden">
        <div className="mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground capitalize">
              Secure Your <span className="text-brand-red">Adventure</span>
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto text-sm md:text-base font-medium">
              Complete the simple 3-step process to book your premium desert experience in Qatar.
            </p>
          </div>

          <div className="grid gap-16 lg:grid-cols-2 lg:items-center p-8 lg:p-12 rounded-[2.5rem] bg-card/30 border border-zinc-200/80 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            {/* Multi-step Booking Form */}
            <div className="rounded-3xl bg-card p-8 lg:p-10 shadow-premium border border-zinc-200/80 dark:border-white/5 transition-all duration-500">
              {/* Progress Bar */}
              <div className="mb-10 flex items-center justify-between px-2 relative">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex flex-col items-center gap-2 group">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-black transition-all duration-300 ${step >= s ? "bg-brand-red text-white shadow-[0_10px_20px_rgba(139,0,0,0.2)]" : "bg-background border border-border text-foreground/40"}`}>
                      {s}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${step >= s ? "text-brand-red" : "text-zinc-300"}`}>
                      {s === 1 ? "Service" : s === 2 ? "Schedule" : "Details"}
                    </span>
                  </div>
                ))}
                <div className="absolute top-5 left-[15%] right-[15%] h-[2px] bg-border -z-10 hidden md:block" />
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="space-y-8 min-h-[300px] flex flex-col justify-between">
                {isSuccess ? (
                  <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center justify-center space-y-4 py-12 text-center">
                    <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center text-4xl">✅</div>
                    <h3 className="text-2xl font-black text-foreground">Booking Confirmed!</h3>
                    <p className="text-zinc-500 font-medium">Your request has been sent. We will contact you shortly.</p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="mt-6 text-brand-red font-black uppercase tracking-widest text-xs hover:underline"
                    >
                      Book Another Adventure
                    </button>
                  </div>
                ) : (
                  <>
                    {step === 1 && (
                      <div className="animate-in fade-in zoom-in-95 duration-500 space-y-4">
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-brand-red uppercase tracking-[0.2em] ml-1">Step 01 / Select Activity</label>
                          <div className="relative group">
                            <select
                              name="service"
                              value={formData.service}
                              onChange={(e) => {
                                setFormData({ ...formData, service: e.target.value });
                                if (errors.service) setErrors({ ...errors, service: "" });
                              }}
                              className={`w-full rounded-xl bg-background border-2 p-4 outline-none transition-all appearance-none cursor-pointer font-bold text-foreground ${errors.service ? "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-border hover:border-brand-red/20 focus:border-brand-red"}`}
                            >
                              <option value="">Choose an adventure...</option>
                              {serviceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 group-hover:text-zinc-600 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                            </div>
                          </div>
                          {errors.service && <p className="mt-2 text-xs font-bold text-red-600 px-2 italic">⚠️ {errors.service}</p>}
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6">
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-brand-red uppercase tracking-[0.2em] ml-1">Step 02 / Pick a Date</label>
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className={`w-full rounded-xl bg-background border-2 p-4 outline-none transition-all font-bold text-foreground ${errors.date ? "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-border hover:border-brand-red/20 focus:border-brand-red"}`}
                          />
                          {errors.date && <p className="mt-2 text-xs font-bold text-red-600 px-2 italic">⚠️ {errors.date}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-brand-red uppercase tracking-[0.2em] ml-1">Preferred Time Slot</label>
                          <div className="relative group">
                            <select
                              name="time"
                              value={formData.time}
                              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                              className={`w-full rounded-xl bg-background border-2 p-4 outline-none transition-all appearance-none cursor-pointer font-bold text-foreground ${errors.time ? "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-border hover:border-brand-red"}`}
                            >
                              <option value="">Select Time</option>
                              <option>Morning (08:00 AM)</option>
                              <option>Noon (11:00 AM)</option>
                              <option>Afternoon (02:00 PM)</option>
                              <option>Sunset (05:00 PM)</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                            </div>
                          </div>
                          {errors.time && <p className="mt-2 text-xs font-bold text-red-600 px-2 italic">⚠️ {errors.time}</p>}
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="animate-in fade-in zoom-in-95 duration-500 space-y-5">
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-brand-red uppercase tracking-[0.2em] ml-1">Step 03 / Contact Details</label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={`w-full rounded-xl bg-background border-2 p-4 outline-none transition-all font-bold text-foreground ${errors.name ? "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-border hover:border-brand-red/20 focus:border-brand-red"}`}
                          />
                          {errors.name && <p className="mt-2 text-xs font-bold text-red-600 px-2 italic">⚠️ {errors.name}</p>}
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <input
                              type="email"
                              name="email"
                              placeholder="Email Address"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className={`w-full rounded-xl bg-background border-2 p-4 outline-none transition-all font-bold text-foreground ${errors.email ? "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-border hover:border-brand-red"}`}
                            />
                            {errors.email && <p className="mt-2 text-xs font-bold text-red-600 px-2 italic">⚠️ {errors.email}</p>}
                          </div>
                          <div className="space-y-2">
                            <input
                              type="tel"
                              name="phone"
                              placeholder="Phone Number"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className={`w-full rounded-xl bg-background border-2 p-4 outline-none transition-all font-bold text-foreground ${errors.phone ? "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-border hover:border-brand-red"}`}
                            />
                            {errors.phone && <p className="mt-2 text-xs font-bold text-red-600 px-2 italic">⚠️ {errors.phone}</p>}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4 pt-8">
                      {step > 1 && (
                        <button
                          type="button"
                          onClick={prevStep}
                          disabled={isSubmitting}
                          className="flex-1 rounded-xl border-2 border-border py-4 font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity active:scale-95 disabled:opacity-50"
                        >
                          Back
                        </button>
                      )}
                      {step < 3 ? (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="flex-[2] rounded-xl bg-zinc-900 py-4 font-black uppercase tracking-widest text-white shadow-xl transition-all hover:scale-[1.02] hover:bg-brand-red hover:shadow-[0_15px_30px_rgba(139,0,0,0.2)] active:scale-95 border border-zinc-200 dark:border-white/10"
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-[2] rounded-xl bg-brand-red py-4 font-black uppercase tracking-widest text-white shadow-xl transition-all hover:scale-[1.02] hover:bg-brand-light-red hover:shadow-[0_15_30px_rgba(139,0,0,0.3)] active:scale-95 disabled:bg-zinc-400 border border-transparent dark:border-white/10"
                        >
                          {isSubmitting ? "Sending..." : "Confirm Booking"}
                        </button>
                      )}
                    </div>
                  </>
                )}
              </form>
            </div>

            {/* Service Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
              {services.map((s) => (
                <div key={s.id} className="group relative">
                  <div className="flex flex-col items-center lg:items-start space-y-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-card border border-border shadow-sm transition-all duration-500 group-hover:bg-brand-red group-hover:scale-110 group-hover:shadow-[0_15px_30px_rgba(139,0,0,0.15)]">
                      <span className="text-2xl grayscale-0 group-hover:brightness-0 group-hover:invert transition-all">{s.icon}</span>
                    </div>
                    <div className="space-y-1 text-center lg:text-left">
                      <h3 className="text-xs font-black uppercase tracking-widest text-foreground">{s.title.split(' facility')[0]}</h3>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight">Included Feature</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Desert Experience Section */}
      <section id="explore" className="bg-background py-32 px-4 relative overflow-hidden">
        <div className="mx-auto max-w-7xl text-center relative z-10">
          <div className="space-y-4 mb-20">
            <div className="inline-block rounded-full bg-brand-red/10 px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-brand-red">
              Curated Adventures
            </div>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-foreground leading-none">
              PUSH YOUR <span className="text-brand-red">LIMITS</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base md:text-lg text-zinc-500 font-medium">
              We go beyond standard tours to deliver pulse-pounding experiences across the most magnificent dunes in Qatar.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 px-4">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="group relative flex flex-col overflow-hidden bg-white dark:bg-card shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-none hover:shadow-premium transition-all duration-700 rounded-[2.5rem] border border-zinc-200/60 dark:border-white/5"
              >
                {/* Image Container */}
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Price Tag */}
                  <div className="absolute top-6 left-6 rounded-full bg-card/95 backdrop-blur-md px-4 py-2 shadow-sm">
                    <span className="text-[10px] font-black text-foreground uppercase tracking-widest">{exp.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-8 text-left space-y-4 justify-between bg-card relative z-10">
                  <div className="space-y-4">
                    <h3 className="text-xl font-black leading-tight text-foreground group-hover:text-brand-red transition-colors duration-300">
                      {exp.title}
                    </h3>
                    <p className="text-sm font-medium text-zinc-400 leading-relaxed text-balance">
                      {exp.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => document.getElementById('booknow')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group/btn relative flex items-center justify-between w-full rounded-2xl bg-card border-1 border-border p-4 font-black uppercase tracking-widest text-foreground/40 transition-all hover:bg-brand-red hover:text-white hover:border-brand-red"
                  >
                    <span>Book Spot</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 dark:bg-white/10 group-hover/btn:bg-white transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 dark:text-zinc-300 group-hover/btn:text-brand-red"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="whyus" className="bg-background py-32 px-4 relative overflow-hidden">
        <div className="mx-auto max-w-7xl relative z-10 px-4">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-block rounded-full bg-zinc-100 dark:bg-zinc-800 px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500">
                The Benchmark
              </div>
              <h2 className="text-3xl md:text-6xl font-black tracking-tighter text-foreground leading-none">
                THE DREAM LAND <br />
                <span className="text-brand-red">DIFFERENCE</span>
              </h2>
            </div>
            <p className="text-zinc-500 max-w-sm font-medium pb-1 border-b-2 border-brand-red/10">
              Setting the standard for luxury desert adventure in Qatar for over a decade.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { val: "10+", label: "Years in Qatar", icon: "💎", desc: "Local Expertise" },
              { val: "Seamless", label: "Booking System", icon: "⚡", desc: "Instant Access" },
              { val: "Bespoke", label: "Unique Experiences", icon: "✨", desc: "Tailored For You" },
              { val: "Zero", label: "Safety Incidents", icon: "🛡️", desc: "Priority Safety" },
              { val: "Global", label: "Multinational Team", icon: "🌍", desc: "World Class" },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative flex flex-col items-center text-center p-8 rounded-[2rem] bg-card hover:bg-foreground/5 transition-all duration-500 border border-border shadow-sm hover:shadow-2xl"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-card border border-border text-3xl shadow-sm transition-all duration-500 group-hover:bg-brand-red group-hover:rotate-[15deg]">
                  <span className="group-hover:brightness-0 group-hover:invert transition-all">{item.icon}</span>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-black text-foreground uppercase transition-colors">{item.val}</div>
                  <div className="text-[10px] font-black text-brand-red uppercase tracking-[0.2em]">{item.label}</div>
                  <p className="text-[11px] text-zinc-400 group-hover:text-zinc-500 font-medium transition-colors pt-2">{item.desc}</p>
                </div>

                {/* Decorative background element on hover */}
                <div className="absolute inset-0 border-2 border-brand-red/20 rounded-[2rem] scale-95 opacity-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Adventure Gallery Section */}
      <section id="gallery" className="bg-background py-32 px-4 relative overflow-hidden">
        {/* Depth Patterns */}
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />

        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="text-center mb-24 space-y-4">
            <div className="inline-block rounded-full bg-brand-red/10 px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-brand-red">
              Vivid Perspectives
            </div>
            <h2 className="text-4xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.8] mb-4">
              DESERT <br />
              <span className="text-brand-red">CHRONICLES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[1000px]">
            {/* Main Feature - Vibrant & Deep Shadow */}
            <div className="md:col-span-8 md:row-span-2 relative group overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-premium h-[400px] md:h-auto">
              <Image
                src="/images/sunrise.png"
                alt="Adventure"
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover transition-all duration-[3s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-all duration-700" />
              <div className="absolute bottom-12 left-12 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px w-12 bg-brand-red" />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em]">The Epicenter</span>
                </div>
                <h3 className="text-4xl font-black tracking-tighter max-w-sm leading-none">PEAK OF INTENSITY</h3>
              </div>
            </div>

            {/* Vertical - Stylish B&W to Color Transition */}
            <div className="md:col-span-4 md:row-span-3 relative group overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-premium border-4 border-card h-[400px] md:h-auto">
              <Image
                src="/images/camel-front-view.jpg"
                alt="Adventure"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-all duration-[2.5s] ease-out filter grayscale group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-red/10 group-hover:opacity-0 transition-opacity duration-700" />
              <div className="absolute top-10 right-10">
                <div className="glass-card h-16 w-16 rounded-2xl flex items-center justify-center -rotate-12 group-hover:rotate-0 transition-all duration-700">
                  <span className="text-zinc-900 font-black text-xs">02</span>
                </div>
              </div>
            </div>

            {/* Square 1 - High Contrast */}
            <div className="md:col-span-4 md:row-span-2 relative group overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-premium bg-zinc-900 h-[300px] md:h-auto">
              <Image
                src="/images/skating-1.jpg"
                alt="Adventure"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover opacity-80 transition-all duration-[2s] group-hover:opacity-100 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-noise opacity-20" />
            </div>

            {/* Square 2 - Accent Box */}
            <div className="md:col-span-4 md:row-span-2 relative group overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-premium border-2 border-dashed border-border p-4 h-[300px] md:h-auto">
              <div className="relative h-full w-full overflow-hidden rounded-[2.5rem]">
                <Image
                  src="/images/desert-dinner.jpg"
                  alt="Adventure"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-all duration-[5s] scale-125 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/40 (mix-blend-overlay) to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="bg-background py-32 px-4 relative overflow-hidden">
        <div className="mx-auto max-w-7xl relative z-10 px-4">
          <div className="text-center mb-20 space-y-4">
            <div className="inline-block rounded-full bg-zinc-100 dark:bg-zinc-800 px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500">
              Client Experiences
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-none">
              VOICES OF THE <span className="text-brand-red">DESERT</span>
            </h2>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full overflow-hidden py-10">
          {/* Blurred Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-background via-background/50 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-background via-background/50 to-transparent z-20 pointer-events-none" />

          {/* Infinite Marquee */}
          <div className="flex w-max animate-marquee space-x-12 px-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex space-x-12">
                {[
                  { name: "Ahmed Khalid", rating: 5, date: "2 days ago", comment: "The quad biking was intense! Best sunset view I've ever seen in Qatar. Highly recommended!" },
                  { name: "Sarah Miller", rating: 5, date: "1 week ago", comment: "Breathtaking camel trekking. The dinner was world-class. A truly premium experience." },
                  { name: "James Wilson", rating: 4, date: "3 days ago", comment: "Perfect buggy safari. The team is professional and safety is clearly a priority. Amazing!" },
                  { name: "Maria Garcia", rating: 5, date: "5 days ago", comment: "Exhilarating dune bashing! The guides knew the dunes perfectly and pushed the limits safely." },
                  { name: "Li Wei", rating: 5, date: "4 days ago", comment: "Magical sunrise tour. Such a tranquil experience, Qatar's desert at its finest." },
                ].map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-[450px] shrink-0 p-10 rounded-[2.5rem] bg-white dark:bg-card border border-zinc-200/80 dark:border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-none hover:shadow-premium transition-all duration-700 group"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background font-black text-xs group-hover:bg-brand-red transition-all duration-500">
                        {testimonial.name.slice(0, 1)}
                      </div>
                      <div>
                        <div className="text-sm font-black text-foreground uppercase tracking-tighter">{testimonial.name}</div>
                        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{testimonial.date}</div>
                      </div>
                      <div className="ml-auto flex gap-1">
                        {[...Array(5)].map((_, star) => (
                          <svg key={star} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill={star < testimonial.rating ? "#8B0000" : "#E4E4E7"} stroke="none">
                            <path d="M12 1.7L15 9.2H23L17 13.9L19.5 21.4L12 16.7L4.5 21.4L7 13.9L1 9.2H9L12 1.7Z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-lg font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed italic group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-500 line-clamp-3">
                      "{testimonial.comment}"
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-zinc-950 text-white pt-24 pb-32 px-6 md:px-12 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-red/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            {/* Brand Section */}
            <div className="space-y-8">
              <div className="flex flex-col">
                <div className="text-3xl font-black tracking-tighter leading-none">DREAM LAND</div>
                <div className="text-[10px] font-black tracking-[0.4em] text-brand-red ml-1 uppercase">Qatar Adventures</div>
              </div>
              <p className="text-zinc-400 font-medium leading-relaxed max-w-sm">
                Qatar's premier desert adventure experts. We provide pulse-pounding experiences with a touch of Arabian luxury.
              </p>
              <div className="flex gap-4">
                {[
                  { name: 'Instagram', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg> },
                  { name: 'Facebook', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
                  { name: 'X', icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg> },
                  { name: 'TikTok', icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg> }
                ].map((social) => (
                  <a key={social.name} href="#" className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all cursor-pointer group" title={social.name}>
                    <div className="text-zinc-400 group-hover:text-white transition-colors">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-brand-red">Quick Links</h4>
              <ul className="space-y-4">
                {[
                  { name: 'Explore Tours', id: '#explore' },
                  { name: 'Book Now', id: '#booknow' },
                  { name: 'Why Choose Us', id: '#whyus' },
                  { name: 'Adventure Gallery', id: '#gallery' },
                  { name: 'Client Reviews', id: '#reviews' }
                ].map((link) => (
                  <li key={link.name}>
                    <a href={link.id} className="text-zinc-400 hover:text-white transition-colors font-bold text-sm flex items-center gap-2 group">
                      <div className="h-1 w-1 rounded-full bg-brand-red opacity-0 group-hover:opacity-100 transition-all" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tours */}
            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-brand-red">Our Tours</h4>
              <ul className="space-y-4">
                {['Quad Biking', 'Dune Buggy Safari', 'Sunrise Tours', 'Camel Trekking', 'Desert Dinner'].map((link) => (
                  <li key={link}>
                    <a href="#explore" className="text-zinc-400 hover:text-white transition-colors font-bold text-sm flex items-center gap-2 group">
                      <div className="h-1 w-1 rounded-full bg-brand-red opacity-0 group-hover:opacity-100 transition-all" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Contact */}
            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-brand-red">Contact Us</h4>
              <div className="space-y-6">
                <a href="tel:+97455579001" className="flex items-start gap-4 group">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-red/20 group-hover:border-brand-red transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Call Anytime</div>
                    <div className="font-bold text-white">+974 5557 9001</div>
                  </div>
                </a>
                <a href="https://wa.me/97455579001" className="flex items-start gap-4 group">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-red/20 group-hover:border-brand-red transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">WhatsApp Us</div>
                    <div className="font-bold text-white">Send Message</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6">
            <div className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">
              © 2026 Dream Land Qatar. All Rights Reserved.
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-zinc-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Privacy Policy</a>
              <a href="#" className="text-zinc-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

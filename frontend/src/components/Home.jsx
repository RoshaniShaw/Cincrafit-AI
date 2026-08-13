
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import SignInModal from "./SignInModal";

const Home = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [showSignIn, setShowSignIn] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-white">

      {/* NAVBAR */}
      <Navbar onSignInClick={() => setShowSignIn(true)} />

      {/* HERO */}
      <section className="flex flex-col items-center text-center px-6 pt-24 pb-20">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-extrabold leading-tight">
          FIND THE <span className="text-orange-500">BEST DEALS</span> IN ONE PLACE
        </h2>

        <p className="mt-5 max-w-2xl text-neutral-400 text-lg">
          Trusted deals across movies, fashion, and food — curated by AI, updated in real time.
        </p>

        {/* SEARCH BAR */}
        <div className="mt-10 flex w-full max-w-3xl bg-neutral-900/70 border border-neutral-700 rounded-full overflow-hidden shadow-lg">
         <input
  type="text"
  placeholder="Search for deals, offers, coupons..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  className="flex-1 px-6 py-4 bg-transparent outline-none text-sm rounded-l-full sm:rounded-l-full sm:rounded-r-none"/>

          <button
  onClick={() => {
    if (!query.trim()) return;
    navigate("/movie-offers", { state: { query } });
  }}
  className="px-6 sm:px-10 py-4 bg-orange-500 hover:bg-orange-600 font-semibold transition rounded-r-full sm:rounded-r-full sm:rounded-l-none"
>
  Search
</button>

        </div>
      </section>

      {/* CATEGORY CARDS */}
      <section className="px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {[
            { title: "🎬 Movie Offers", desc: "Find the best movie tickets deals in across cinemas and OTT platforms in one place. AI agents filter and verify offers so you always see relevant, genuine discounts." },
            { title: "👕 Fashion Deals", desc: "Explore fashion discounts from popular brands, seasonal sales, and trending collections. AI-driven curation removes noise and surfaces only relevant, high-value offers." },
            { title: "🍔 Food Specials", desc: "Discover nearby restaurant deals, dining discounts, and special food offers without searching multiple apps. AI ensures deals are fresh, relevant, and easy to redeem." },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-orange-500 hover:scale-[1.02] transition-all shadow-md"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-neutral-400">{item.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-center">

          {[
            { title: "⚡ Real-Time Updates", desc: "Deals are continuously refreshed to remove expired or misleading offers. You always see the most accurate and up-to-date discounts available." },
            { title: " AI Curated", desc: "Intelligent AI agents analyze, verify, and rank deals based on relevance and value. This ensures higher quality recommendations instead of random listings." },
            { title: "💸 Save Instantly", desc: "Stop switching between apps and websites to find good deals. Cinecrafit helps you discover the best savings faster, with less effort." },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-orange-500 hover:scale-[1.02] transition-all shadow-md"
            >
              <h4 className="font-semibold">{item.title}</h4>
              <p className="mt-2 text-sm text-neutral-400">{item.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-32 px-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          STOP <span className="text-orange-500">SEARCHING</span>, START{" "}
          <span className="text-orange-500">SAVING</span>
        </h2>
        <p className="mt-4 text-neutral-400">
          All the best deals in one intelligent platform.
        </p>

        <button className="mt-8 px-8 md:px-12 py-4 rounded-full bg-orange-500 hover:bg-orange-600 font-semibold shadow-lg transition">
          Get Started
        </button>
      </section>
      <SignInModal
  isOpen={showSignIn}
  onClose={() => setShowSignIn(false)}
/>
    </div>
  );
};

export default Home;

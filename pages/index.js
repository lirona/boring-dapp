import React from "react";
import Header from "../components/Header";
import NavLink from "../components/NavLink";

export default function Home() {

  return (
    <section className="hero py-12 min-h-[calc(100vh-64px)]">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold">GROW SMALL SEEDS INTO REAL CHANGE</h1>
          <h2 className="py-6 text-2xl">Find local initiatives and get rewarded for contributing to a better world.</h2>
          <div className="flex flex-col md:flex-row justify-around items-center gap-4 md:gap-8 pt-8">
            <NavLink className="btn btn-primary btn-wide btn-lg text-white text-xl" href={'/quests'}>Explore Quests</NavLink>
            <span className="text-xl">or</span>
            <NavLink className="btn btn-primary btn-wide btn-lg text-white text-xl" href={'/quests/new'}>Create New Quest</NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}

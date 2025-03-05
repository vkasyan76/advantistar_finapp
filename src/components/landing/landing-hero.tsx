"use client";

import TypewriterComponent from "typewriter-effect";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold py-20 text-center space-y-1">
      <div className="text-4xl sm:text-3xl md:text-6xl lg:text-5xl space-y-5 font-extrabold">
        <h1>A Navigating Star for your Market Advantage</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 pb-2">
          <TypewriterComponent
            options={{
              strings: [
                "Real time model generation.",
                "Statistical pattern recognition.",
                "Short-term price predictions.",
                "Chart and Back-Testing.",
                "AI generated News Summary.",
                "More than 10,000 stock symbols.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Open your toolbox now.
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="default"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Start Generating for Free
          </Button>
        </Link>
      </div>
      <div className="text-zink-400 text-xs md:text-sm font-normal pt-1">
        Intuitive design. Training is not requiered.
      </div>
    </div>
  );
};
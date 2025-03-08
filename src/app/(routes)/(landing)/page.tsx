"use client";

import { LandingContent } from "@/components/landing/landing-content";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingNavbar } from "@/components/landing/landing-navbar";

import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const userTerms = useQuery(api.terms.checkTerms);

  useEffect(() => {
    if (isSignedIn) {
      // Redirect based on whether the user has accepted terms
      router.push(userTerms?.accepted ? "/dashboard" : "/user-terms");
    }
  }, [isSignedIn, userTerms, router]);

  return (
    <div>
      {/* Your landing page content */}
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
}

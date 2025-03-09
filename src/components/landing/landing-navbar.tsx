"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
// import { useAuth, RedirectToSignIn } from "@clerk/nextjs"; // Clerk authentication
import { useAuth, useClerk } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api"; // Import Convex API

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  const { redirectToSignIn } = useClerk(); // destructure the redirect function
  const router = useRouter();

  // Check if user has accepted terms
  const userTerms = useQuery(api.terms.checkTerms);

  const handleLoginClick = () => {
    if (!isSignedIn) {
      redirectToSignIn({
        afterSignInUrl: "/auth-callback",
        afterSignUpUrl: "/auth-callback",
      });
      return;
    }

    router.push(userTerms?.accepted ? "/dashboard" : "/user-terms");
  };

  return (
    <nav className="bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-16 w-16 mr-4">
          <Image
            fill
            alt="Logo"
            src="/AdvantiStar_Logo.png"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <h1 className={cn("text-2xl font-bold text-white", font.className)}>
          {"AdvantiStar\u00AE"}
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Button
          variant="outline"
          className="rounded-full"
          onClick={handleLoginClick}
        >
          {/* Sign-In / Sign-Up */}
          {isSignedIn ? "Login" : "Sign-In / Sign-Up"}
        </Button>
      </div>
    </nav>
  );
};

// The logic:
// If the user is signed in and has accepted the terms, they should be redirected to the dashboard (/dashboard).
// If the user is not signed in or signed up and has not accepted the terms, they should be redirected to Clerk’s sign-in/sign-up page first. After signing in, they should be taken to the terms page (/user-terms).
// If the user is not signed in but has accepted the terms before, they should be redirected to Clerk’s sign-in/sign-up page, and after signing in, they should be redirected to the dashboard (/dashboard)

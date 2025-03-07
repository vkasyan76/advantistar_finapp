"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth, RedirectToSignIn } from "@clerk/nextjs"; // Clerk authentication
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api"; // Import Convex API

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  // Check if user has accepted terms
  const userTerms = useQuery(api.terms.checkTerms);
  const acceptTerms = useMutation(api.terms.acceptTerms);

  const handleSignInUpClick = async () => {
    if (isSignedIn) {
      try {
        if (!userTerms?.accepted) {
          // If user hasn't accepted terms, insert a record and redirect
          // await acceptTerms();
          router.push("/user-terms"); // Redirect to terms page
        } else {
          router.push("/dashboard"); // Redirect to dashboard
        }
      } catch (error) {
        console.error("Error during terms acceptance check:", error);
      }
    } else {
      RedirectToSignIn({ redirectUrl: "/dashboard" }); // Redirect to sign-in
    }
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
          onClick={handleSignInUpClick}
        >
          Sign-In / Sign-Up
        </Button>
      </div>
    </nav>
  );
};

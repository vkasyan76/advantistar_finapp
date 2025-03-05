"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleSignInUpClick = async () => {
    // If the user is signed in, check the terms acceptance status
    if (isSignedIn) {
      try {
        const response = await fetch("/api/acceptance-check");
        if (response.ok) {
          const data = await response.json();
          if (!data.accepted) {
            // If terms are not accepted, redirect to terms page
            router.push("/user-terms");
          } else {
            // If terms are accepted, redirect to dashboard
            router.push("/dashboard");
          }
        } else {
          throw new Error("Failed to check terms acceptance");
        }
      } catch (error) {
        console.error("Error during terms acceptance check:", error);
        // Handle error, maybe show a message to the user
      }
    } else {
      // If the user is not signed in, redirect to the sign-up page
      router.push("/sign-up");
    }
  };

  return (
    <nav className="bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative  h-16 w-16 mr-4">
          <Image
            fill
            alt="Logo"
            src="/AdvantiStar_Logo.png"
            layout="fill" // Ensure the image fills the container
            objectFit="contain" // Keeps the aspect ratio of the image
          />
        </div>
        <h1 className={cn("text-2xl font-bold text-white", font.className)}>
          {"AdvantiStar\u00AE"}
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        {/* <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="outline" className="rounded-full">
            Sign-In / Sign-Up
          </Button>
        </Link> */}
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
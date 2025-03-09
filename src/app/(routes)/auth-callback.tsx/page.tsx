"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { FullscreenLoader } from "@/components/fullscreen-loader";

export default function AuthCallbackPage() {
  const router = useRouter();
  const userTerms = useQuery(api.terms.checkTerms);

  useEffect(() => {
    if (userTerms === undefined) return; // Wait for loading state.
    // if (!userTerms) return; // Wait until query finishes loading.

    if (userTerms?.accepted) {
      router.push("/dashboard");
    } else {
      router.push("/user-terms");
    }
  }, [userTerms, router]);

  return <FullscreenLoader label="Redirecting..." />;
}

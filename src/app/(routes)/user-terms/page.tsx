"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function UserTerms() {
  const router = useRouter();

  // Fetch existing terms acceptance
  const userTerms = useQuery(api.terms.checkTerms);

  // Mutation to accept terms
  const acceptTerms = useMutation(api.terms.acceptTerms);

  const [hasAccepted, setHasAccepted] = useState(false);
  const [acceptedAt, setAcceptedAt] = useState<Date | null>(null);

  useEffect(() => {
    if (userTerms?.accepted) {
      router.push("/dashboard");
    }
  }, [userTerms, router]);

  const handleAcceptTerms = async () => {
    await acceptTerms();
    setHasAccepted(true);
    setAcceptedAt(
      // userTerms?.acceptedAt can be undefined, but the Date constructor does not accept undefined as a valid argument.
      userTerms?.acceptedAt ? new Date(userTerms.acceptedAt) : null
    );
    router.push("/dashboard"); // Redirect to dashboard
  };

  return (
    <div>
      <h1>User Terms</h1>
      {hasAccepted ? (
        <p>You accepted the terms on {acceptedAt?.toLocaleDateString()}</p>
      ) : (
        <Button onClick={handleAcceptTerms}>Accept Terms</Button>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function UserTerms() {
  const router = useRouter();

  // Fetch existing terms acceptance
  const data = useQuery(api.terms.checkTerms);

  // Mutation to accept terms
  const acceptTerms = useMutation(api.terms.acceptTerms);

  const [hasAccepted, setHasAccepted] = useState(false);
  const [acceptedAt, setAcceptedAt] = useState<Date | null>(null);

  useEffect(() => {
    if (data?.accepted) {
      setHasAccepted(true);
      setAcceptedAt(new Date(data.acceptedAt));
    }
  }, [data]);

  const handleAcceptTerms = async () => {
    await acceptTerms();
    router.refresh();
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

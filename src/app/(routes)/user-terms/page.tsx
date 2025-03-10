"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import Heading from "@/components/terms/heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FullscreenLoader } from "@/components/fullscreen-loader";

export default function UserTermsPage() {
  const router = useRouter();

  const userTerms = useQuery(api.terms.checkTerms);
  const acceptTerms = useMutation(api.terms.acceptTerms);

  useEffect(() => {
    if (userTerms === undefined) return; // loading
    if (userTerms?.accepted) router.replace("/dashboard");
  }, [userTerms, router]);

  const handleAccept = async () => {
    await acceptTerms();
    router.push("/dashboard");
  };

  const handleDecline = () => {
    router.push("/");
  };

  if (userTerms === undefined) {
    return <FullscreenLoader label="Loading terms..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background py-10 px-4 md:px-20">
      <Heading
        title="Terms & Conditions"
        description="Please read and accept our Terms & Conditions to proceed."
        icon={FileText}
        iconColor="text-green-400"
        bgColor="bg-green-400/10"
      />

      <Card className="mt-8 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center">
            Terms and Conditions for AdvantiStar
          </CardTitle>
          <CardDescription className="text-center">
            By using AdvantiStar, you agree to our terms of service.
          </CardDescription>
        </CardHeader>

        <CardContent className="max-h-[50vh] overflow-y-auto">
          <div className="space-y-4 text-sm">
            <section>
              <h2 className="font-semibold">Acceptance of Terms</h2>
              <p>
                By using AdvantiStar, you confirm you have read and accept these
                terms in full. If you disagree, please discontinue use
                immediately.
              </p>
            </section>

            <section>
              <h2 className="font-semibold">Service Description</h2>
              <p>
                AdvantiStar provides AI-generated predictions and summaries for
                informational purposes only, not as investment advice.
              </p>
            </section>

            <section>
              <h2 className="font-semibold">User Responsibilities</h2>
              <p>
                Users must provide accurate registration information and agree
                not to misuse our service.
              </p>
            </section>

            <section>
              <h2 className="font-semibold">Intellectual Property</h2>
              <p>
                All intellectual property rights belong to AdvantiStar.
                Unauthorized use is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="font-semibold">
                Disclaimer & Limitation of Liability
              </h2>
              <p>
                AdvantiStar is not liable for decisions based on the provided
                information. Users should consult financial professionals for
                investment decisions.
              </p>
            </section>

            <section>
              <h2 className="font-semibold">Changes to Terms</h2>
              <p>
                We reserve the right to modify terms at any time. Continued use
                implies acceptance.
              </p>
            </section>

            <section>
              <h2 className="font-semibold">Contact</h2>
              <p>For any questions, reach us at info@advantistar.com.</p>
            </section>
          </div>
        </CardContent>

        <div className="flex justify-between items-center p-6">
          <Button variant="outline" onClick={handleDecline}>
            Decline
          </Button>
          <Button onClick={handleAccept}>Accept</Button>
        </div>
      </Card>
    </div>
  );
}

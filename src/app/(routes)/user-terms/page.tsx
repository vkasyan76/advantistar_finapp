
"use client";

import React, { useState, useEffect } from "react";
import Heading from "@/components/terms/heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
// import { checkTermsAcceptance, acceptTerms } from "@/lib/check-accept";

export default function UserTerms() {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [acceptedAt, setAcceptedAt] = useState<Date | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAcceptance = async () => {
      try {
        const response = await fetch("/api/acceptance-check");
        if (response.ok) {
          const data = await response.json();
          if (data.accepted) {
            setHasAccepted(true);
            setAcceptedAt(new Date(data.acceptedAt));
            // Adjust if necessary
            // router.push("/dashboard");
          }
        } else {
          throw new Error("Failed to check terms acceptance");
        }
      } catch (error) {
        console.error("Error checking terms acceptance:", error);
      }
    };

    checkAcceptance();
  }, [router]);

  const handleAccept = async () => {
    try {
      const response = await fetch("/api/acceptance-terms", { method: "POST" });
      if (response.ok) {
        setHasAccepted(true);
        // Adjust if necessary
        router.push("/dashboard");
      } else {
        throw new Error("Failed to accept terms");
      }
    } catch (error) {
      console.error("Error accepting terms:", error);
    }
  };

  const handleDecline = () => {
    // Implement decline logic
    router.push("/"); // Adjust if necessary
  };

  return (
    <div className="relative min-h-screen p-4 md:p-10 bg-white">
      <div className="mb-6">
        <Heading
          title="Terms & Conditions"
          description="Please read and accept the Terms & Conditions to proceed."
          icon={FileText}
          iconColor="text-green-400"
          bgColor="bg-green-400/5"
        />
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="mb-1 text-center">
              Terms and Conditions for AdvantiStar
            </CardTitle>
            <CardDescription>
              Welcome to AdvantiStar! These Terms and Conditions govern your use
              of our website and the services provided, including stock share
              price predictions and AI-generated summaries of news regarding
              publicly traded companies, commodities, and indexes, through our
              machine learning model. By accessing or using our service, you
              agree to be bound by these Terms and Conditions and our Privacy
              Policy.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <h1 className="font-bold mb-2">Acceptance of Terms</h1>
            <p className="text-sm mb-2">
              By using AdvantiStar, you confirm that you have read, understood,
              and agree to these Terms and Conditions in full. If you disagree
              with these terms or any part of these terms, you must not use our
              service.
            </p>
            <h1 className="font-bold mb-2">Service Description</h1>
            <p className="text-sm mb-2">
              AdvantiStar provides predictions and AI-generated summaries based
              on machine learning algorithms (&quot;Service&quot;). These
              services cover a wide range of financial instruments, including
              but not limited to publicly traded companies, commodities, and
              indexes. Our predictions and summaries are offered for
              informational purposes only and are not intended as financial
              advice or recommendations for trading or investment decisions.
            </p>
            <h1 className="font-bold mb-2">User Registration</h1>
            <p className="text-sm mb-2">
              Users may be required to register an account to access certain
              features of the service. You agree to provide accurate, current,
              and complete information during the registration process and to
              update such information to keep it accurate, current, and
              complete.
            </p>
            <h1 className="font-bold mb-2">Use of Service</h1>
            <p className="text-sm mb-2">
              The Service is provided for your personal and non-commercial use
              only. You agree not to use the Service for any unlawful purpose or
              in any way that interrupts, damages, or impairs the service or its
              functionality.
            </p>
            <h1 className="font-bold mb-2">Intellectual Property Rights</h1>
            <p className="text-sm mb-2">
              All intellectual property rights in the Service, its content, and
              the underlying technology are owned by AdvantiStar or our
              licensors. You agree not to copy, modify, distribute, sell, or
              lease any part of our Service or included software.
            </p>
            <h1 className="font-bold mb-2">Disclaimer of Warranties</h1>
            <p className="text-sm mb-2">
              The Service is provided &quot;as is&quot; and &quot;as
              available&quot; without any warranties of any kind, either express
              or implied, including but not limited to the implied warranties of
              merchantability, fitness for a particular purpose, or
              non-infringement.
            </p>
            <h1 className="font-bold mb-2">Limitation of Liability</h1>
            <p className="text-sm mb-2">
              To the fullest extent permitted by applicable law, AdvantiStar
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including but not limited to,
              damages for loss of profits, goodwill, use, data, or other
              intangible losses, resulting from the use of or inability to use
              the service.
            </p>
            <h1 className="font-bold mb-2">
              Disclaimer of Responsibility for Outcomes
            </h1>
            <p className="text-sm mb-2">
              AdvantiStar and its affiliates shall not be responsible for any
              consequences of decisions made based on the predictions or
              summaries generated by our Service. The information provided is
              for informational purposes only and is not intended as
              recommendations for trading or investment decisions. Users are
              advised to conduct their own research or consult with a qualified
              financial advisor before making any investment decisions.
            </p>
            <h1 className="font-bold mb-2">Changes to Terms and Conditions</h1>
            <p className="text-sm mb-2">
              We reserve the right to modify these Terms and Conditions at any
              time. Your continued use of the Service after such changes
              indicates your acceptance of the new Terms and Conditions.
            </p>
            <h1 className="font-bold mb-2">Governing Law</h1>
            <p className="text-sm mb-2">
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of the European Union, without regard to
              its conflict of law provisions.
            </p>
            <h1 className="font-bold mb-2">Contact Us</h1>
            <p className="text-sm mb-2">
              If you have any questions about these Terms and Conditions, please
              contact us at info@advantistar.com.
            </p>
          </CardContent>
          <div className="px-20 pt-0 pb-10">
            {hasAccepted && acceptedAt ? (
              <p>Accepted on: {acceptedAt!.toLocaleDateString()}</p>
            ) : (
              // Render Accept and Decline buttons
              <div className="flex justify-between items-center mt-4">
                <Button
                  className="bg-blue-500 text-white p-2 rounded"
                  onClick={handleAccept}
                >
                  Accept
                </Button>
                <Button
                  className="bg-gray-500 text-white p-2 rounded"
                  onClick={handleDecline}
                >
                  Decline
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

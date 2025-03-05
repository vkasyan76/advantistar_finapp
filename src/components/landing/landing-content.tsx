"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    title: "Real time price modelling",
    description:
      "Your machine learning model and predictions are generated in real time using prices, volumes, and statistical indicators and are suitable for short-term tracking (up to 2 trading days).",
  },
  {
    title: "User Validation",
    description:
      "Validate your models by charted output and check prediction / actuals correlation and percentage deviation (MAPE). Back-testing of buying and selling signals.",
  },
  {
    title: "Recognizing Data Patterns",
    description:
      "Pattern recognition form 2 years of trading history. Application to the recent data to give a short-term prediction. Compare the estimates to the current prices using your watchlist.",
  },
  {
    title: "Generated News Summary",
    description:
      "AI reads and summarizes the latest news, analyzes the sentiment to give you a quick edge in focusing on what is most important. Fill your dashboard with key news and analysis helping to track performance of your portfolio.",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Key features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
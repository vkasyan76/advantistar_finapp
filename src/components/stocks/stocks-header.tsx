import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { HeaderLogo } from "../header-logo";
import { Navigation } from "../navigation";
import { TickerFilter } from "../stocks/ticker-filter";

// import { Filters } from "../filters/filters";

export const StocksHeader = () => {
  return (
    <div className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-8">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex intems-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoaded>
            <UserButton />
          </ClerkLoaded>
          <ClerkLoading>
            <div className="size-8 animate-spin text-slate-400">Loading...</div>
          </ClerkLoading>
        </div>
        {/* <Filters /> */}
        {/* Imported TickerFilter */}
        <div className="flex gap-4 items-center mt-4">
          <TickerFilter />
        </div>
      </div>
    </div>
  );
};

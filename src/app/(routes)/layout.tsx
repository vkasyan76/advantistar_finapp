"use client"; // Force this component to be a client component

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { StocksHeader } from "@/components/stocks/stocks-header";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const isStockModelsPage = pathname === "/stock-models";

  return (
    <>
      {isStockModelsPage ? <StocksHeader /> : <Header />}
      <main className="px-3 lg:px-14">{children}</main>
    </>
  );
};

export default DashboardLayout;

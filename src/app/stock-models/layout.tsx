import { StocksHeader } from "@/components/stocks/stocks-header";

type Props = {
  children: React.ReactNode;
};

const StockPageLayout = ({ children }: Props) => {
  return (
    <>
      <StocksHeader />
      <main className="px-3 lg:px-8">{children}</main>
    </>
  );
};

export default StockPageLayout;

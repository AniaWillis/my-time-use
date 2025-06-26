import { LayoutProps } from "../types/components";
import Footer from "./Footer";
import PageNav from "./PageNav";

function Layout({ children }: LayoutProps) {
  return (
    <div className="w-screen min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50">
      <div className="max-w-[1200px] m-auto p-6 sm:px-8 min-h-screen flex flex-col gap-4">
        <PageNav />
        <div className="grow">{children}</div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;

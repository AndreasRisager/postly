import Newsletter from "./Newsletter";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function Layout({ children, className, newsletter }) {
  return (
    <>
      <SiteHeader />
      <main className={className ? className : `max-w-screen-xl mx-auto px-4`}>{children}</main>
      {newsletter && <Newsletter />}
      <SiteFooter />
    </>
  );
}

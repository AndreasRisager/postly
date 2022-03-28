import CookieConsent from "./CookieConsent";
import Newsletter from "./Newsletter";
import SEO from "./SEO";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function Layout({
  children,
  className,
  newsletter,
  title,
  description,
  keywords,
  image,
}) {
  return (
    <>
      <SEO title={title} description={description} keywords={keywords} image={image} />
      <SiteHeader />
      <main className={className ? className : `max-w-screen-xl mx-auto px-4`}>{children}</main>
      {newsletter && <Newsletter />}
      <SiteFooter />
      <CookieConsent />
    </>
  );
}

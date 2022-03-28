import { CartProvider } from "../helpers/CartContext";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.scss";
import Script from "next/script";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-HGYPF8ZF42"
        strategy="afterInteractive"
      />
      <Script
        id="gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-HGYPF8ZF42', {
                  page_path: window.location.pathname,
                });
              `,
        }}
      />
      <SessionProvider session={session}>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;

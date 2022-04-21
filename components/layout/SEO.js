import Head from "next/head";
import { useRouter } from "next/router";

export default function SEO({ title, description, keywords, image }) {
  const router = useRouter();

  return (
    <Head>
      <title>{title ? `${title} - Postly` : "Postly"}</title>
      <meta
        name="description"
        content={
          description ||
          "Se vores unikke udvalg af plakater fra postly, som matcher din stil og personlighed. Find en plakat som du, eller dem du holder af, vil sætte pris på for altid."
        }
      />
      <meta
        name="keywords"
        content={
          keywords ||
          "Postly, køb plakater online, køb postly online, online plakatbutik, postly online butik, online posterbutik, postly butik online, køb postly, posters online, plakater, postly plakater"
        }
      />
      <meta name="theme-color" content="#FFFFFF" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={`https://postly.dk${router.pathname}`} />

      <meta property="og:url" content={`https://postly.dk${router.pathname}`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title ? `${title} - Postly` : "Postly"} />
      <meta
        property="og:description"
        content={
          description ||
          "Se vores unikke udvalg af plakater fra postly, som matcher din stil og personlighed. Find en plakat som du, eller dem du holder af, vil sætte pris på for altid."
        }
      />
      <meta
        property="og:image"
        content={
          image ||
          "https://res.cloudinary.com/dffpafuyg/image/upload/v1644252262/photo_1513519245088_0e12902e5a38_ixlib_rb_1_2_8fdfa3b08f.jpg"
        }
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="https://postly.dk/" />
      <meta property="twitter:url" content={`https://postly.dk${router.pathname}`} />
      <meta name="twitter:title" content={title ? `${title} - Postly` : "Postly"} />
      <meta
        name="twitter:description"
        content={
          description ||
          "Se vores unikke udvalg af plakater fra postly, som matcher din stil og personlighed. Find en plakat som du, eller dem du holder af, vil sætte pris på for altid."
        }
      />
      <meta
        name="twitter:image"
        content={
          image ||
          "https://res.cloudinary.com/dffpafuyg/image/upload/v1644252262/photo_1513519245088_0e12902e5a38_ixlib_rb_1_2_8fdfa3b08f.jpg"
        }
      />
    </Head>
  );
}

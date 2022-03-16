import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Breadcrumb from "../components/checkout/Breadcrumb";
import Information from "../components/checkout/Information";
import Payment from "../components/checkout/Payment";
import Shipping from "../components/checkout/Shipping";
import Summary from "../components/checkout/Summary";
import Announcement from "../components/layout/Announcement";
import Layout from "../components/layout/Layout";
import { getAnnouncement } from "../lib/getAnnouncement";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC}`);

export default function Checkout({ announcement }) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) return;
    router.push(`/auth/login?from=${router.asPath}`);
  }, [session, router]);

  const [step, setStep] = useState(1);
  const [state, setState] = useState({
    email: session?.user.data.email || "",
    country: session?.user.data.country || "Danmark-DK",
    firstname: session?.user.data.firstname || "",
    lastname: session?.user.data.lastname || "",
    address1: session?.user.data.address1 || "",
    address2: session?.user.data.address2 || "",
    zip: session?.user.data.zip || "",
    city: session?.user.data.city || "",
    phone: session?.user.data.phone || "",
    delivery_method: "",
    delivery_price: "",
    discount: "",
  });

  const nextStep = () => {
    setStep((s) => s + 1);
  };
  const prevStep = () => {
    setStep((s) => s - 1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((s) => ({ ...s, [name]: value }));
  };

  const formatttedAddress = `${state.address1 && state.address1 + ","} ${
    state.address2 && state.address2 + ", "
  }${state.zip && state.zip} ${state.city && state.city}`;

  return (
    <>
      <Head>
        <title>Kassen - Postly</title>
      </Head>
      <Announcement announcement={announcement} />
      <Layout className={"max-w-[60rem] mx-auto px-4 my-7"}>
        <h1 className="text-2xl font-semibold mb-1">Kassen</h1>
        <Breadcrumb step={step} setStep={setStep} />
        <article className="flex flex-col sm:flex-row-reverse gap-8">
          <Summary state={state} setState={setState} />
          <section className="sm:w-2/3">
            {step === 1 && (
              <Information
                session={session}
                state={state}
                handleChange={handleChange}
                nextStep={nextStep}
              />
            )}
            {step === 2 && (
              <Shipping
                state={state}
                setState={setState}
                setStep={setStep}
                prevStep={prevStep}
                nextStep={nextStep}
                formatttedAddress={formatttedAddress}
              />
            )}
            {step === 3 && (
              <Elements stripe={stripePromise}>
                <Payment
                  session={session}
                  state={state}
                  setStep={setStep}
                  prevStep={prevStep}
                  formatttedAddress={formatttedAddress}
                />
              </Elements>
            )}
          </section>
        </article>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const announcement = await getAnnouncement();
  const session = await getSession(context);

  return { props: { announcement, session } };
}

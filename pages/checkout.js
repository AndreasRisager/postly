import { useSession } from "next-auth/react";
import { useState } from "react";
import Breadcrumb from "../components/checkout/Breadcrumb";
import Announcement from "../components/layout/Announcement";
import Layout from "../components/layout/Layout";
import { getAnnouncement } from "../lib/getAnnouncement";
import Forms from "../components/checkout/Forms";

export default function Checkout({ announcement }) {
  const { data: session } = useSession();

  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((s) => s + 1);
  };
  const prevStep = () => {
    setStep((s) => s - 1);
  };

  return (
    <>
      <Announcement announcement={announcement} />
      <Layout className={"max-w-[60rem] mx-auto px-4 my-7"} title="Kassen">
        <h1 className="text-2xl font-semibold mb-1">Kassen</h1>
        <Breadcrumb step={step} setStep={setStep} />
        <Forms
          session={session}
          step={step}
          setStep={setStep}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const announcement = await getAnnouncement();

  return { props: { announcement }, revalidate: 60 };
}

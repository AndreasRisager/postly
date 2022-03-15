import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/layout/Layout";

function Login({ providers }) {
  const { status } = useSession();
  const router = useRouter();
  const { from } = router.query;

  useEffect(() => {
    if (status === "authenticated") {
      router.push(from ? from : "/");
    }
  }, [status]);

  return (
    <Layout>
      <div className="flex flex-col items-center my-40">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="p-3 bg-blue-500 rounded-lg text-white"
              onClick={() => signIn(provider.id, { callbackUrl: from ? from : "/" })}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default Login;

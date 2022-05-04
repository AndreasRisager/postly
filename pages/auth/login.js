import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InputField from "../../components/layout/InputField";
import Layout from "../../components/layout/Layout";

export default function Login() {
  const { status } = useSession();
  const router = useRouter();
  const { from } = router.query;
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push(from ? "/" + from : "/");
    }
  }, [status, from, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (identifier === "") {
      setStatusMessage("Udfyld email eller brugernavn");
      return;
    }

    if (password === "") {
      setStatusMessage("Udfyld Password");
      return;
    }

    const res = await signIn("credentials", {
      email: identifier,
      password: password,
      callbackUrl: `${from ? "/" + from : "/"}`,
      redirect: false,
    });

    if (!res.ok) {
      setStatusMessage("Email eller Password er forkert");
    }
  };

  return (
    <Layout title="Login" className="my-40 max-w-sm mx-auto p-4 rounded-md shadow-md">
      <h1 className="text-2xl">Log ind</h1>
      <p className="text-black text-md">
        Har du ikke en konto?{" "}
        <Link href={`/auth/register${from ? "?from=" + from : ""}`}>
          <a className="text-primaryColor">Tilmeld</a>
        </Link>
      </p>
      <form className="flex flex-col gap-3 mt-3.5" onSubmit={handleSubmit}>
        <InputField
          type="text"
          id="email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}>
          Email eller brugernavn
        </InputField>
        <InputField
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}>
          Adgangskode
        </InputField>
        {statusMessage && <p className="text-red-500 text-md">{statusMessage}</p>}
        <button
          type="submit"
          className="bg-primaryColor border-2 border-primaryColor rounded-md py-2.5 font-medium hover:bg-primaryColor/80">
          Login
        </button>
      </form>
    </Layout>
  );
}

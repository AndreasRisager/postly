import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InputField from "../../components/layout/InputField";
import Layout from "../../components/layout/Layout";

export default function Register() {
  const { status } = useSession();
  const router = useRouter();
  const { from } = router.query;
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push(from ? from : "/");
    }
  }, [status, from, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form
    if (email.length < 6 || !email.includes("@")) {
      setStatusMessage("Udfyld Email Address korrekt.");
      return;
    }
    if (username.length < 5) {
      setStatusMessage("Brugernavn skal være mindst 5 tegn.");
      return;
    }
    if (password.length < 5) {
      setStatusMessage("Adgangskode skal være mindst 5 tegn.");
      return;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });

    if (!response.ok) {
      setStatusMessage("Email eller brugernavn er allerede taget.");
    }

    if (response.ok) {
      signIn("credentials", {
        email,
        password,
        callbackUrl: `${from ? "/" + from : "/"}`,
        redirect: false,
      });
    }
  };

  return (
    <Layout title="Tilmeld" className="my-40 max-w-sm mx-auto p-4 rounded-md shadow-md">
      <h1 className="text-2xl">Tilmeld</h1>
      <p className="text-black text-md">
        Har du allerede en konto?{" "}
        <Link href={`/auth/login${from ? "?from=" + from : ""}`}>
          <a className="text-primaryColor">Log ind</a>
        </Link>
      </p>
      <form className="flex flex-col gap-3 mt-3.5" onSubmit={handleSubmit}>
        <InputField
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}>
          Email
        </InputField>
        <InputField
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}>
          Brugernavn
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
          Tilmeld
        </button>
      </form>
    </Layout>
  );
}

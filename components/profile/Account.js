import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import InputField from "../layout/InputField";
import { useRouter } from "next/router";

export default function Account() {
  const { data: session } = useSession();
  const router = useRouter();

  const [statusMessage, setStatusMessage] = useState("");
  const [state, setState] = useState({
    email: session.user.data.email || "",
    password: session.user.data.password || "",
    username: session.user.data.username || "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // VALIDATE FIELDS
    if (state.email && state.email.length < 6) {
      setStatusMessage("E-mailadresse skal være på mindst 6 tegn");
      return;
    }
    if (state.password && state.password.length < 6) {
      setStatusMessage("Adgangskoden skal være på mindst 6 tegn");
      return;
    }
    if (state.username.length < 5) {
      setStatusMessage("Brugernavn skal være på mindst 5 tegn");
      return;
    }

    setStatusMessage("");

    // UPDATE USER
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${session.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.jwt,
        },
        body: JSON.stringify({
          user: session.user.data,
          password: state.password,
          username: state.username,
          email: state.email,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setStatusMessage(data?.message);
        return;
      }
      if (response.ok) {
        router.reload(window.location.pathname);
      }
    } catch (error) {
      setStatusMessage("Der opstod en fejl.");
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setState({ ...state, [name]: value });
  };

  const createdAt = new Date(session.user.data.createdAt).toLocaleDateString();

  return (
    <>
      <h1 className="text-2xl font-medium text-black mb-3">Konto</h1>
      {session && (
        <div className="flex flex-col">
          <p className="mb-2">Medlem siden: {createdAt}</p>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <InputField
              type="email"
              id="email"
              disabled={session.user.data.provider !== "email"}
              infoText={`Dette felt er deaktiveret, fordi du er logget ind med ${session.user.data.provider}`}
              value={state.email}
              onChange={handleChange}>
              Mail
            </InputField>
            <InputField
              type="password"
              id="password"
              value={state.password}
              onChange={handleChange}>
              Adgangskode
            </InputField>
            <InputField type="text" id="username" value={state.username} onChange={handleChange}>
              Brugernavn
            </InputField>
            {statusMessage && <p className="text-red-700 italic">{statusMessage}</p>}
            <div className="flex flex-wrap gap-3 col-span-2">
              <button
                type="submit"
                className="border border-inputBorder rounded-md text-black py-1 px-3 hover:bg-gray-100">
                Gem
              </button>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="border border-inputBorder rounded-md text-black py-1 px-3 hover:bg-gray-100">
                Log ud
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

import { useState } from "react";
import { init } from "@instantdb/react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const db = init({ appId: process.env.NEXT_PUBLIC_INSTANT_APP_ID! });

export function LoginButton() {
  const [nonce] = useState(crypto.randomUUID());

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <div>
        <GoogleLogin
          nonce={nonce}
          onError={() => console.error("Login failed.")}
          onSuccess={({ credential }) => {
            if (!credential) {
              console.error("Missing id_token.");
              return;
            }

            db.auth
              .signInWithIdToken({
                clientName: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_NAME!,
                idToken: credential,
                // Make sure this is the same nonce you passed as a prop
                // to the GoogleLogin button
                nonce,
              })
              .catch((err) => {
                console.error(err.body);
              });
          }}
          width="100000" // This is a hack to make the button full width
        />
      </div>
    </GoogleOAuthProvider>
  );
}

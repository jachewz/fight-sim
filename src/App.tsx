import { ReactNode } from "react";
import { id, tx } from "@instantdb/react";

import CustomizationCard from "@/components/CustomizationCard";
import type { Character } from "@/lib/types";
import { db } from "@/config";

function Auth({ children }: { children: ReactNode }) {
  const { isLoading, error, user } = db.useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div> Error fetching auth: {error.message}</div>;
  }

  console.log(user);

  if (user) {
    // Update user data after login
    db.transact(tx.users[user.id].update(user));
  }

  return <>{children}</>;
}

function App() {
  const { user } = db.useAuth();
  const userId = user?.id ?? "anon";
  const query = {
    characters: {
      $: {
        where: {
          ownerId: userId,
        },
      },
    },
  };
  const { isLoading, error, data } = db.useQuery(query);

  console.log("App component: ", user);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div> Error fetching data: {error.message}</div>;
  }

  const { characters } = data ?? [];

  const defaultCharacter =
    characters.length > 0
      ? characters[0]
      : {
          id: id(),
          name: "Untitled Character",
          description: "",
          image: "",
          userId: userId,
        };

  function updateCharacter(characterData: Character) {
    db.transact(tx.characters[characterData.id].update(characterData));
  }

  return (
    <main className="flex ">
      <div className="flex flex-1 flex-col items-center justify-center h-screen gap-y-4">
        <Auth>
          <CustomizationCard
            character={defaultCharacter}
            onSave={(c) => updateCharacter(c)}
          />
        </Auth>
      </div>
    </main>
  );
}

export default App;

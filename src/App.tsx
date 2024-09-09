import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { init, tx, id } from "@instantdb/react";
import { User } from "@instantdb/core";

import CustomizationCard from "@/components/CustomizationCard";
import CardDrawer from "@/components/CardDrawer";
import type { Character } from "@/lib/types";

const db = init<{
  characters: Character;
}>({ appId: process.env.NEXT_PUBLIC_INSTANT_APP_ID ?? "" });

function App() {
  const { isLoading, user, error } = db.useAuth();

  useEffect(() => {
    if (user) {
      db.transact(tx.users[user.id].update(user));
      console.log("User effect");
    }
  }, [user]);

  console.log("App render app id: ", process.env.NEXT_PUBLIC_INSTANT_APP_ID);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div> Error fetching auth: {error.message}</div>;
  }

  return <Main user={user} />;
}

function generateEmptyCharacter(): Character {
  return {
    id: id(),
    name: "Untitled Character",
    description: "",
    image: "",
  };
}

function Main({ user }: { user: User | undefined }) {
  const urlQuery = useSearchParams();
  const cidFromUrl = urlQuery.get("cid");
  const [currentCharacter, setCurrentCharacter] = useState<Character>(
    generateEmptyCharacter()
  );
  const [isEdited, setIsEdited] = useState(false);
  const [isCardDrawerOpen, setIsCardDrawerOpen] = useState(false);

  // Get characters owned by the user + the character from the URL
  const { isLoading, error, data } = db.useQuery({
    characters: {
      $: {
        where: {
          or: [{ "owner.id": user?.id ?? "" }, { id: cidFromUrl ?? "" }],
        },
      },
    },
  });

  useEffect(() => {
    if (data && data.characters.length > 0 && !isEdited) {
      // show latest character if there was no edits yet
      setCurrentCharacter(data.characters[data.characters.length - 1]);
    }
  }, [data, isEdited]);

  if (isLoading) {
    console.log("Loading...");
  }
  if (error) {
    return <div> Error fetching data: {error.message}</div>;
  }

  function updateCharacter(characterData: Character) {
    if (!user) {
      console.error("User is not logged in when trying to update character");
      return;
    }

    db.transact(
      tx.characters[characterData.id]
        .update(characterData)
        .link({ owner: user.id })
    );
  }

  function onCharacterSelect(id: Character["id"]) {
    setCurrentCharacter(
      data?.characters.find((c) => c.id === id) || generateEmptyCharacter()
    );
  }

  console.log("Main render drawer open?", isCardDrawerOpen);

  return (
    <main className="flex ">
      <div className="flex flex-1 flex-row items-center justify-center h-screen gap-y-4">
        <CustomizationCard
          key={currentCharacter.id} // Reset the state when the character changes by changing the key
          character={currentCharacter}
          onSave={(c) => updateCharacter(c)}
          triggerCardDrawer={() => setIsCardDrawerOpen(true)}
          setIsEdited={setIsEdited}
          loggedIn={!!user}
        />
      </div>
      <CardDrawer
        characters={data?.characters ?? []}
        isOpen={isCardDrawerOpen}
        onOpenChange={setIsCardDrawerOpen}
        onSelectCard={onCharacterSelect}
      />
    </main>
  );
}

export default App;

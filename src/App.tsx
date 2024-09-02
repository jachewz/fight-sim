
import { id, tx } from "@instantdb/react";

import CustomizationCard from '@/components/CustomizationCard';
import type { Character } from '@/lib/types';
import { db } from "@/config";

function App() {
  const { isLoading, error, data } = db.useQuery({ characters: {} });

  if (isLoading) { return (<div>Loading...</div>); }

  if (error) {
    return (< div > Error fetching data: {error.message}</div >);
  }

  const { characters } = data ?? [];

  const defaultCharacter = characters.length > 0 ? characters[0] : {
    id: id(),
    name: "Untitled Character",
    description: "",
    image: "",
  };

  function updateCharacter(characterData: Character) {
    db.transact(
      tx.characters[characterData.id].update(characterData),
    );
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-y-4">
        <CustomizationCard character={defaultCharacter} onSave={
          (c) => updateCharacter(c)
        } />
      </div>
    </main>
  );
}

export default App;

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Character } from "@/lib/types";

interface CardDrawerProps {
  isOpen: boolean;
  onOpenChange: (o: boolean) => void;
  characters: Character[];
  onSelectCard: (id: Character["id"]) => void;
}

export default function DrawingDrawer({
  isOpen,
  onOpenChange,
  characters,
  onSelectCard,
}: CardDrawerProps) {
  const handleCardSelect = (id: Character["id"]) => {
    onSelectCard(id);
    onOpenChange(false);
  };

  function SelectableCard({ character }: { character: Character }) {
    return (
      <div
        className="border rounded-lg aspect-[5/7] p-4"
        onClick={() => handleCardSelect(character.id)}
      >
        <h3 className="font-bold mb-2 text-center">{character.name}</h3>
        <img
          src={character.image}
          alt={character.name}
          className="w-32 h-32 object-cover bg-white rounded-md mb-2"
        />
        <p className="text-sm text-gray-500 mb-2">{character.description}</p>
      </div>
    );
  }

  const listOfCards = characters
    .slice() // Create a copy of the array to avoid mutating the original
    .reverse() // Reverse the order to show the latest card first
    .map((character) => (
      <SelectableCard key={character.id} character={character} />
    ));

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="py-1">
          <DrawerTitle>Your Cards</DrawerTitle>
          <DrawerDescription>Select a card to edit</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className=" px-2">
          <div className="flex w-max space-x-8 p-4">
            {/* Add dummy card to create a new character */}
            <SelectableCard
              character={{
                id: "new",
                name: "New card",
                description: "Create a new card",
                image:
                  "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E", // Empty SVG
              }}
            />
            {listOfCards}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

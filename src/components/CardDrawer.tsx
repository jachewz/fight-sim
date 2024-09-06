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
        key={character.id}
        className="border rounded-lg aspect-[5/7] p-4"
        onClick={(e) => handleCardSelect(e.currentTarget.id)}
      >
        <h3 className="font-bold mb-2">{character.name}</h3>
        <img
          src={character.image}
          alt={character.name}
          className="w-32 h-32 object-cover bg-white rounded-md mb-2"
        />
        <p className="text-sm text-gray-500 mb-2">{character.description}</p>
      </div>
    );
  }

  const listOfCards = characters.map((character) => (
    <SelectableCard character={character} />
  ));

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="py-1">
          <DrawerTitle>Your Cards</DrawerTitle>
          <DrawerDescription>
            Select a card to edit 
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className=" px-2">
          <div className="flex w-max space-x-8 p-4">
            {/* Add dummy card to create a new character */}
            <SelectableCard
              character={{
                id: "new",
                name: "New Character",
                description: "Create a new character",
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

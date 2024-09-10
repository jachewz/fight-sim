import { useState } from "react";
import { init } from "@instantdb/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardPaste } from "lucide-react";
import { Character } from "@/lib/types";

const db = init<{
  characters: Character;
}>({ appId: process.env.NEXT_PUBLIC_INSTANT_APP_ID! });

interface DuelDialogProps {
  isOpen: boolean;
  onClose: () => void;
  characterId: string;
}

export function DuelDialog({
  isOpen,
  onClose,
  characterId: characterId,
}: DuelDialogProps) {
  const { user } = db.useAuth();

  const [opponentLinkText, setOpponentLink] = useState("");
  const [infoText, setInfoText] = useState("");

  // if link invalid, opponentId will be null
  let opponentId = null;

  if (opponentLinkText.length >= 36) {
    try {
      opponentId = new URL(opponentLinkText).searchParams.get("cid");
      console.log(opponentId);
    } catch (error) {
      opponentId = opponentLinkText;
      console.log(error);
    }
  }

  const { data } = db.useQuery({
    characters: {
      $: {
        where: {
          id: opponentId || "",
        },
      },
    },
  });

  const opponentCharacterFound = (data?.characters?.length ?? 0) > 0;

  const handlePasteLink = () => {
    navigator.clipboard.readText().then((text) => {
      setOpponentLink(text);
    });
  };

  const handleDuelSubmit = async () => {
    if (!user?.refresh_token) {
      setInfoText("Please login to duel.");
      return;
    }

    if (!opponentId) {
      setInfoText("Invalid link.");
      return;
    }

    if (!opponentCharacterFound) {
      setInfoText("Character not found from link.");
      return;
    }

    setInfoText("Dueling...");
    await fetch("/api/duel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        characterId: characterId,
        opponentId: opponentId,
        userToken: user.refresh_token,
      }),
    });

    setInfoText("Duel request sent!");
    // redirect to duel page
  };

  const handleClose = () => {
    setInfoText("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Who to duel with?</DialogTitle>
          <DialogDescription>
            Paste the link to the character you want to duel with.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Button
            type="submit"
            disabled={!navigator.clipboard}
            size="sm"
            className="px-3"
            onClick={handlePasteLink}
          >
            <span className="sr-only">Paste</span>
            <ClipboardPaste className="h-4 w-4" />
          </Button>
          <div className="grid flex-1 gap-2">
            <Input
              id="link"
              placeholder=""
              value={opponentLinkText}
              onChange={(e) => {
                setOpponentLink(e.target.value);
              }}
            />
          </div>
        </div>
        <Button
          onClick={handleDuelSubmit}
          disabled={!opponentCharacterFound || !user?.refresh_token}
        >
          {opponentCharacterFound ? "Duel!" : "Opponent card not found"}
        </Button>
        <p className="text-sm text-muted-foreground h-4">{infoText}</p>
      </DialogContent>
    </Dialog>
  );
}

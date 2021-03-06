import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useStringSearchParam } from "lib/useSearchParam";
import { useRef } from "react";

interface JoinAnotherRoomModalProps {
  onLeave: (otherRoomCode?: string) => void;
}

export const JoinAnotherRoomModal: React.FC<JoinAnotherRoomModalProps> = ({
  onLeave,
}) => {
  const stayButtonRef = useRef<HTMLButtonElement>(null);

  const [otherRoom, setOtherRoom] = useStringSearchParam(
    "join-another-room",
    false
  );

  return (
    <AlertDialog
      leastDestructiveRef={stayButtonRef}
      isOpen={otherRoom !== undefined}
      onClose={() => setOtherRoom(undefined)}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Leave room?</AlertDialogHeader>
        <AlertDialogBody>
          You need to leave the room that you are in to join another room
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            ref={stayButtonRef}
            onClick={() => setOtherRoom(undefined)}
            mr="20px"
            variant="outline"
          >
            Ok
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

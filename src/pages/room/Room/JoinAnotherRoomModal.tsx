import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { StringParam, useQueryParam } from "use-query-params";

interface JoinAnotherRoomModalProps {
  onLeave: (otherRoomCode?: string) => void;
}

export const JoinAnotherRoomModal: React.FC<JoinAnotherRoomModalProps> = ({
  onLeave,
}) => {
  const stayButtonRef = useRef<HTMLButtonElement>(null);
  const leaveButtonRef = useRef<HTMLButtonElement>(null);

  const [otherRoom, setOtherRoom] = useQueryParam(
    "join-another-room",
    StringParam
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
            Stay
          </Button>
          <Button
            ref={leaveButtonRef}
            onClick={() => onLeave(otherRoom ?? undefined)}
          >
            Leave
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

import { Button, Flex, Input, useToast } from "@chakra-ui/react";
import { useCallback } from "react";

interface ShareRoomLinkProps {
  roomId: string;
}

export const ShareRoomLink: React.FC<ShareRoomLinkProps> = ({ roomId }) => {
  const showToast = useToast();

  const url = `${window.location.origin}/room/${roomId}`;

  const onClick = useCallback(async () => {
    await navigator.clipboard.writeText(url);
    showToast({
      title: "Join room link copied!",
      description: "Now share it with your friends 🚀",
      position: "top",
    });
  }, [url, showToast]);

  return (
    <Flex w="100%">
      <Input
        isReadOnly
        value={url}
        borderTopRightRadius="0"
        borderBottomRightRadius="0"
        display="inline"
        flex="1 1 auto"
        overflowX="auto"
      />
      <Button
        borderTopLeftRadius="0"
        borderBottomLeftRadius="0"
        display="inline"
        flex="1 0 auto"
        onClick={onClick}
      >
        Copy
      </Button>
    </Flex>
  );
};

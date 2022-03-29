import {
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { apolloClient } from "app/apollo";
import { Navbar } from "lib/Navbar";
import { useCallback } from "react";
import {
  Link as RouterLink,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useLogOutFromUserMutation } from "./logout.backend.generated";
import { useNavbarQuery } from "./navbar.backend.generated";

export const DefaultNavbar: React.FC = ({ children }) => {
  const { data, loading } = useNavbarQuery();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [logoutMutation] = useLogOutFromUserMutation();

  const onLogOutClick = useCallback(async () => {
    const result = await logoutMutation();
    if (!result.data) {
      toast({
        title: "Could not log out of room.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    switch (result.data.logOutFromUser.__typename) {
      case "AuthenticationError":
        toast({
          title: "Could not log out of room.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      case "Success":
        await apolloClient.resetStore();
        navigate("/");
        return;
    }
  }, [logoutMutation, navigate, toast]);

  if (loading || !data) {
    return <Navbar>{children}</Navbar>;
  }

  return (
    <Navbar
      bannerContent={
        !location.pathname.startsWith("/room") && data.roomSession ? (
          <Link
            as={RouterLink}
            to={`/room/${data.roomSession.room.id}/stream`}
            backgroundColor="yellow.300"
            color="black"
            flex="1 1 auto"
            display="flex"
            alignItems="center"
            justifyContent="center"
            _hover={{
              backgroundColor: "yellow.400",
            }}
          >
            Return to room 🎮
          </Link>
        ) : null
      }
      rightContent={
        <>
          {!data.user ? (
            <Flex gap="32px">
              <Button
                variant="link"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </Button>
            </Flex>
          ) : null}
          {data.user ? (
            <Menu placement="bottom-end">
              <MenuButton as={Button}>Profile</MenuButton>
              <MenuList>
                <MenuItem as={NavLink} to="/account">
                  Account
                </MenuItem>
                <MenuItem as={NavLink} to="/room">
                  Join Room
                </MenuItem>
                <MenuItem as={NavLink} to="/controllers">
                  Controllers
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  as={Button}
                  variant="transparent"
                  borderRadius="0px"
                  justifyContent="left"
                  onClick={onLogOutClick}
                >
                  Log Out
                </MenuItem>
              </MenuList>
            </Menu>
          ) : null}
        </>
      }
    >
      {children}
    </Navbar>
  );
};

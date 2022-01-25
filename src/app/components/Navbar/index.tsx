import {
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Navbar } from "lib/Navbar";
import {
  Link as RouterLink,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useNavbarQuery } from "./navbar.backend.generated";

export const DefaultNavbar: React.FC = ({ children }) => {
  const { data, loading } = useNavbarQuery();
  const navigate = useNavigate();
  const location = useLocation();

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
                <MenuItem>
                  {data.user.vulcasts.length > 0 ? "Vulcasts" : "Link Vulcast"}
                </MenuItem>
                <MenuItem as={NavLink} to="/controllers">
                  Controllers
                </MenuItem>
                <MenuDivider />
                <MenuItem>Log Out</MenuItem>
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

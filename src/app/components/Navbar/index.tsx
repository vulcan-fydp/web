import {
  Flex,
  Link,
  Center,
  Box,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { Link as RouterLink, NavLink, useNavigate } from "react-router-dom";
import logo from "app/resources/vulcan-transparent.svg";
import { useNavbarQuery } from "./navbar.backend.generated";

interface NavbarProps {
  children?: null;
}

export const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <Center
      bg="black"
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="calc(100% - 50px)"
      zIndex="999"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        maxWidth="1040px"
        padding="0 20px"
      >
        <Box>
          <Link as={RouterLink} to="/">
            <Image src={logo} />
          </Link>
        </Box>
        {children !== undefined ? children : <DefaultNavbarContent />}
      </Flex>
    </Center>
  );
};

export const DefaultNavbarContent = () => {
  const { data, loading } = useNavbarQuery();
  const navigate = useNavigate();

  if (loading || !data) {
    return null;
  }

  return (
    <>
      {!data.user ? (
        <Button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>
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
  );
};

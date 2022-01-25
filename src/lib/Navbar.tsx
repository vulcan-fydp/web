import { Box, Center, Flex, Image, Link } from "@chakra-ui/react";
// @todo: This shouldn't be in app
import logo from "app/resources/vulcan-transparent.svg";
import { Link as RouterLink } from "react-router-dom";
import { createContext, useContext } from "react";

const NavbarContext = createContext(0);

export const useNavbarHeight = () => {
  return useContext(NavbarContext);
};

interface NavbarProps {
  children?: React.ReactNode;
  rightContent?: React.ReactNode;
  bannerContent?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({
  rightContent,
  bannerContent,
  children,
}) => {
  const bannerHeight = bannerContent ? 30 : 0;
  const navbarHeight = 50;
  const totalHeight = navbarHeight + bannerHeight;

  return (
    <NavbarContext.Provider value={totalHeight}>
      <Center
        bg="black"
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom={`calc(100% - ${totalHeight}px)`}
        zIndex="999"
        flexDir="column"
      >
        {bannerContent ? (
          <Flex
            alignItems="stretch"
            justifyContent="stretch"
            height="30px"
            width="100%"
          >
            {bannerContent}
          </Flex>
        ) : null}
        <Flex
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          maxWidth="1040px"
          padding="0 20px"
          height={`${navbarHeight}px`}
        >
          <Box>
            <Link as={RouterLink} to="/">
              <Image src={logo} />
            </Link>
          </Box>
          {rightContent !== undefined ? rightContent : null}
        </Flex>
      </Center>

      {children}
    </NavbarContext.Provider>
  );
};

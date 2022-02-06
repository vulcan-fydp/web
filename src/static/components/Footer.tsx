import React from "react";
import { Box, Center, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export const Footer = React.memo(() => {
  return (
    <Center
      borderTopColor="purple.400"
      borderTopWidth="1px"
      w="90%"
      margin={{ base: "80px auto 40px", lg: "120px auto" }}
      flexDirection="column"
    >
      <HStack divider={<>&nbsp;•&nbsp;</>} mt="20px">
        <Link as={ReactRouterLink} to="/" color="yellow.300">
          Home
        </Link>
        <Link as={ReactRouterLink} to="/docs" color="yellow.300">
          Documentation
        </Link>
        <Link href="https://github.com/vulcan-fydp" color="yellow.300">
          Github
        </Link>
      </HStack>
      <Text maxW="400px" fontSize="sm" mt="20px" textAlign="center">
        Made with ❤️ by <Link href="https://github.com/MJez29">@MJez29</Link>,{" "}
        <Link href="https://github.com/Netdex">@Netdex</Link>,{" "}
        <Link href="https://github.com/CallumMoseley">@CallumMoseley</Link>,{" "}
        <Link href="https://github.com/RobbieZhuang">@RobbieZhuang</Link> and{" "}
        <Link href="https://github.com/orgs/vulcan-fydp/people">others</Link>.
      </Text>
    </Center>
  );
});

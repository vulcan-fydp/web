import { Flex, Spacer, Box, Heading } from "@chakra-ui/react";

export const Navbar = () => (
  <Flex
    alignItems="center"
    maxWidth="1000px"
    margin="0 auto"
    padding="40px 20px 0 20px"
  >
    <Box>
      <Heading size="3xl">V</Heading>
    </Box>
    <Spacer />
    {/* <Box>
      <ButtonGroup>
        <Button color="white" colorScheme="whitealpha" variant="ghost">
          Sign in
        </Button>
      </ButtonGroup>
    </Box> */}
  </Flex>
);

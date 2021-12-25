import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { HeroPage } from "components/HeroPage";
import { CreateControllerButton } from "pages/controllers/CreateControllerButton";
import { NavLink, useRouteMatch } from "react-router-dom";
import { DefaultControllers } from "./DefaultControllers";
import { UserControllers } from "./UserControllers";

function getTabIndexFromPath(path: string) {
  switch (path) {
    case "/controllers":
      return 0;
    case "/controllers/built-in":
      return 1;
  }

  throw new Error("Got unexpected path");
}

export const ControllerLists = () => {
  const { path } = useRouteMatch();

  return (
    <HeroPage>
      <Box w="800px">
        <Flex alignItems="center" justifyContent="space-between" mb="30px">
          <Text fontSize="2xl">Controllers</Text>
          <CreateControllerButton />
        </Flex>
        <Tabs isLazy isFitted index={getTabIndexFromPath(path)} w="800px">
          <TabList>
            <Tab as={NavLink} to="/controllers">
              My Controllers
            </Tab>
            <Tab as={NavLink} to="/controllers/built-in">
              Built-In Controllers
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UserControllers />
            </TabPanel>
            <TabPanel>
              <DefaultControllers />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </HeroPage>
  );
};

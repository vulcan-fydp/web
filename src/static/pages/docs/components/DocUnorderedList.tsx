import { UnorderedList } from "@chakra-ui/react";

export const DocUnorderedList: React.FC = ({ children }) => {
  return <UnorderedList mt="20px">{children}</UnorderedList>;
};

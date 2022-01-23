import { OrderedList } from "@chakra-ui/react";

export const DocOrderedList: React.FC = ({ children }) => {
  return <OrderedList mt="20px">{children}</OrderedList>;
};

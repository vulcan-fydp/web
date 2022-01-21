import { Heading } from "@chakra-ui/layout";
import { useDocTitle } from "./doc-content";
import { idify } from "./idify";

interface DocTitleProps {
  children: string;
}

export const DocTitle: React.FC<DocTitleProps> = ({ children: title }) => {
  const setDocTitleRef = useDocTitle();

  return (
    <Heading
      as="h1"
      fontWeight="bold"
      fontSize="5xl"
      mt="30px"
      color="purple.300"
      ref={setDocTitleRef}
      id={idify(title)}
    >
      {title}
    </Heading>
  );
};

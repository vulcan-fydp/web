import { Heading, Text } from "@chakra-ui/layout";
import { useDocSubtitle } from "./doc-content";
import { DocLink } from "./DocLink";
import { idify } from "./idify";

interface DocSubtitleProps {
  children: string;
  to?: string;
}

export const DocSubtitle: React.FC<DocSubtitleProps> = ({
  children: subtitle,
  to,
}) => {
  const setDocSubtitleRef = useDocSubtitle();

  return (
    <Heading
      as="h2"
      fontWeight="bold"
      fontSize="3xl"
      mt="20px"
      ml="10px"
      color="brightPurple.400"
      ref={setDocSubtitleRef}
      id={idify(subtitle)}
    >
      {to ? <DocLink to={to}>{subtitle}</DocLink> : subtitle}
    </Heading>
  );
};

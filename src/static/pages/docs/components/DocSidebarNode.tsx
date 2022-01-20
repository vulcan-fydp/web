import { Box, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export interface DocSidebarNodeProps {
  children?:
    | React.ReactElement<DocSidebarNodeProps>
    | React.ReactElement<DocSidebarNodeProps>[];
  label: string;
  to?: string;
}

const textProps = {
  color: "white",
  fontSize: "sm",
} as const;

export const DocSidebarNode: React.FC<DocSidebarNodeProps> = ({
  children,
  label,
  to,
}) => {
  return (
    <Box>
      {to ? (
        <Link as={RouterLink} to={to} {...textProps}>
          {label}
        </Link>
      ) : (
        <Text {...textProps}>{label}</Text>
      )}
      {children !== undefined ? <Box ml="10px">{children}</Box> : null}
    </Box>
  );
};

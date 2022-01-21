import { Link } from "@chakra-ui/layout";
import { Link as ReactRouterLink } from "react-router-dom";

interface DocLinkProps {
  to: string;
  children: string;
}

export const DocLink: React.FC<DocLinkProps> = ({ to, children }) => {
  if (to.startsWith("/")) {
    return (
      <Link as={ReactRouterLink} to={to}>
        {children}
      </Link>
    );
  }

  if (to.startsWith("#")) {
    return <Link variant="link">{children}</Link>;
  }

  return <Link href={to}>{children}</Link>;
};

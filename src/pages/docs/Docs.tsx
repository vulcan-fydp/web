import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/breadcrumb";
import { DocPage } from "pages/docs/components/DocPage";
import { Link } from "react-router-dom";
import { DocsRoutes } from ".";
import { DocLink } from "./components/DocLink";
import { DocParagraph } from "./components/DocParagraph";
import { DocSubtitle } from "./components/DocSubtitle";
import { DocTitle } from "./components/DocTitle";

export const Docs = () => {
  return (
    <DocPage>
      <DocTitle>Docs</DocTitle>
      <Breadcrumb ml="10px" mt="10px" mb="10px" color="yellow.300">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem as={Link} to={DocsRoutes.base()}>
          <BreadcrumbLink>Docs</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <DocParagraph>
        The Vulcan Gaming Platform is a software &amp; hardware platform for
        Nintendo Switch remote multiplayer.
      </DocParagraph>
      <DocSubtitle to={DocsRoutes.vulcast()}>Vulcast</DocSubtitle>
      <DocParagraph>
        <DocLink to="/docs/vulcast/connect-to-internet">
          Connecting a Vulcast to the internet
        </DocLink>
      </DocParagraph>
      <DocParagraph>
        <DocLink to="/docs/vulcast/local-non-switch-controller">
          Using a non-Switch controller locally
        </DocLink>
      </DocParagraph>
      <DocSubtitle>Relay</DocSubtitle>
      <DocParagraph>
        <DocLink to="/docs/relay/set-up">Setting up a Relay</DocLink>
      </DocParagraph>
      <DocParagraph>
        <DocLink to="/docs/relay/minimizing-latency">
          Minimizing latency
        </DocLink>
      </DocParagraph>
      <DocSubtitle>Backend</DocSubtitle>
      <DocParagraph>
        <DocLink to="/docs/backend/set-up">Setting up the Backend</DocLink>
      </DocParagraph>
      <DocSubtitle>Web App</DocSubtitle>
      <DocParagraph>
        <DocLink to="/docs/web/admin">How to use the admin portal</DocLink>
      </DocParagraph>
      <DocParagraph>
        <DocLink to="/docs/web/controller-studio">
          Creating a controller
        </DocLink>
      </DocParagraph>
      <DocParagraph>
        <DocLink to="/docs/web/why-create-an-account">
          Why you should create an account
        </DocLink>
      </DocParagraph>
      <DocSubtitle>I'm still stuck</DocSubtitle>
      <DocParagraph>
        If you aren't able to find the answer to your question then our docs
        aren't complete! Follow these steps to{" "}
        <DocLink to="/docs/filing-a-bug">create a help ticket</DocLink> and
        we'll provide support and update the docs accordingly.
      </DocParagraph>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </DocPage>
  );
};

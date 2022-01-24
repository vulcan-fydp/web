import { defineDoc } from "static/pages/docs/components/defineDoc";
import { DocParagraph, DocSubtitle } from "static/pages/docs/components";

defineDoc({
  title: "Docs",
  content: (
    <>
      <DocParagraph>Hello 👋</DocParagraph>
      <DocParagraph>
        Welcome to the Vulcan Gaming Platform Docs! Here you should find the
        answer to any questions about setting up or using the platform you may
        have.
      </DocParagraph>
      <DocSubtitle>What is the Vulcan Gaming Platform?</DocSubtitle>
      <DocParagraph>
        The Vulcan Gaming Platform is web-based solution for playing Nintendo
        Switch with your friends. The difference between Vulcan and Switch
        Multiplayer is that Vulcan only requires a single player to own a Switch
        and a copy of a game. This user (the "host") connects their console to
        the platform via a hardware device known as a Vulcast.
      </DocParagraph>
      <DocSubtitle>Getting Started</DocSubtitle>
    </>
  ),
});

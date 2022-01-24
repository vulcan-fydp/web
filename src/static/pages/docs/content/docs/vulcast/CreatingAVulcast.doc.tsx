import { defineDoc } from "static/pages/docs/components/defineDoc";
import {
  DocUnorderedList,
  DocParagraph,
  DocListItem,
  DocSubtitle,
  DocOrderedList,
} from "static/pages/docs/components";

defineDoc({
  title: "Creating A Vulcast",
  content: (
    <>
      <DocSubtitle>Shopping List</DocSubtitle>
      <DocParagraph>
        In order to set up a Vulcast you'll need the following items:
      </DocParagraph>
      <DocUnorderedList>
        <DocListItem>Raspberry pi 4</DocListItem>
        <DocListItem>Capture card</DocListItem>
        <DocListItem>USB-C splitter</DocListItem>
        <DocListItem>(Optional): HDMI splitter</DocListItem>
      </DocUnorderedList>
      <DocSubtitle>Do I Need An HDMI Splitter?</DocSubtitle>
      <DocParagraph>
        An HDMI splitter allows the host to view the video output of their
        Switch on a TV as well as passing it to the Vulcast. Otherwise they
        would have to view the video output on the Vulcan Web Client.
      </DocParagraph>
      <DocSubtitle>Setting Up The Raspberry Pi</DocSubtitle>
      <DocOrderedList>
        <DocListItem>
          Download the Vulcan Raspberry Pi image from GitHub onto an SD card
        </DocListItem>
        <DocListItem>
          Insert the SD card into the Raspberry Pi and turn it on
        </DocListItem>
      </DocOrderedList>
    </>
  ),
});

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const DocsSidebar = () => {
  return (
    <Accordion allowMultiple flex="0 0 200px" mt="50px" ml="20px" mr="20px">
      <AccordionItem border="none">
        <AccordionButton>
          Text 1 <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Accordion allowMultiple>
            <AccordionItem border="none">
              <AccordionButton>
                Text 1.1 <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <Accordion allowMultiple>
                  <AccordionItem border="none">
                    <AccordionButton
                      as={Link}
                      to="/docs/vulcast/creating-a-vulcast"
                    >
                      Text 1.1.1
                    </AccordionButton>
                  </AccordionItem>
                  <AccordionItem border="none">
                    <AccordionButton>Text 1.1.2</AccordionButton>
                  </AccordionItem>
                </Accordion>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem border="none">
              <AccordionButton>
                Text 1.2 <AccordionIcon />
              </AccordionButton>
            </AccordionItem>
          </Accordion>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

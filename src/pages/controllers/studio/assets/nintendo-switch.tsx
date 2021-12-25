import { AddIcon, MinusIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Box, Center } from "@chakra-ui/react";
import {
  Anchor,
  LayoutInputButton,
  LayoutInputComponent,
  useLayoutInputCallback,
} from "./layout";

const actionButtonStyles = {
  bg: "purple.400",
  border: "1px solid",
  borderColor: "purple.200",
  borderRadius: "50%",
  position: "absolute",
  left: "-24px",
  right: "-24px",
  top: "-24px",
  bottom: "-24px",
  zIndex: "2",
} as const;

const horizontalLineStyles = {
  backgroundColor: "purple.200",
  top: "-0.4px",
  bottom: "-0.4px",
  position: "absolute",
  zIndex: "1",
} as const;

const verticalLineStyles = {
  backgroundColor: "purple.200",
  left: "-0.4px",
  right: "-0.4px",
  position: "absolute",
  zIndex: "1",
} as const;

const inputButtonStyles = {
  position: "absolute",
  variant: "outline",
  size: "sm",
} as const;

const Button0: LayoutInputComponent = ({
  isReadOnly,
  isDisabled,
  onButtonClick,
  buttons,
}) => {
  const onClick = useLayoutInputCallback(0, onButtonClick);

  return (
    <Anchor x={205} y={83}>
      <Center {...actionButtonStyles}>A</Center>
      <Box {...horizontalLineStyles} right="-100px" left="0px" />
      <LayoutInputButton
        left="100px"
        top="-16px"
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {buttons[0]}
      </LayoutInputButton>
    </Anchor>
  );
};

const Button1: LayoutInputComponent = ({
  isReadOnly,
  isDisabled,
  onButtonClick,
  buttons,
}) => {
  const onClick = useLayoutInputCallback(1, onButtonClick);

  return (
    <Anchor x={158} y={42}>
      <Center {...actionButtonStyles}>B</Center>
      <Box {...horizontalLineStyles} right="-180px" left="0px" />
      <LayoutInputButton
        {...inputButtonStyles}
        left="180px"
        top="-16px"
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {buttons[1]}
      </LayoutInputButton>
    </Anchor>
  );
};

const Button2: LayoutInputComponent = ({
  isReadOnly,
  isDisabled,
  onButtonClick,
  buttons,
}) => {
  const onClick = useLayoutInputCallback(2, onButtonClick);

  return (
    <Anchor x={158} y={123}>
      <Center {...actionButtonStyles}>X</Center>
      <Box {...horizontalLineStyles} right="-180px" left="0px" />
      <LayoutInputButton
        left="180px"
        top="-16px"
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {buttons[2]}
      </LayoutInputButton>
    </Anchor>
  );
};

const Button3: LayoutInputComponent = ({
  isReadOnly,
  isDisabled,
  onButtonClick,
  buttons,
}) => {
  const onClick = useLayoutInputCallback(3, onButtonClick);

  return (
    <Anchor x={111} y={83}>
      <Center {...actionButtonStyles}>Y</Center>
      <Box
        borderLeft="1px"
        borderTop="1px"
        borderStyle="solid"
        borderColor="purple.200"
        borderTopLeftRadius="5px"
        right="-195px"
        top="-80px"
        left="0"
        bottom="0"
        position="absolute"
      />
      <LayoutInputButton
        left="195px"
        top="-96px"
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {buttons[3]}
      </LayoutInputButton>
    </Anchor>
  );
};

const smallActionButtonStyles = {
  bg: "purple.400",
  border: "1px solid",
  borderColor: "purple.200",
  borderRadius: "50%",
  position: "absolute",
  left: "-16px",
  right: "-16px",
  top: "-16px",
  bottom: "-16px",
  zIndex: "2",
} as const;

const Button4: LayoutInputComponent = ({
  isReadOnly,
  isDisabled,
  onButtonClick,
  buttons,
}) => {
  const onClick = useLayoutInputCallback(4, onButtonClick);
  return (
    <Anchor x={-180} y={190}>
      <Box {...horizontalLineStyles} left="-75px" right="0" />
      <LayoutInputButton
        right="75px"
        top="-16px"
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {buttons[4]}
      </LayoutInputButton>
    </Anchor>
  );
};

const Button5: LayoutInputComponent = ({
  isReadOnly,
  isDisabled,
  onButtonClick,
  buttons,
}) => {
  const onClick = useLayoutInputCallback(5, onButtonClick);
  return (
    <Anchor x={160} y={195}>
      <Box
        borderLeft="1px"
        borderTop="1px"
        borderStyle="solid"
        borderColor="purple.200"
        borderTopLeftRadius="5px"
        right="-70px"
        top="-40px"
        left="0"
        bottom="0"
        position="absolute"
      />
      <LayoutInputButton
        left="70px"
        top="-56px"
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {buttons[5]}
      </LayoutInputButton>
    </Anchor>
  );
};

const Button6: LayoutInputComponent = ({
  isReadOnly,
  isDisabled,
  onButtonClick,
  buttons,
}) => {
  const onClick = useLayoutInputCallback(6, onButtonClick);
  return (
    <Anchor x={-160} y={206}>
      <Box
        borderRight="1px"
        borderTop="1px"
        borderStyle="solid"
        borderColor="purple.200"
        borderTopRightRadius="5px"
        right="0px"
        top="-24px"
        left="-50px"
        bottom="0px"
        position="absolute"
      />
      <LayoutInputButton
        right="50px"
        top="-38px"
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {buttons[6]}
      </LayoutInputButton>
    </Anchor>
  );
};

const Button7: LayoutInputComponent = ({
  isReadOnly,
  isDisabled,
  onButtonClick,
  buttons,
}) => {
  const onClick = useLayoutInputCallback(7, onButtonClick);
  return (
    <Anchor x={140} y={208}>
      <Box
        borderLeft="1px"
        borderTop="1px"
        borderStyle="solid"
        borderColor="purple.200"
        borderTopLeftRadius="5px"
        right="-55px"
        top="-70px"
        left="0"
        bottom="0"
        position="absolute"
      />
      <LayoutInputButton
        left="55px"
        top="-86px"
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {buttons[7]}
      </LayoutInputButton>
    </Anchor>
  );
};

const Button8: LayoutInputComponent = ({
  isReadOnly,
  isDisabled,
  onButtonClick,
  buttons,
}) => {
  const onClick = useLayoutInputCallback(8, onButtonClick);
  return (
    <Anchor x={-73} y={130}>
      <Center {...smallActionButtonStyles}>
        <MinusIcon />
      </Center>
      <Box
        borderRight="1px"
        borderTop="1px"
        borderStyle="solid"
        borderColor="purple.200"
        borderTopRightRadius="5px"
        right="-60px"
        top="0"
        left="0"
        bottom="-280px"
        position="absolute"
      />
      <LayoutInputButton
        right="-80px"
        top="280px"
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {buttons[8]}
      </LayoutInputButton>
    </Anchor>
  );
};

const Button9: LayoutInputComponent = ({
  isReadOnly,
  isDisabled,
  onButtonClick,
  buttons,
}) => {
  const onClick = useLayoutInputCallback(9, onButtonClick);
  return (
    <Anchor x={73} y={130}>
      <Center {...smallActionButtonStyles}>
        <AddIcon />
      </Center>
      <Box
        borderRight="1px"
        borderTop="1px"
        borderStyle="solid"
        borderColor="purple.200"
        borderTopRightRadius="5px"
        right="0px"
        top="-140px"
        left="-40px"
        bottom="0px"
        position="absolute"
      />
      <LayoutInputButton
        right="40px"
        top="-156px"
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {buttons[9]}
      </LayoutInputButton>
    </Anchor>
  );
};

const Button10AndAxis01: LayoutInputComponent = ({
  isReadOnly,
  isDisabled,
  onButtonClick: rawOnButtonClick,
  onAxisClick: rawOnAxisClick,
  buttons,
  axes,
}) => {
  const onButtonClick = useLayoutInputCallback(10, rawOnButtonClick);
  const onXAxisClick = useLayoutInputCallback(0, rawOnAxisClick);
  const onYAxisClick = useLayoutInputCallback(1, rawOnAxisClick);

  return (
    <Anchor x={-166} y={83}>
      <Box
        left="-40px"
        right="-40px"
        top="-40px"
        bottom="-40px"
        backgroundColor="purple.400"
        position="absolute"
        borderRadius="50%"
        border="3px solid"
        borderColor="purple.200"
        padding="6px"
      >
        <Box
          width="100%"
          height="100%"
          backgroundColor="purple.400"
          borderRadius="50%"
          border="3px solid"
          borderColor="purple.200"
        ></Box>
      </Box>
      {/* Button */}
      <Box
        borderRight="1px"
        borderBottom="1px"
        borderStyle="solid"
        borderColor="purple.200"
        borderBottomRightRadius="5px"
        right="0"
        top="0"
        left="-170px"
        bottom="-8px"
        position="absolute"
      />
      <LayoutInputButton
        right="170px"
        top="-9px"
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onClick={onButtonClick}
      >
        {buttons[10]}
      </LayoutInputButton>
      {/* Left/Right axis */}
      <Box
        borderLeft="1px"
        borderBottom="1px"
        borderStyle="solid"
        borderColor="purple.200"
        borderBottomLeftRadius="5px"
        right="33px"
        top="-15px"
        left="-80.5px"
        bottom="0"
        position="absolute"
      />
      <Box
        borderRight="1px"
        borderTop="1px"
        borderStyle="solid"
        borderColor="purple.200"
        borderTopRightRadius="5px"
        right="80px"
        top="-30px"
        left="-135px"
        bottom="15px"
        position="absolute"
      />
      <LayoutInputButton
        right="135px"
        top="-46px"
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onClick={onXAxisClick}
      >
        {axes[0]}
      </LayoutInputButton>
      {/* Up/Down axis */}
      <Box
        borderRight="1px"
        borderTop="1px"
        borderStyle="solid"
        borderColor="purple.200"
        borderTopRightRadius="5px"
        right="0px"
        top="-68px"
        left="-170px"
        bottom="34px"
        position="absolute"
      />
      <LayoutInputButton
        right="170px"
        top="-84px"
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onClick={onYAxisClick}
      >
        {axes[1]}
      </LayoutInputButton>
    </Anchor>
  );
};

const Button11AndAxis23: LayoutInputComponent = ({
  isReadOnly,
  isDisabled,
  onButtonClick: rawOnButtonClick,
  onAxisClick: rawOnAxisClick,
  buttons,
  axes,
}) => {
  const onButtonClick = useLayoutInputCallback(11, rawOnButtonClick);
  const onXAxisClick = useLayoutInputCallback(2, rawOnAxisClick);
  const onYAxisClick = useLayoutInputCallback(3, rawOnAxisClick);

  return (
    <Anchor x={79} y={1}>
      <Box
        left="-40px"
        right="-40px"
        top="-40px"
        bottom="-40px"
        backgroundColor="purple.400"
        position="absolute"
        borderRadius="50%"
        border="3px solid"
        borderColor="purple.200"
        padding="6px"
      >
        <Box
          width="100%"
          height="100%"
          backgroundColor="purple.400"
          borderRadius="50%"
          border="3px solid"
          borderColor="purple.200"
        ></Box>
      </Box>
      {/* Button */}
      <Box {...horizontalLineStyles} right="-225px" left="0px" />
      <LayoutInputButton
        left="225px"
        top="-16px"
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onClick={onButtonClick}
      >
        {buttons[11]}
      </LayoutInputButton>
      {/* Left/Right axis */}
      <Box
        borderLeft="1px"
        borderBottom="1px"
        borderStyle="solid"
        borderColor="purple.200"
        borderBottomLeftRadius="5px"
        right="5px"
        top="0px"
        left="-34px"
        bottom="-175px"
        position="absolute"
      />
      <LayoutInputButton
        left="-5px"
        top="159px"
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onClick={onXAxisClick}
      >
        {axes[2]}
      </LayoutInputButton>
      {/* Up/Down axis */}
      <Box {...verticalLineStyles} top="34px" bottom="-120px" />
      <LayoutInputButton
        left="-25px"
        top="120px"
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onClick={onYAxisClick}
      >
        {axes[3]}
      </LayoutInputButton>
    </Anchor>
  );
};

const dpadStyles = {
  backgroundColor: "purple.400",
  borderTop: "1px",
  borderLeft: "1px",
  borderRight: "1px",
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
  borderStyle: "solid",
  borderColor: "purple.200",
  left: "-16px",
  right: "-16px",
  top: "-16px",
  bottom: "-16px",
  position: "absolute",
  zIndex: "2",
} as const;

const Button12: LayoutInputComponent = ({
  isReadOnly,
  isDisabled,
  onButtonClick,
  buttons,
}) => {
  const onClick = useLayoutInputCallback(12, onButtonClick);
  return (
    <Anchor x={-92} y={31}>
      <Center {...dpadStyles}>
        <TriangleUpIcon />
      </Center>
      <Box
        {...horizontalLineStyles}
        left="-205px"
        right="0px"
        top="-7px"
        bottom="6px"
      />
      <LayoutInputButton
        right="205px"
        top="-23px"
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {buttons[12]}
      </LayoutInputButton>
    </Anchor>
  );
};

const Button13: LayoutInputComponent = ({
  isReadOnly,
  isDisabled,
  onButtonClick,
  buttons,
}) => {
  const onClick = useLayoutInputCallback(13, onButtonClick);
  return (
    <Anchor x={-92} y={-31}>
      <Center {...dpadStyles} transform="rotate(180deg)">
        <TriangleUpIcon />
      </Center>
      <Box
        {...horizontalLineStyles}
        left="-205px"
        right="0px"
        top="6.5px" // This should be 6 but chrome is rendering 2px instead of 1 ???
        bottom="-7px"
      />
      <LayoutInputButton
        right="205px"
        top="-9px"
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {buttons[13]}
      </LayoutInputButton>
    </Anchor>
  );
};

const Button14: LayoutInputComponent = ({
  isReadOnly,
  isDisabled,
  onButtonClick,
  buttons,
}) => {
  const onClick = useLayoutInputCallback(14, onButtonClick);
  return (
    <Anchor x={-123} y={0}>
      <Center {...dpadStyles} transform="rotate(270deg)">
        <TriangleUpIcon />
      </Center>
      <Box {...horizontalLineStyles} left="-205px" right="0px" top="0" />
      <LayoutInputButton
        right="205px"
        top="-16px"
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {buttons[14]}
      </LayoutInputButton>
    </Anchor>
  );
};

const Button15: LayoutInputComponent = ({
  isReadOnly,
  isDisabled,
  onButtonClick,
  buttons,
}) => {
  const onClick = useLayoutInputCallback(15, onButtonClick);
  return (
    <Anchor x={-61} y={0}>
      <Center {...dpadStyles} transform="rotate(90deg)">
        <TriangleUpIcon />
      </Center>
      <Box
        borderRight="1px"
        borderBottom="1px"
        borderStyle="solid"
        borderColor="purple.200"
        borderBottomRightRadius="5px"
        right="0"
        top="0"
        left="-270px"
        bottom="-76px"
        position="absolute"
      />
      <LayoutInputButton
        right="270px"
        top="60px"
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {buttons[15]}
      </LayoutInputButton>
    </Anchor>
  );
};

const Button16: LayoutInputComponent = ({
  isReadOnly,
  isDisabled,
  onButtonClick,
  buttons,
}) => {
  const onClick = useLayoutInputCallback(16, onButtonClick);
  return (
    <Anchor x={43} y={83}>
      <Box
        position="absolute"
        left="-20px"
        right="-20px"
        top="-20px"
        bottom="-20px"
        border="2px solid"
        borderColor="purple.200"
        borderRadius="50%"
        padding="3px"
        backgroundColor="purple.400"
        zIndex="2"
      >
        <Center
          border="2px solid"
          borderColor="purple.200"
          borderRadius="50%"
          width="100%"
          height="100%"
        >
          H
        </Center>
      </Box>
      <Box
        borderRight="1px"
        borderTop="1px"
        borderStyle="solid"
        borderColor="purple.200"
        borderTopRightRadius="5px"
        right="0px"
        top="-145px"
        left="-40px"
        bottom="0px"
        position="absolute"
        zIndex="1"
      />
      <LayoutInputButton
        right="40px"
        top="-161px"
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {buttons[16]}
      </LayoutInputButton>
    </Anchor>
  );
};

const NintendoSwitchAsset = () => (
  <svg
    style={{ margin: "0 auto", zIndex: 1 }}
    width="600px"
    height="auto"
    viewBox="0 0 38.107548 26.544682"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(-26.715988 -25.930946)">
      <g fill="#898989">
        <path d="m40.117447 26.434603-.624252.05374.795353.367393 7.290438-.0527 3.671461.0527.483862-.202028.422741-.192731-2.134264-.113194-7.730794-.0083z" />
        <path
          d="m0 0c.97 0 1.947.018 2.915-.069.882-.079 1.775-.298 2.525-.787.831-.543 1.467-1.321 2.024-2.13.603-.875 1.107-1.814 1.588-2.76 1.022-2.008 1.947-4.064 2.984-6.066.834-1.613 1.686-3.225 2.631-4.777.919-1.506 1.938-2.97 3.392-4.003 1.503-1.066 3.336-1.637 5.18-1.512 1.955.131 3.826 1.004 5.325 2.242 2.776 2.292 4.007 5.817 4.231 9.323.141 2.206-.03 4.435-.263 6.631-.185 1.74-.404 3.484-.689 5.211-.21 1.277-.421 2.554-.631 3.83-.368 2.226-.735 4.451-1.104 6.678-.277 1.679-.554 3.359-.832 5.04-.367 2.229-.78 4.453-1.212 6.672-.321 1.641-.665 3.275-.959 4.921-.375 2.109-.842 4.21-1.362 6.288-.266 1.071-.559 2.136-.885 3.19-.165.529-.337 1.055-.521 1.577-.096.272-.194.544-.296.816-.097.255-.175.507-.341.726-.344.456-.687.912-1.032 1.369-.179.238-.359.475-.536.712-.133.176-.296.428-.506.521-.824.362-1.619.781-2.395 1.24-.957.565-1.897 1.16-2.882 1.677-.977.511-1.987.958-3.023 1.335-2.116.77-4.323 1.245-6.551 1.555-2.295.32-4.612.492-6.923.633-2.316.141-4.636.232-6.955.294-4.627.125-9.257.134-13.886.134-4.63 0-9.26-.009-13.887-.134-2.32-.062-4.639-.153-6.955-.294-2.313-.141-4.629-.313-6.924-.633-2.226-.31-4.435-.785-6.551-1.555-1.035-.377-2.046-.824-3.022-1.335-.985-.517-1.925-1.112-2.883-1.677-.774-.459-1.57-.878-2.394-1.24-.21-.093-.374-.345-.505-.521-.18-.237-.358-.474-.537-.712-.344-.457-.689-.913-1.034-1.369-.165-.219-.244-.471-.339-.726-.102-.272-.2-.544-.296-.816-.183-.522-.357-1.048-.521-1.577-.328-1.054-.619-2.119-.887-3.19-.517-2.078-.985-4.179-1.361-6.288-.294-1.646-.638-3.28-.958-4.921-.433-2.219-.845-4.443-1.214-6.672-.277-1.681-.554-3.361-.832-5.04-.367-2.227-.734-4.452-1.101-6.678-.211-1.276-.422-2.553-.633-3.83-.285-1.727-.504-3.471-.688-5.211-.233-2.196-.404-4.425-.263-6.631.222-3.506 1.455-7.031 4.23-9.323 1.499-1.238 3.37-2.111 5.324-2.242 1.846-.125 3.678.446 5.18 1.512 1.456 1.033 2.475 2.497 3.393 4.003.947 1.552 1.796 3.164 2.632 4.777 1.036 2.002 1.961 4.058 2.984 6.066.481.946.985 1.885 1.587 2.76.558.809 1.193 1.587 2.025 2.13.75.489 1.643.708 2.525.787.967.087 1.944.069 2.915.069z"
          stroke="#231916"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width=".35"
          transform="matrix(.35277777 0 0 -.35277777 53.17439 44.610093)"
        />
      </g>
      <g>
        <path
          d="m0 0c-3.757 0-6.804 3.046-6.804 6.804 0 3.756 3.047 6.803 6.804 6.803s6.803-3.047 6.803-6.803c0-3.758-3.046-6.804-6.803-6.804"
          fill="#dcdddd"
          transform="matrix(.35277777 0 0 -.35277777 50.769717 41.603544)"
        />
        <path
          d="m0 0c-3.758 0-6.804 3.047-6.804 6.804 0 3.758 3.046 6.803 6.804 6.803 3.757 0 6.803-3.045 6.803-6.803 0-3.757-3.046-6.804-6.803-6.804"
          fill="#dcdddd"
          transform="matrix(.35277777 0 0 -.35277777 35.269861 36.353929)"
        />
        <path
          d="m0 0c0 .06.025.146.059.195.076.115.159.16.297.159 1.382 0 2.767-.002 4.151-.004.47-.002.85.379.85.848v1.73 1.728c0 .471-.38.851-.85.85-1.384-.002-2.769-.004-4.151-.006-.197 0-.356.158-.356.354.002 1.384.004 2.768.006 4.152.002.47-.379.851-.849.851-1.153-.001-2.305-.001-3.458 0-.47 0-.85-.381-.849-.851.002-1.384.004-2.768.006-4.152 0-.145-.049-.231-.174-.305-.047-.028-.126-.049-.181-.049-1.384.002-2.768.004-4.151.006-.471.001-.852-.379-.852-.85v-1.728-1.73c0-.469.381-.85.852-.848 1.383.002 2.767.004 4.151.004.138.001.22-.044.296-.159.033-.049.059-.135.059-.195-.002-1.383-.004-2.768-.006-4.151-.001-.47.379-.851.849-.851h3.458c.47 0 .851.381.849.851-.002 1.383-.004 2.768-.006 4.151"
          fill="#666565"
          transform="matrix(.35277777 0 0 -.35277777 40.802016 40.236178)"
        />
        <path
          d="m0 0c0-2.201-1.785-3.986-3.986-3.986s-3.987 1.785-3.987 3.986c0 2.202 1.786 3.986 3.987 3.986s3.986-1.784 3.986-3.986"
          fill="#666565"
          transform="matrix(.35277777 0 0 -.35277777 54.263381 33.953699)"
        />
        <path
          d="m0 0c0-2.201 1.785-3.986 3.986-3.986s3.987 1.785 3.987 3.986-1.786 3.986-3.987 3.986-3.986-1.785-3.986-3.986"
          fill="#666565"
          transform="matrix(.35277777 0 0 -.35277777 54.425976 36.528589)"
        />
        <path
          d="m0 0c0 2.202 1.784 3.986 3.985 3.986 2.202 0 3.987-1.784 3.987-3.986 0-2.201-1.785-3.986-3.987-3.986-2.201 0-3.985 1.785-3.985 3.986"
          fill="#666565"
          transform="matrix(.35277777 0 0 -.35277777 57.401163 33.953699)"
        />
        <path
          d="m0 0c0-2.202-1.785-3.986-3.986-3.986s-3.987 1.784-3.987 3.986 1.786 3.986 3.987 3.986 3.986-1.784 3.986-3.986"
          fill="#666565"
          transform="matrix(.35277777 0 0 -.35277777 57.238568 31.378492)"
        />
        <path
          d="m0 0v2.87c0 .392.317.709.709.709h2.87c.391 0 .709-.317.709-.709v-2.87c0-.392-.318-.708-.709-.708h-2.87c-.392 0-.709.316-.709.708"
          fill="#666565"
          transform="matrix(.35277777 0 0 -.35277777 42.313387 34.459794)"
        />
        <path
          d="m0 0c0 1.331 1.078 2.408 2.409 2.408s2.41-1.077 2.41-2.408-1.079-2.41-2.41-2.41-2.409 1.079-2.409 2.41"
          fill="#666565"
          transform="matrix(.35277777 0 0 -.35277777 49.619732 31.078455)"
        />
        <path
          d="m0 0c0 1.331 1.079 2.408 2.409 2.408s2.409-1.077 2.409-2.408-1.079-2.41-2.409-2.41-2.409 1.079-2.409 2.41"
          fill="#666565"
          transform="matrix(.35277777 0 0 -.35277777 40.219792 31.078455)"
        />
        <path
          d="m0 0c0-1.33-1.078-2.409-2.41-2.409-1.33 0-2.408 1.079-2.408 2.409 0 1.331 1.078 2.411 2.408 2.411 1.332 0 2.41-1.08 2.41-2.411"
          fill="#666565"
          transform="matrix(.35277777 0 0 -.35277777 49.319659 33.953699)"
        />
        <path
          d="m0 0c3.287 0 5.952 2.665 5.952 5.952 0 3.288-2.665 5.954-5.952 5.954s-5.952-2.666-5.952-5.954c0-3.287 2.665-5.952 5.952-5.952"
          fill="#666565"
          transform="matrix(.35277777 0 0 -.35277777 50.769717 41.303824)"
        />
        <path
          d="m0 0c3.287 0 5.951 2.666 5.951 5.954s-2.664 5.953-5.951 5.953c-3.288 0-5.953-2.665-5.953-5.953s2.665-5.954 5.953-5.954"
          fill="#666565"
          transform="matrix(.35277777 0 0 -.35277777 35.269861 36.054174)"
        />
        <path
          d="m0 0h.469c.365 0 .683.137.683.482 0 .327-.234.489-.637.489h-.515zm0 1.177h.508c.242 0 .525.104.525.434 0 .315-.269.434-.596.434h-.437zm-.252 1.086h.738c.379 0 .799-.137.799-.634 0-.26-.175-.473-.437-.533v-.006c.322-.035.56-.26.56-.621 0-.413-.353-.686-.926-.686h-.734z"
          fill="#fff"
          transform="matrix(.35277777 0 0 -.35277777 55.653819 36.88754)"
        />
        <path
          d="m0 0h1.092l-.546 1.317zm-.365-.883h-.277l1.073 2.481h.245l1.064-2.481h-.279l-.273.653h-1.284z"
          fill="#fff"
          transform="matrix(.35277777 0 0 -.35277777 58.613836 34.028136)"
        />
        <path
          d="m0 0 .677 1.002h.302l-.825-1.181.911-1.3h-.315l-.756 1.118-.754-1.118h-.315l.911 1.303-.83 1.178h.314z"
          fill="#fff"
          transform="matrix(.35277777 0 0 -.35277777 55.834336 31.292732)"
        />
        <path
          d="m0 0h-.253v1.068l-.928 1.412h.316l.746-1.202.753 1.202h.295l-.929-1.412z"
          fill="#fff"
          transform="matrix(.35277777 0 0 -.35277777 52.902223 34.389168)"
        />
        <path
          d="m0 0c.716.329 1.411.7 2.09 1.103.958.565 1.897 1.16 2.883 1.676.976.512 1.987.958 3.022 1.335 2.115.771 4.324 1.245 6.551 1.556 2.295.319 4.611.492 6.924.633 1.766.107 3.535.185 5.304.244-.957.419-3.07 1.339-4.031 1.751l-.002.001c-.057.025-.115.05-.173.075l-.003.001c-.824.354-1.619.628-2.546.618-.414-.005-1.138-.042-1.551-.073-1.725-.132-3.439-.32-5.149-.583-.421-.064-.841-.135-1.261-.21-1.323-.236-2.618-.522-3.889-.978-.623-.222-1.662-.696-2.238-1.023-1.277-.724-2.432-1.567-3.516-2.556-.26-.236-.474-.499-.658-.797-.001.001-.002.001-.002.001l.002-.001c-.484-.772-1.277-2.012-1.77-2.78z"
          fill="#666565"
          transform="matrix(.35277777 0 0 -.35277777 30.843276 29.165376)"
        />
        <path
          d="m0 0c-.716.329-1.411.7-2.09 1.103-.958.565-1.897 1.16-2.883 1.676-.976.512-1.987.958-3.022 1.335-2.115.771-4.324 1.245-6.551 1.556-2.295.319-4.611.492-6.924.633-1.766.107-3.535.185-5.304.244.957.419 3.07 1.339 4.031 1.751l.002.001c.057.025.115.05.173.075l.003.001c.824.354 1.619.628 2.546.618.415-.005 1.138-.042 1.551-.073 1.725-.132 3.439-.32 5.149-.583.421-.064.842-.135 1.261-.21 1.323-.236 2.618-.522 3.889-.978.623-.222 1.662-.696 2.238-1.023 1.277-.724 2.432-1.567 3.516-2.556.26-.236.474-.499.658-.797.001.001.002.001.002.001l-.002-.001c.484-.772 1.278-2.012 1.77-2.78z"
          fill="#666565"
          transform="matrix(.35277777 0 0 -.35277777 60.695719 29.165376)"
        />
        <path
          d="m0 0c-.048-.084-.128-.084-.175 0l-.601 1.041c-.048.082-.008.15.088.15h1.201c.096 0 .135-.068.086-.15z"
          fill="#fff"
          transform="matrix(.35277777 0 0 -.35277777 39.925222 41.285903)"
        />
        <path
          d="m0 0c.048.083.128.083.176 0l.598-1.039c.05-.085.01-.151-.086-.151h-1.201c-.095 0-.135.066-.088.151z"
          fill="#fff"
          transform="matrix(.35277777 0 0 -.35277777 39.863239 37.163518)"
        />
        <path
          d="m0 0c.082-.047.082-.126 0-.176l-1.041-.599c-.084-.048-.151-.01-.151.086v1.202c0 .096.067.135.151.089z"
          fill="#fff"
          transform="matrix(.35277777 0 0 -.35277777 41.977472 39.172341)"
        />
        <path
          d="m0 0c-.084.048-.084.128 0 .174l1.04.601c.083.049.152.009.152-.087v-1.202c0-.095-.069-.135-.152-.087z"
          fill="#fff"
          transform="matrix(.35277777 0 0 -.35277777 37.854029 39.233654)"
        />
        <path
          d="m0 0h-.439v.984h-.985v.44h.985v.984h.439v-.984h.984v-.44h-.984z"
          fill="#231916"
          transform="matrix(.35277777 0 0 -.35277777 50.544045 31.502882)"
        />
        <path
          d="m41.493919 31.162628h-.849489v-.15487h.849489z"
          fill="#231916"
        />
        <path
          d="m0 0c0-.062-.025-.087-.087-.087h-.695c-.061 0-.086.025-.086.087v.521c0 .062.025.087.086.087h.695c.059 0 .084-.024.087-.083zm.92.848c-.433.368-.865.736-1.298 1.103-.041.035-.072.035-.113 0-.432-.367-.865-.735-1.297-1.103-.078-.067-.047-.153.056-.153h.167c.062 0 .087-.025.087-.088v-1.128c0-.063.026-.088.087-.088h1.913c.061 0 .086.025.086.088v1.128c0 .063.026.088.088.088h.167c.103 0 .135.086.057.153"
          fill="#231916"
          transform="matrix(.35277777 0 0 -.35277777 48.620665 34.131464)"
        />
        <g stroke="#231916" stroke-width=".35">
          <path
            d="m0 0c0 .06.025.146.059.195.076.115.159.16.297.159 1.382 0 2.767-.002 4.151-.004.47-.002.85.379.85.848v1.73 1.728c0 .471-.38.851-.85.85-1.384-.002-2.769-.004-4.151-.006-.197 0-.356.158-.356.354.002 1.384.004 2.768.006 4.152.002.47-.379.851-.849.851-1.153-.001-2.305-.001-3.458 0-.47 0-.85-.381-.849-.851.002-1.384.004-2.768.006-4.152 0-.145-.049-.231-.174-.305-.047-.028-.126-.049-.181-.049-1.384.002-2.768.004-4.151.006-.471.001-.852-.379-.852-.85v-1.728-1.73c0-.469.381-.85.852-.848 1.383.002 2.767.004 4.151.004.138.001.22-.044.296-.159.033-.049.059-.135.059-.195-.002-1.383-.004-2.768-.006-4.151-.001-.47.379-.851.849-.851h3.458c.47 0 .851.381.849.851-.002 1.383-.004 2.768-.006 4.151z"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 40.802016 40.236178)"
          />
          <path
            d="m0 0c0-1.839 1.492-3.329 3.33-3.329 1.84 0 3.332 1.49 3.332 3.329 0 1.84-1.492 3.331-3.332 3.331-1.838 0-3.33-1.491-3.33-3.331z"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 47.294644 33.953699)"
          />
          <path
            d="m0 0c0-2.201-1.785-3.986-3.986-3.986s-3.987 1.785-3.987 3.986c0 2.202 1.786 3.986 3.987 3.986s3.986-1.784 3.986-3.986z"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 54.263381 33.953699)"
          />
          <path
            d="m0 0c0-2.201 1.785-3.986 3.986-3.986s3.987 1.785 3.987 3.986-1.786 3.986-3.987 3.986-3.986-1.785-3.986-3.986z"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 54.425976 36.528589)"
          />
          <path
            d="m0 0c0 2.202 1.784 3.986 3.985 3.986 2.202 0 3.987-1.784 3.987-3.986 0-2.201-1.785-3.986-3.987-3.986-2.201 0-3.985 1.785-3.985 3.986z"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 57.401163 33.953699)"
          />
          <path
            d="m0 0c0-2.202-1.785-3.986-3.986-3.986s-3.987 1.784-3.987 3.986 1.786 3.986 3.987 3.986 3.986-1.784 3.986-3.986z"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 57.238568 31.378492)"
          />
          <path
            d="m0 0v-.008h.015"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 43.694512 33.227471)"
          />
          <path
            d="m0 0v2.87c0 .392.317.709.709.709h2.87c.391 0 .709-.317.709-.709v-2.87c0-.392-.318-.708-.709-.708h-2.87c-.392 0-.709.316-.709.708z"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 42.313387 34.459794)"
          />
          <path
            d="m0 0c.492.768 1.286 2.008 1.77 2.78l-.002.001s.001 0 .002-.001c.184.298.398.561.658.797 1.084.988 2.239 1.832 3.515 2.556.577.327 1.616.801 2.239 1.023 1.271.455 2.566.741 3.888.978.42.075.841.145 1.262.21 1.71.262 3.424.451 5.148.583.414.031 1.137.068 1.551.073.928.01 1.723-.265 2.547-.618l.003-.001c.058-.026.115-.05.173-.075l.002-.001c.961-.412 3.074-1.332 4.031-1.751"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 30.838796 29.167775)"
          />
          <path
            d="m0 0c-3.757 0-6.804 3.046-6.804 6.804 0 3.756 3.047 6.803 6.804 6.803s6.803-3.047 6.803-6.803c0-3.758-3.046-6.804-6.803-6.804z"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 50.769717 41.603544)"
          />
          <path
            d="m0 0c0 1.331 1.078 2.408 2.409 2.408s2.41-1.077 2.41-2.408-1.079-2.41-2.41-2.41-2.409 1.079-2.409 2.41z"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 49.619732 31.078455)"
          />
          <path
            d="m0 0c0 1.331 1.079 2.408 2.409 2.408s2.409-1.077 2.409-2.408-1.079-2.41-2.409-2.41-2.409 1.079-2.409 2.41z"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 40.219792 31.078455)"
          />
          <path
            d="m0 0c0-1.33-1.078-2.409-2.41-2.409-1.33 0-2.408 1.079-2.408 2.409 0 1.331 1.078 2.411 2.408 2.411 1.332 0 2.41-1.08 2.41-2.411z"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 49.319659 33.953699)"
          />
          <path
            d="m0 0c-3.758 0-6.804 3.047-6.804 6.804 0 3.758 3.046 6.803 6.804 6.803 3.757 0 6.803-3.045 6.803-6.803 0-3.757-3.046-6.804-6.803-6.804z"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 35.269861 36.353929)"
          />
          <path
            d="m0 0c-.023-.127.065-.328.129-.475.083-.189.174-.372.267-.556.24-.475.51-.935.781-1.393.578-.978 1.169-1.951 1.787-2.904 1.255-1.934 2.56-3.834 3.889-5.717 2.649-3.755 5.403-7.437 8.205-11.08 1.057-1.377 2.108-2.76 3.275-4.047.568-.627 1.143-1.249 1.715-1.873.275-.301.557-.598.847-.885.149-.146.299-.291.456-.428.092-.083.291-.284.408-.253"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 28.829268 34.428432)"
          />
          <path
            d="m0 0c-.49.768-1.285 2.008-1.768 2.78l.001.001c-.001 0-.001 0-.001-.001-.185.298-.398.561-.658.797-1.084.988-2.24 1.832-3.515 2.556-.577.327-1.616.801-2.241 1.023-1.269.455-2.566.741-3.888.978-.42.075-.84.145-1.262.21-1.709.262-3.423.451-5.147.583-.414.031-1.136.068-1.551.073-.927.01-1.722-.265-2.548-.618l-.002-.001c-.058-.026-.115-.05-.173-.075l-.003-.001c-.961-.412-3.072-1.332-4.031-1.751"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 60.700199 29.167775)"
          />
          <path
            d="m0 0c-4.652.222-9.961.398-14.617.413-1.744.006-5.234.005-6.978 0-4.656-.013-9.964-.191-14.616-.413"
            fill="#898989"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 52.157051 26.460982)"
          />
          <path
            d="m0 0c.023-.127-.066-.328-.129-.475-.082-.189-.174-.372-.267-.556-.241-.475-.51-.935-.781-1.393-.577-.978-1.169-1.951-1.788-2.904-1.254-1.934-2.56-3.834-3.888-5.717-2.649-3.755-5.403-7.437-8.204-11.08-1.058-1.377-2.109-2.76-3.275-4.047-.568-.627-1.144-1.249-1.715-1.873-.276-.301-.557-.598-.848-.885-.148-.146-.299-.291-.456-.428-.092-.083-.292-.284-.409-.253"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 62.71008 34.428432)"
          />
          <path
            d="m0 0c0-.743-.602-1.347-1.345-1.347-.744 0-1.347.604-1.347 1.347s.603 1.347 1.347 1.347c.743 0 1.345-.604 1.345-1.347z"
            fill="none"
            stroke-miterlimit="10"
            transform="matrix(.35277777 0 0 -.35277777 43.541195 33.960967)"
          />
          <path
            d="m0 0c3.287 0 5.952 2.665 5.952 5.952 0 3.288-2.665 5.954-5.952 5.954s-5.952-2.666-5.952-5.954c0-3.287 2.665-5.952 5.952-5.952z"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 50.769717 41.303824)"
          />
          <path
            d="m0 0c-2.491 0-4.511 2.019-4.511 4.51 0 2.492 2.02 4.511 4.511 4.511s4.51-2.019 4.51-4.51c0-2.492-2.019-4.511-4.51-4.511z"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 50.769717 40.794978)"
          />
          <path
            d="m0 0c3.287 0 5.951 2.666 5.951 5.954s-2.664 5.953-5.951 5.953c-3.288 0-5.953-2.665-5.953-5.953s2.665-5.954 5.953-5.954z"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 35.269861 36.054174)"
          />
          <path
            d="m0 0c-2.492 0-4.511 2.018-4.511 4.51 0 2.49 2.019 4.509 4.511 4.509 2.49 0 4.51-2.019 4.51-4.509 0-2.492-2.02-4.51-4.51-4.51z"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 35.269861 35.544657)"
          />
          <path
            d="m0 0c0 4.695-3.808 8.504-8.504 8.504-4.697 0-8.504-3.809-8.504-8.504 0-4.697 3.807-8.505 8.504-8.505 4.696 0 8.504 3.808 8.504 8.505z"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 38.269531 33.953382)"
          />
          <path
            d="m0 0c0-4.696 3.808-8.504 8.505-8.504 4.695 0 8.504 3.808 8.504 8.504 0 4.697-3.809 8.504-8.504 8.504-4.697 0-8.505-3.807-8.505-8.504z"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 47.769377 39.203703)"
          />
          <path
            d="m0 0c-.439.107-.85.419-1.223.664-.397.26-.787.533-1.185.793-.923.605-1.888 1.133-2.875 1.623-1.965.978-3.962 1.824-6.084 2.397-4.296 1.158-8.777 1.511-13.202 1.77-9.146.534-18.336.47-27.494.39-4.613-.041-9.227-.149-13.832-.442-4.443-.281-8.951-.677-13.233-1.965-1.941-.584-3.782-1.417-5.587-2.334-.9-.458-1.777-.957-2.621-1.514-.389-.257-.771-.523-1.162-.778-.193-.125-.389-.249-.589-.362-.061-.035-.535-.215-.543-.246"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(.35277777 0 0 -.35277777 61.579039 30.189243)"
          />
        </g>
        <path
          d="m161.14532 100.01397c.12515-.00057.32993-.00057.45508 0 .12515.00058.0228.001-.22754.001-.25029 0-.35269-.00046-.22754-.001z"
          fill="#7f7f7f"
          stroke-width=".003906"
          transform="scale(.26458333)"
        />
        <path
          d="m161.44976 100.01398c.0369-.00064.0984-.00064.13671 0 .0383.00064.008.001-.0671.001-.0752.00001-.10651-.00052-.0696-.001z"
          fill="#7f7f7f"
          stroke-width=".003906"
          transform="scale(.26458333)"
        />
        <path
          d="m161.2879 100.01398c.0381-.00064.10054-.00064.13867 0 .0381.00064.007.001-.0693.001s-.10747-.00052-.0693-.001z"
          fill="#7f7f7f"
          stroke-width=".003906"
          transform="scale(.26458333)"
        />
        <path
          d="m161.43648 100.01401c.0124-.00078.0318-.00077.043.00002.0112.00078.001.001-.0226.001-.0236-.00001-.0328-.00065-.0204-.001z"
          fill="#7f7f7f"
          stroke-width=".003906"
          transform="scale(.26458333)"
        />
        <path
          d="m161.39545 100.01402c.0113-.00079.0289-.00078.0391.00002.0101.0008.00085.001-.0206.001-.0215-.00001-.0298-.00067-.0184-.001z"
          fill="#7f7f7f"
          stroke-width=".003906"
          transform="scale(.26458333)"
        />
        <path
          d="m161.43048 100.01415c.005-.00093.0127-.00093.0176 0 .005.00093.00088.002-.009.002-.01 0-.0136-.00076-.009-.002z"
          fill="#7f7f7f"
          stroke-width=".003906"
          transform="scale(.26458333)"
        />
        <path
          d="m161.4325 100.0142c.004-.00099.009-.00093.0117.00014.003.001-.00046.002-.007.002-.006-.00008-.009-.00095-.005-.002z"
          fill="#7f7f7f"
          stroke-width=".003906"
          transform="scale(.26458333)"
        />
      </g>
    </g>
  </svg>
);

export const NintendoSwitch = {
  Base: NintendoSwitchAsset,
  inputs: [
    Button0,
    Button1,
    Button2,
    Button3,
    Button4,
    Button5,
    Button6,
    Button7,
    Button8,
    Button9,
    Button10AndAxis01,
    Button11AndAxis23,
    Button12,
    Button13,
    Button14,
    Button15,
    Button16,
  ],
  constraints: {
    marginTop: 120,
    width: 800,
  },
};

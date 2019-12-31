import { display, position, DisplayProps, PositionProps } from "styled-system";
import styled, { keyframes } from "styled-components";

import { Flex } from "../primitives/styled-rebass";

const keyFrameExampleOne = keyframes`
  0% {
    height: 0;
    opacity: 0;
    background: pink;
  }
  100% {
    height: auto;
    opacity: 1;
    background: orange;
  }
`;

export const FlashPanel = styled(Flex)<DisplayProps & PositionProps>`
  ${display}
  ${position}
  background: pink;
  /* position: relative; */
  animation: ${keyFrameExampleOne} 2s ease-in-out 0s;
`;

export const FlashPanelSC = ({ message }) => {
  return <FlashPanel>{message}</FlashPanel>;
};

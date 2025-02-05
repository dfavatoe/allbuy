import styled from "styled-components";
import { FC } from "react";

// Defines the types for the component props
interface SplitScreenProps {
  left: JSX.Element;
  right: JSX.Element;
}

// Applies to the up-most wrapping div (renamed to Container)
const Container = styled.div`
  display: flex;
`;

// Applies to the two divs wrapping the Left and Right components (renamed to Pane)
const Pane = styled.div`
  flex: 1;
`;

export const SplitScreen: JSX.Element<SplitScreenProps> = ({
  left: Left,
  right: Right,
}) => {
  return (
    <Container>
      <Pane>
        <Left />
      </Pane>
      <Pane>
        <Right />
      </Pane>
    </Container>
  );
};

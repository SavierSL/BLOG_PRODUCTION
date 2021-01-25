import styled from "styled-components";

export const Theme = styled.body`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  button {
    color: ${(props) => props.theme.button.color};
    background: ${(props) => props.theme.button.background};
  }
`;

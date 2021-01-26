import styled from "styled-components";

export const Theme = styled.body`
  height: 100vh;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  button {
    color: ${(props) => props.theme.button.color};
    background: ${(props) => props.theme.button.background};
  }
`;

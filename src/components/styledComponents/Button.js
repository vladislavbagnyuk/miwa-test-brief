import styled from "styled-components";

const Button = styled.button`
  font-size: 1.25em;
  margin: 0.5em;
  padding: 0.5em 1em;
  border: none;
  border-radius: 0.25em;
  color: white;
  background: #673fd7;
  cursor: pointer;
  &:disabled {
    background: #a6a6a6;
  }
`;

export default Button;

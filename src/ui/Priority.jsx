import styled, { css } from "styled-components";

const order = {
  low: css`
    color: var(--color-green-700);
  `,
  medium: css`
    color: var(--color-yellow-700);
  `,
  high: css`
    color: var(--color-red-800);
  `,
};

const Priority = styled.span`
  font-weight: 500;
  text-transform: capitalize;
  ${(props) => order[props.priority]}
`;

Priority.defaultProps = {
  priority: "medium",
};

export default Priority;

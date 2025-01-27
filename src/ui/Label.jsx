import styled, { css } from "styled-components";

const statuses = {
  completed: css`
    background-color: var(--color-brand-700);
  `,
  pending: css`
    background-color: var(--color-red-700);
  `,
};

const Label = styled.span`
  text-transform: capitalize;
  font-style: italic;
  font-size: 1.4rem;
  padding: 0.4rem 0.8rem;
  text-align: center;
  width: 60%;
  color: var(--color-grey-50);
  border-radius: var(--border-radius-sm);
  ${(props) => statuses[props.status]}
`;

Label.defaultProps = {
  status: "pending",
};

export default Label;

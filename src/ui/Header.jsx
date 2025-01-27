/*eslint-disable */
import styled from "styled-components";
import Heading from "./Heading";
import { useState } from "react";
import { useTask } from "../contexts/TaskContext";
import Button from "./Button";
import Row from "./Row";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;
const Logo = styled.img`
  width: 6.5rem;
  height: 6.5rem;
`;
function Header() {
  const { user, today, dispatch } = useTask();
  function handleLogout() {
    dispatch({ type: "LOG_OUT" });
  }
  return (
    <StyledHeader>
      <Logo src="logo.png" alt="Logo" />
      {user && <p>Today: {today}</p>}
      <Row type="horizontal">
        <Heading as="h1">Hi, {user || "Guest"}</Heading>
        {user && (
          <Button onClick={handleLogout} size="small">
            Logout
          </Button>
        )}
      </Row>
    </StyledHeader>
  );
}

export default Header;

import styled from "styled-components";
import FormRow from "../../ui/FormRow";
import { useRef } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useTask } from "../../contexts/TaskContext";
const StyledUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
function User() {
  const { dispatch } = useTask();
  const ref = useRef();
  function handleUser() {
    dispatch({ type: "SET_USER", payload: ref.current.value });
  }
  return (
    <StyledUser>
      <FormRow label="Enter your name to continue:">
        <Input type="text" id="name" ref={ref} />
      </FormRow>
      <FormRow>
        <Button variation="secondary" onClick={handleUser}>
          Start organizing task
        </Button>
      </FormRow>
    </StyledUser>
  );
}

export default User;

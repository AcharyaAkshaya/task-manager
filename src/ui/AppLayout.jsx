import styled from "styled-components";
import Header from "./Header";
import User from "../features/user/User";
import { useTask } from "../contexts/TaskContext";
import Tasks from "../pages/Tasks";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: 10rem 1fr;
  max-height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  const { user } = useTask();
  return (
    <StyledAppLayout>
      <Header />
      <Main>
        {user == "" && <User />}
        {user != "" && (
          <Container>
            <Tasks />
          </Container>
        )}
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;

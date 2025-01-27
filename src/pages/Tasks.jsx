import AddTask from "../features/tasks/AddTask";
import TaskTable from "../features/tasks/TaskTable";
import TaskTableOperations from "../features/tasks/TaskTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SortBy from "../ui/SortBy";

function Tasks() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tasks</Heading>
        <TaskTableOperations />
        <SortBy
          options={[
            {
              value: "title-asc",
              label: "Sort by Title (A-Z)",
            },
            {
              value: "title-desc",
              label: "Sort by Title (Z-A)",
            },
            {
              value: "deadline-asc",
              label: "Sort by Deadline (asc)",
            },
            {
              value: "deadline-desc",
              label: "Sort by Deadline (desc)",
            },
          ]}
        />
      </Row>
      <Row>
        <TaskTable />
      </Row>
      <AddTask />
    </>
  );
}

export default Tasks;

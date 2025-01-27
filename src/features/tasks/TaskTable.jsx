import { useSearchParams } from "react-router-dom";
import { useTask } from "../../contexts/TaskContext";
import Table from "../../ui/Table";
import TaskRow from "./TaskRow";

function TaskTable() {
  const { tasks } = useTask();
  const [searchParams] = useSearchParams();

  // FILTER: PRIORITY
  const priorityValue = searchParams.get("priority") || "all";
  let priorityTasks;
  if (priorityValue === "all") {
    priorityTasks = tasks;
  } else {
    priorityTasks = tasks.filter((task) => task.priority === priorityValue);
  }

  // FILTER: STATUS
  const statusValue = searchParams.get("status") || "all";
  let statusTasks;
  if (statusValue === "all") {
    statusTasks = priorityTasks;
  } else {
    statusTasks = priorityTasks.filter((task) => {
      if (statusValue === "completed") {
        return task.completed;
      } else {
        return !task.completed;
      }
    });
  }

  // SORT BY
  const sortBy = searchParams.get("sortBy") || "title-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  let sortedTasks;
  if (field === "title")
    sortedTasks = statusTasks.sort(
      (a, b) => a[field].localeCompare(b[field]) * modifier
    );
  if (field === "deadline")
    sortedTasks = statusTasks.sort(
      (a, b) => (new Date(a[field]) - new Date(b[field])) * modifier
    );
  return (
    <>
      {tasks.length === 0 && <p>No tasks found</p>}
      <Table columns="0.4fr 1fr 1fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Deadline Date</div>
          <div>Title</div>
          <div>Details</div>
          <div>Priority</div>
          <div>Status</div>
          <div>Actions</div>
        </Table.Header>
        <Table.Body
          data={sortedTasks}
          render={(task) => <TaskRow task={task} key={task.id} />}
        />
      </Table>
    </>
  );
}

export default TaskTable;

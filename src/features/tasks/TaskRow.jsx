/*eslint-disable */
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineSquare2Stack,
} from "react-icons/hi2";
import Button from "../../ui/Button";
import Priority from "../../ui/Priority";
import Table from "../../ui/Table";
import ButtonIcon from "../../ui/ButtonIcon";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useTask } from "../../contexts/TaskContext";
import Modal from "../../ui/Modal";
import CreateTaskForm from "./CreateTaskForm";
import toast from "react-hot-toast";
import Label from "../../ui/Label";

function TaskRow({ task }) {
  const { dispatch } = useTask();
  function handleDelete() {
    toast.success("Task deleted successfully");
    dispatch({ type: "DELETE_TASK", payload: task.id });
  }
  function handleDuplicate() {
    const newId = new Date().getTime();
    const newTask = { ...task, id: newId };
    toast.success("Task added successfully");
    dispatch({ type: "ADD_TASK", payload: newTask });
  }

  function handleToggle() {
    dispatch({ type: "TOGGLE_TASK", payload: task.id });
  }
  return (
    <Table.Row>
      <input
        type="checkbox"
        onChange={handleToggle}
        defaultChecked={task.completed}
      />
      <div>{task.deadline}</div>
      <div>{task.title}</div>
      <div>{task.details}</div>
      <Priority priority={task.priority}>{task.priority}</Priority>
      {/* <div>
        {task.completed ? (
          <Button variation="primary" size="small">
            Completed
          </Button>
        ) : (
          <Button variation="danger" size="small">
            Pending
          </Button>
        )}
      </div> */}
      <Label status={task.completed ? "completed" : "pending"}>
        {task.completed ? "completed" : "pending"}
      </Label>
      <div>
        <Modal>
          <Modal.Open opens="edit-task">
            <ButtonIcon>
              <HiOutlinePencil />
            </ButtonIcon>
          </Modal.Open>
          <ButtonIcon onClick={() => handleDuplicate()}>
            <HiOutlineSquare2Stack />
          </ButtonIcon>
          <Modal.Open opens="delete-task">
            <ButtonIcon>
              <HiOutlineTrash />
            </ButtonIcon>
          </Modal.Open>
          <Modal.Window name="edit-task">
            <CreateTaskForm taskToEdit={task} />
          </Modal.Window>
          <Modal.Window name="delete-task">
            <ConfirmDelete
              resourceName={`Task:${task.title}`}
              onConfirm={() => handleDelete()}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default TaskRow;

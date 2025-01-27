import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateTaskForm from "./CreateTaskForm";

function AddTask() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="task-form">
          <Button>Add new task</Button>
        </Modal.Open>
        <Modal.Window name="task-form">
          <CreateTaskForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddTask;

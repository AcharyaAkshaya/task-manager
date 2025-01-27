/*eslint-disable*/
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useTask } from "../../contexts/TaskContext";
import styled from "styled-components";
import toast from "react-hot-toast";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function CreateTaskForm({ taskToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = taskToEdit;
  const isEditSession = Boolean(editId);
  const { dispatch } = useTask();
  const { handleSubmit, register, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  function onSubmit(data) {
    data.id = isEditSession ? editId : new Date().getTime();
    data.deadline = new Date(data.deadline).toDateString();
    if (isEditSession) {
      toast.success("Task edited successfully");
      dispatch({ type: "EDIT_TASK", payload: data });
    } else {
      toast.success("Task added successfully");
      dispatch({ type: "ADD_TASK", payload: data });
    }
    onCloseModal();
  }
  function onError(error) {
    console.log(error);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Title" errors={errors?.title?.message}>
        <Input
          type="text"
          id="title"
          {...register("title", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Priority" errors={errors?.priority?.message}>
        <StyledSelect
          id="priority"
          {...register("priority", { required: "This field is required" })}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </StyledSelect>
        {/* <select
          id="priority"
          {...register("priority", { required: "This field is required" })}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select> */}
        {/* <Input
          type="text"
          id="priority"
          {...register("priority", {
            required: "This field is required",
          })}
        /> */}
      </FormRow>
      <FormRow label="Details" errors={errors?.details?.message}>
        <Input
          type="text"
          id="details"
          {...register("details", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Deadline Date" errors={errors?.deadline?.message}>
        <Input
          type="date"
          id="deadline"
          {...register("deadline", {
            required: isEditSession ? false : "This field is required",
            validate: (value) => {
              const selectedDate = new Date(value);
              const currentDate = new Date().setHours(0, 0, 0, 0);
              return (
                selectedDate >= currentDate ||
                "Please select todays or later date"
              );
            },
          })}
        />
      </FormRow>
      <FormRow>
        <Button variation="tertiary" type="reset">
          Cancel
        </Button>
        <Button>{isEditSession ? "Edit Task" : "Create new task"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateTaskForm;

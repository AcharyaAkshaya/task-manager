import Filter from "../../ui/Filter";
import { TableOperations } from "../../ui/TableOperations";

function TaskTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="priority"
        options={[
          { value: "all", label: "All" },
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
        ]}
      />
      <Filter
        filterField={"status"}
        options={[
          { value: "all", label: "All" },
          { value: "completed", label: "Completed" },
          { value: "pending", label: "Pending" },
        ]}
      />
    </TableOperations>
  );
}

export default TaskTableOperations;

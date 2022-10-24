import { Priority } from "../ticket/priority-enum";
import { DropdownValue } from "./dropdown-value";

export const priorityList: DropdownValue[] = [
  { label: "LOW", value: Priority.LOW },
  { label: "MEDIUM", value: Priority.MEDIUM },
  { label: "HIGH", value: Priority.HIGH },
];
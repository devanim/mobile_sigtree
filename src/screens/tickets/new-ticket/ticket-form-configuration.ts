import { FormConfiguration } from "../../../models/form-configuration";

const ticketFormConfiguration: FormConfiguration[] = [
  {name: "Title", required: { value: true, message: "Title is required" }},
  {name: "Description", required: { value: true, message: "Description is required" }},
  {name: "Priority", required: { value: true, message: "Priority is required" }},
  {name: "Floor", required: { value: true, message: "Floor is required" }},
  {name: "Category", required: { value: true, message: "Category is required" }},
];

export default ticketFormConfiguration;